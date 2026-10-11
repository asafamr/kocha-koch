// A spend limit per process (one pod on Cloud Run): a leaky bucket in dollars. Every Gemini turn
// adds its cost, computed from the token counts Gemini reports; the bucket drains at
// GEMINI_SPEND_PER_HOUR dollars per hour (default 1) and holds at most GEMINI_SPEND_BURST
// (default one hour's worth). It starts empty, so a new pod has the full allowance. While it is
// full, new answers are refused until it drains.
//
// Prices are $ per 1M tokens: gemini-3.8-flash paid tier through 2026-12-31 by default
// (docs/gemini-costs.md); they double on 2027-01-01, so set them in the environment then.

import { CAPS, estTokens } from "./caps";

const num = (name: string, fallback: number) => {
  const v = Number(process.env[name]);
  return Number.isFinite(v) && process.env[name] !== "" && process.env[name] !== undefined ? v : fallback;
};

const RATE = num("GEMINI_SPEND_PER_HOUR", 1);
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

// A turn reserves its worst-case cost (maxTurnCost) until it ends, so the bucket never goes
// over its capacity, however many turns run at once. The real cost is added as it is reported.
export function startTurn(reserve: number): boolean {
  drain();
  if (level + reserve > CAPACITY) return false;
  level += reserve;
  return true;
}

export function endTurn(reserve: number) {
  drain();
  level = Math.max(0, level - reserve);
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

// Dollars for a call of these sizes, ignoring the cached-input discount.
const callCost = (input: number, output: number) => (input * PRICE.input + output * PRICE.output) / 1e6;

// The most one reply can cost given its instructions and history (estimated tokens): CAPS.rounds
// calls at full output (the first one's output sent back to the later ones), the verification call over the largest sources and CV the caps allow,
// and a margin for cache storage.
export function maxTurnCost(instructions: number, history: number) {
  const call = callCost(instructions + history + estTokens(CAPS.lookupChars), CAPS.maxOutput);
  const sources = estTokens(CAPS.role + CAPS.jobDescription + CAPS.verifyChatChars) + CAPS.pdfTokens;
  const verify = callCost(sources + CAPS.maxOutput + 1_500, CAPS.verifyOutput);
  const echoed = (CAPS.rounds - 1) * callCost(CAPS.maxOutput, 0); // a lookup turn's output goes back as input
  return CAPS.rounds * call + echoed + verify + 0.01;
}

// Storing a cache of `tokens` for `hours`.
export const cacheCost = (tokens: number, hours: number) => (tokens * PRICE.storagePerHour * hours) / 1e6;
