export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

// Ad tags on the landing URL, kept for the session so later stages still have them.
export function utmTags(): Record<string, string> {
  const params = new URLSearchParams(location.search);
  const found: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) found[k] = v;
  }
  try {
    if (Object.keys(found).length) sessionStorage.setItem("utm", JSON.stringify(found));
    else return JSON.parse(sessionStorage.getItem("utm") ?? "{}");
  } catch {
    // storage blocked: use what the URL has
  }
  return found;
}
