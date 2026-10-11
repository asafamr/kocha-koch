import { CONSENT, isPurpose } from "./consent";
import { CAPS } from "./caps";
import { FIT_PREFIX } from "./fit";
import { parseUtm } from "./utm";
import type { Restored } from "./store";

// POST /api/restore: the page sends back the conversation it saved in the browser after the
// server forgot it (memory store, restart). Everything here is untrusted: unknown fields are
// dropped, sizes capped, ids and consent details are set by the server. Replies are model output
// the page saved, so they are accepted as data with the same shape checks the page applies.

// A model reply is at most CAPS.maxOutput tokens; a restored one may not be bigger (in characters, at 4 per token).
const MAX_REPLY_CHARS = CAPS.maxOutput * 4;
const MAX_LIST = 50;

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const size = (v: unknown) => Buffer.byteLength(JSON.stringify(v));
const str = (v: unknown, max: number) => (typeof v === "string" && v.length <= max ? v : null);
const objs = (v: unknown) => (Array.isArray(v) ? v.slice(0, MAX_LIST).filter(isObj) : []);

function time(v: unknown): string {
  const t = typeof v === "string" ? Date.parse(v) : NaN;
  return Number.isNaN(t) || t > Date.now() ? new Date().toISOString() : new Date(t).toISOString();
}

function cleanCv(v: unknown): Record<string, unknown> | undefined {
  if (!isObj(v)) return undefined;
  const out: Record<string, unknown> = {};
  if (isObj(v.data) && typeof v.data.name === "string") out.data = v.data;
  if (isObj(v.patch)) out.patch = v.patch;
  if (isObj(v.theme)) out.theme = v.theme;
  return Object.keys(out).length ? out : undefined;
}

function cleanTips(v: unknown): Record<string, unknown> | undefined {
  if (!isObj(v)) return undefined;
  const points = (list: unknown) =>
    objs(list).filter((p) => typeof p.id === "string" && typeof p.question === "string" && typeof p.prepare === "string");
  return {
    ...(isObj(v.profile) ? { profile: v.profile } : {}),
    ...(typeof v.target === "string" ? { target: v.target } : {}),
    strengths: objs(v.strengths).filter((s) => typeof s.text === "string"),
    jobFit: points(v.jobFit),
    points: points(v.points),
  };
}

// Returns the items to restore, or an error message. Only the last item may have no reply.
export function parseRestore(raw: unknown, o: { maxItems: number; consentsOn: boolean }): Restored[] | string {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > o.maxItems) return "bad thread";
  const items: Restored[] = [];
  for (const [i, m] of raw.entries()) {
    if (!isObj(m)) return "bad thread";
    const text = str(m.text, CAPS.message)?.trim();
    if (!text) return "bad text";
    const item: Restored = { text, ts: time(m.ts) };
    if (m.hidden === true && text.startsWith(FIT_PREFIX)) item.hidden = true;
    if (isObj(m.intake)) {
      const role = str(m.intake.role, CAPS.role)?.trim();
      const jobDescription = str(m.intake.jobDescription, CAPS.jobDescription);
      if (!role || jobDescription === null) return "bad intake";
      const purposes = new Set<string>();
      const consents = o.consentsOn
        ? objs(m.intake.consents).flatMap((c) =>
            isPurpose(c.purpose) && c.version === CONSENT.version && !purposes.has(c.purpose) && purposes.add(c.purpose)
              ? [{ purpose: c.purpose, version: CONSENT.version, grantedAt: time(c.grantedAt) }]
              : [],
          )
        : [];
      item.intake = { role, jobDescription, consents, utm: parseUtm(JSON.stringify(m.intake.utm ?? null)) };
    }
    if (isObj(m.reply)) {
      const replyText = str(m.reply.text, MAX_REPLY_CHARS);
      if (replyText === null || replyText.length + size(m.reply.cv ?? null) + size(m.reply.tips ?? null) > MAX_REPLY_CHARS) return "bad reply";
      item.reply = { text: replyText, ts: time(m.reply.ts), cv: cleanCv(m.reply.cv), tips: cleanTips(m.reply.tips) };
    } else if (i < raw.length - 1) return "only the last message may be unanswered";
    items.push(item);
  }
  return items;
}
