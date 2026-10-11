// Hard caps on what one Gemini turn may send and receive (values documented in docs/gemini-costs.md).
// Sizes are characters at the edge, tokens inside; estTokens is deliberately pessimistic (Hebrew).
export const CAPS = {
  message: 4_000, // chars, one chat message
  jobDescription: 10_000, // chars
  context: 8_000, // chars, the hidden layout report
  role: 200, // chars
  pdfTokens: 4_000, // the CV PDF, counted by Gemini's countTokens at intake (about 15 pages)
  history: 16_000, // estimated tokens of conversation sent per model call; the oldest turns are dropped
  lookupChars: 8_000, // research text one lookup may return
  lookupIds: 8,
  verifyChatChars: 20_000, // the user's chat messages shown to the verifier, newest first
  rounds: 3, // model calls per reply: lookup, answer, one JSON retry
  maxOutput: 12_288, // tokens per call, thinking included
  verifyOutput: 8_192,
};

export const estTokens = (chars: number) => Math.ceil(chars / 2);

// Index of the first of `tokens` (oldest first) to send: the newest turns that fit in `budget`.
// The last one is always kept.
export function firstKept(tokens: number[], budget: number): number {
  let total = 0;
  let first = tokens.length;
  while (first > 0 && (first === tokens.length || total + tokens[first - 1] <= budget)) {
    total += tokens[--first];
  }
  return first;
}
