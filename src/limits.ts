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

setInterval(() => {
  const now = Date.now();
  for (const [key, times] of hits) if (now - times[times.length - 1] >= HOUR_MS) hits.delete(key);
}, 10 * 60_000).unref();

// Requests per IP per hour, and handoffs per hour across all clients (each one posts a CV and
// an email to the receiving server).
const PER_IP: Record<string, number> = {
  "POST /api/intake": 10,
  "POST /api/messages": 60,
  "POST /api/handoff": 10,
};
const HANDOFFS_PER_HOUR = 60;

export function rateLimited(route: string, ip: string): boolean {
  const max = PER_IP[route];
  if (max === undefined) return false;
  if (!allow(`${route} ${ip}`, max)) return true;
  return route === "POST /api/handoff" && !allow("handoff:all", HANDOFFS_PER_HOUR);
}
