// Per-client limits for the public endpoints, in memory (the hosted app is one process). A
// sliding window per key: only allowed requests are counted, and idle keys are swept.

const HOUR_MS = 3_600_000;

// A client is an IPv4 address or an IPv6 /64 (one subscriber gets a whole /64).
export function ipKey(ip: string): string {
  if (!ip.includes(":")) return ip;
  const mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  if (mapped) return mapped[1];
  const [head, tail = ""] = ip.split("%")[0].split("::");
  const h = head ? head.split(":") : [];
  const t = tail ? tail.split(":") : [];
  const groups = [...h, ...Array(Math.max(0, 8 - h.length - t.length)).fill("0"), ...t];
  return groups.slice(0, 4).map((g) => g.toLowerCase().replace(/^0+(?=.)/, "")).join(":") + "::/64";
}

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
  IP_SPEND_PER_HOUR - recentCharges(ipKey(ip), now).reduce((sum, c) => sum + c.dollars, 0);

export function reserveIpSpend(ip: string, dollars: number, now = Date.now()): Charge | null {
  if (ipSpendLeft(ip, now) < dollars) return null;
  const charge = { at: now, dollars };
  charges.get(ipKey(ip))!.push(charge);
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

// Requests per IP per hour, and per hour across all clients for handoffs (each one posts a CV and
// an email to the receiving server) and intakes (each one counts the PDF's tokens).
const PER_IP: Record<string, number> = {
  "GET /api/messages": 1200, // the page polls every 2 s
  "POST /api/intake": 10,
  "POST /api/restore": 10,
  "POST /api/messages": 60,
  "POST /api/handoff": 10,
};
const HANDOFFS_PER_HOUR = 60;
const INTAKES_PER_HOUR = 120;
const MODEL_ROUTES = new Set(["POST /api/intake", "POST /api/restore", "POST /api/messages"]);

export function rateLimited(route: string, rawIp: string): boolean {
  const max = PER_IP[route];
  if (max === undefined) return false;
  const ip = ipKey(rawIp);
  if (MODEL_ROUTES.has(route) && ipSpendLeft(rawIp) < MIN_TURN) return true;
  if (!allow(`${route} ${ip}`, max)) return true;
  if (route === "POST /api/intake" || route === "POST /api/restore") return !allow("intake:all", INTAKES_PER_HOUR);
  return route === "POST /api/handoff" && !allow("handoff:all", HANDOFFS_PER_HOUR);
}
