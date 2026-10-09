import { createHmac } from "node:crypto";
import { htmlToPdf } from "./pdf";
import { getUpload, thread } from "./store";

// Handing a user to kocha.co.il (docs/kocha-handoff.md). When the user agreed to share their CVs
// with kocha (consent `cv_processing`), the practice button calls POST /api/handoff: this module
// sends kocha's control server the original CV, the created CV (document and PDF), the contact
// and the consents, signed with a shared secret. kocha answers with a token and a `url` where
// the user lands. Tokens go in
// the URL fragment, as kocha's invite links do, so they stay out of server logs.
// Without KOCHA_HANDOFF_URL and KOCHA_HANDOFF_SECRET the feature is off and the button is a plain
// tracked link.

const URL_ = process.env.KOCHA_HANDOFF_URL ?? "";
const SECRET = process.env.KOCHA_HANDOFF_SECRET ?? "";
const JOIN = process.env.KOCHA_JOIN_URL ?? "https://kocha.co.il/join";
const DEFAULT_UTM = { source: "cv-tool", medium: "export", campaign: "kocha-koch" };
export const handoffEnabled = Boolean(URL_ && SECRET);

export class NoConsent extends Error {}

// One handoff per session and CV version: an export and a later practice click on an unchanged CV
// share one call (also while it is still running). A failed call is forgotten, so it can retry.
const done = new Map<string, { key: string; url: Promise<string> }>();

type CvDocument = { data?: { name?: unknown; contact?: { email?: unknown } } };

export async function handoff(session: string, document: CvDocument, html: string): Promise<string> {
  const items = await thread(session);
  const intake = items.filter((m) => m.intake).at(-1)?.intake;
  if (!intake?.consents?.some((c) => c.purpose === "cv_processing")) throw new NoConsent();

  const key = new Bun.CryptoHasher("sha256").update(JSON.stringify(document)).digest("hex");
  const previous = done.get(session);
  if (previous?.key === key) return previous.url;
  const url = send(session, intake, latestTips(items), document, html);
  done.set(session, { key, url });
  url.catch(() => {
    if (done.get(session)?.url === url) done.delete(session);
  });
  return url;
}

const MAX_TIPS_BYTES = 64 * 1024;

// Replies are model-written: pass only a plain object, and drop it if it is too big.
function latestTips(items: Awaited<ReturnType<typeof thread>>): Record<string, unknown> | undefined {
  const tips = items.map((m) => m.reply?.tips).filter((t) => t != null).at(-1);
  if (typeof tips !== "object" || tips === null || Array.isArray(tips)) return undefined;
  return Buffer.byteLength(JSON.stringify(tips)) <= MAX_TIPS_BYTES ? (tips as Record<string, unknown>) : undefined;
}

type IntakeOf = NonNullable<Awaited<ReturnType<typeof thread>>[number]["intake"]>;
async function send(session: string, intake: IntakeOf, tips: Record<string, unknown> | undefined, document: CvDocument, html: string): Promise<string> {
  const t = intake.utm;
  const utm: Record<string, string | undefined> =
    t?.utm_source || t?.utm_medium || t?.utm_campaign
      ? { source: t.utm_source, medium: t.utm_medium, campaign: t.utm_campaign, term: t.utm_term, content: t.utm_content }
      : DEFAULT_UTM;
  const original = await getUpload(session, intake.cvFile);
  const pdf = await htmlToPdf(html, session);
  const body = JSON.stringify({
    source: "cv-tool",
    role: intake.role,
    jobDescription: intake.jobDescription || undefined,
    contact: {
      email: typeof document.data?.contact?.email === "string" ? document.data.contact.email : "",
      name: typeof document.data?.name === "string" ? document.data.name : "",
    },
    consents: intake.consents,
    originalCv: original ? { contentType: "application/pdf", data: Buffer.from(original).toString("base64") } : null,
    createdCv: { document, pdf: Buffer.from(pdf).toString("base64") },
    tips,
    utm,
  });

  // Signed as `${timestamp}.${body}` so the receiver can reject replays of an old request.
  const ts = Math.floor(Date.now() / 1000).toString();
  const signature = createHmac("sha256", SECRET).update(`${ts}.${body}`).digest("hex");
  const res = await fetch(URL_, {
    method: "POST",
    headers: { "content-type": "application/json", "x-kocha-timestamp": ts, "x-kocha-signature": `sha256=${signature}` },
    body,
    signal: AbortSignal.timeout(20_000),
  });
  if (res.status !== 201) throw new Error(`kocha handoff ${res.status}`);
  const out = (await res.json()) as { token?: unknown; url?: unknown };
  const token = out.token;
  if (typeof token !== "string" || !/^[A-Za-z0-9_-]{8,200}$/.test(token)) throw new Error("kocha handoff: bad token");

  const query = new URLSearchParams(Object.entries(utm).flatMap(([k, v]) => (v ? [[`utm_${k}`, v]] : []))).toString();
  const kochaUrl = typeof out.url === "string" && /^https:\/\/([a-z0-9-]+\.)*kocha\.co\.il\//.test(out.url) ? out.url : null;
  return kochaUrl ?? `${JOIN}?${query}#cv=${encodeURIComponent(token)}`;
}
