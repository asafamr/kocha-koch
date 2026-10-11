// A spend limit per process (one pod on Cloud Run): a rolling 60-minute ledger in dollars. Every
// Gemini turn adds its cost, computed from the token counts Gemini reports; no 60 minutes may hold
// more than GEMINI_SPEND_PER_HOUR (default 1). It starts empty, so a new pod has the full allowance.
// While there is no room, new answers are refused until old entries age out.
//
// Prices are $ per 1M tokens: gemini-3.8-flash paid tier through 2026-12-31 by default
// (docs/gemini-costs.md); they double on 2027-01-01, so set them in the environment then.

import { CAPS, estTokens } from "./caps";

const num = (name: string, fallback: number) => {
  const v = Number(process.env[name]);
  return Number.isFinite(v) && process.env[name] !== "" && process.env[name] !== undefined ? v : fallback;
};

const LIMIT = num("GEMINI_SPEND_PER_HOUR", 1);
const PRICE = {
  input: num("GEMINI_PRICE_INPUT", 0.75),
  cached: num("GEMINI_PRICE_CACHED", 0.075),
  output: num("GEMINI_PRICE_OUTPUT", 3.75), // includes thinking tokens
  storagePerHour: num("GEMINI_PRICE_CACHE_STORAGE", 0.5),
};

const HOUR_MS = 3_600_000;
const entries: { at: number; dollars: number }[] = []; // costs reported in the last hour
let reserved = 0; // worst-case cost of the turns in flight

function spentInWindow() {
  const cutoff = Date.now() - HOUR_MS;
  while (entries.length && entries[0].at <= cutoff) entries.shift();
  return entries.reduce((sum, e) => sum + e.dollars, 0);
}

// A turn reserves its worst-case cost (maxTurnCost) until it ends, so no 60 minutes ever hold more
// than the limit, however many turns run at once. Real costs are added as they are reported
// (counted with the reservation until the turn ends).
export function startTurn(reserve: number): boolean {
  if (spentInWindow() + reserved + reserve > LIMIT) return false;
  reserved += reserve;
  return true;
}

export function endTurn(reserve: number) {
  reserved = Math.max(0, reserved - reserve);
}

export const addSpend = (dollars: number) => void entries.push({ at: Date.now(), dollars });

export const window = () => ({ spent: spentInWindow(), reserved, limit: LIMIT });

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
