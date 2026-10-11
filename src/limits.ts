// Per-client limits for the public endpoints, in memory (the hosted app is one process). A
// sliding window per key: only allowed requests are counted, and idle keys are swept.

const HOUR_MS = 3_600_000;
const hits = new Map<string, number[]>();

export function allow(key: string, max: number, windowMs = HOUR_MS, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

// Model spend per IP, rolling 60 minutes: a turn reserves its worst case when it starts and
// settles to its real cost (dated when it ends) after.
const IP_SPEND_PER_HOUR = Number(process.env.GEMINI_SPEND_PER_IP_HOUR || 0.5);
const MIN_TURN = 0.05;
export type Charge = { at: number; dollars: number };
const charges = new Map<string, Charge[]>();

function recentCharges(ip: string, now: number) {
  const recent = (charges.get(ip) ?? []).filter((c) => now - c.at < HOUR_MS);
  charges.set(ip, recent);
  return recent;
}

const ipSpendLeft = (ip: string, now = Date.now()) =>
  IP_SPEND_PER_HOUR - recentCharges(ip, now).reduce((sum, c) => sum + c.dollars, 0);

export function reserveIpSpend(ip: string, dollars: number, now = Date.now()): Charge | null {
  if (ipSpendLeft(ip, now) < dollars) return null;
  const charge = { at: now, dollars };
  charges.get(ip)!.push(charge);
  return charge;
}

export function settleIpSpend(charge: Charge, actual: number) {
  charge.dollars = actual;
  charge.at = Date.now();
}

setInterval(() => {
  const now = Date.now();
  for (const [key, times] of hits) if (now - times[times.length - 1] >= HOUR_MS) hits.delete(key);
  for (const ip of charges.keys()) if (recentCharges(ip, now).length === 0) charges.delete(ip);
}, 10 * 60_000).unref();

// Requests per IP per hour, and handoffs per hour across all clients (each one posts a CV and
// an email to the receiving server).
const PER_IP: Record<string, number> = {
  "POST /api/intake": 10,
  "POST /api/messages": 60,
  "POST /api/handoff": 10,
};
const HANDOFFS_PER_HOUR = 60;
const MODEL_ROUTES = new Set(["POST /api/intake", "POST /api/messages"]);

export function rateLimited(route: string, ip: string): boolean {
  const max = PER_IP[route];
  if (max === undefined) return false;
  if (MODEL_ROUTES.has(route) && ipSpendLeft(ip) < MIN_TURN) return true;
  if (!allow(`${route} ${ip}`, max)) return true;
  return route === "POST /api/handoff" && !allow("handoff:all", HANDOFFS_PER_HOUR);
}
