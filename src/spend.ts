// A spend limit per process (one pod on Cloud Run): a leaky bucket in dollars. Every Gemini turn
// adds its cost, computed from the token counts Gemini reports; the bucket drains at
// GEMINI_SPEND_PER_HOUR dollars per hour (default 10) and holds at most GEMINI_SPEND_BURST
// (default one hour's worth). It starts empty, so a new pod has the full allowance. While it is
// full, new answers are refused until it drains.
//
// Prices are $ per 1M tokens: gemini-3.8-flash paid tier through 2026-12-31 by default
// (docs/gemini-costs.md); they double on 2027-01-01, so set them in the environment then.

const num = (name: string, fallback: number) => {
  const v = Number(process.env[name]);
  return Number.isFinite(v) && process.env[name] !== "" && process.env[name] !== undefined ? v : fallback;
};

const RATE = num("GEMINI_SPEND_PER_HOUR", 10);
const CAPACITY = num("GEMINI_SPEND_BURST", RATE);
const PRICE = {
  input: num("GEMINI_PRICE_INPUT", 0.75),
  cached: num("GEMINI_PRICE_CACHED", 0.075),
  output: num("GEMINI_PRICE_OUTPUT", 3.75), // includes thinking tokens
  storagePerHour: num("GEMINI_PRICE_CACHE_STORAGE", 0.5),
};

let level = 0; // dollars in the bucket
let at = Date.now();

function drain() {
  const now = Date.now();
  level = Math.max(0, level - (RATE * (now - at)) / 3_600_000);
  at = now;
}

// A turn in flight holds this much until it ends, so concurrent turns count before their
// real cost (added as it is reported) arrives.
const TURN_ESTIMATE = 0.1;

// Whether a new answer may start; if so it is reserved until endTurn.
export function startTurn(): boolean {
  drain();
  if (level >= CAPACITY) return false;
  level += TURN_ESTIMATE;
  return true;
}

export function endTurn() {
  drain();
  level = Math.max(0, level - TURN_ESTIMATE);
}

export function addSpend(dollars: number) {
  drain();
  level += dollars;
}

export const bucket = () => (drain(), { level, capacity: CAPACITY, perHour: RATE });

// Cost of one model turn from its usageMetadata; cached input is billed at the cached price.
export function turnCost(u: { promptTokenCount?: number; cachedContentTokenCount?: number; candidatesTokenCount?: number; thoughtsTokenCount?: number }) {
  const prompt = u.promptTokenCount ?? 0;
  const cached = u.cachedContentTokenCount ?? 0;
  const out = (u.candidatesTokenCount ?? 0) + (u.thoughtsTokenCount ?? 0);
  return ((prompt - cached) * PRICE.input + cached * PRICE.cached + out * PRICE.output) / 1e6;
}

// Storing a cache of `tokens` for `hours`.
export const cacheCost = (tokens: number, hours: number) => (tokens * PRICE.storagePerHour * hours) / 1e6;
