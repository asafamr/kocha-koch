// The ad tags (utm_*) a visitor arrived with.
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
// Known keys only, short strings; anything else is dropped.
export function parseUtm(raw: unknown): Record<string, string> | undefined {
  let tags: unknown;
  try {
    tags = JSON.parse(String(raw ?? ""));
  } catch {
    return undefined;
  }
  if (typeof tags !== "object" || tags === null) return undefined;
  const out: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = (tags as Record<string, unknown>)[k];
    if (typeof v === "string" && v.trim()) out[k] = v.trim().slice(0, 64);
  }
  return Object.keys(out).length ? out : undefined;
}
