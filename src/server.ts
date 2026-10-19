import { timingSafeEqual } from "node:crypto";
import { join, normalize } from "node:path";
import { addMessage, addReply, resetStore, restoreThread, saveUpload, STORE, thread, type ThreadItem } from "./store";
import { answer, deleteCache, pdfTokens, progress } from "./gemini";
import { CAPS } from "./caps";
import { cvProblem, MAX_PDF, type IntakeCode } from "./cvFile";
import { CONSENT, isPurpose, type ConsentRecord } from "./consent";
import { handoff, handoffEnabled, NoConsent } from "./kocha";
import { GA_ID } from "./analytics";
import { FIT_PREFIX } from "./fit";
import { rateLimited } from "./limits";
import { parseRestore } from "./restore";
import { parseUtm } from "./utm";
import { htmlToPdf, MAX_HTML, pdfAvailable, PdfBusy } from "./pdf";

const BACKEND = process.env.BACKEND ?? "files"; // "files" | "gemini"
if (BACKEND === "files" && STORE !== "files") {
  throw new Error("BACKEND=files needs STORE=files: the agent reads messages from disk");
}
const PORT = Number(process.env.PORT ?? 3000);
// DEV=1: Bun bundles frontend/index.html on request and hot-reloads the page on save.
// Otherwise serve the bundle built by `bun run build` (see Dockerfile).
const DEV = process.env.DEV === "1";
const DIST = join(import.meta.dir, "..", "dist");

// Sessions (STORE=memory, the managed app): each browser gets a random id in an HttpOnly cookie,
// signed with a per-process secret, and sees only its own conversation. A restart invalidates the
// cookies; the browser restores its thread into a fresh session. With STORE=files there is one
// local conversation.
const SECRET = crypto.getRandomValues(new Uint8Array(32));
const sign = (id: string) => new Bun.CryptoHasher("sha256", SECRET).update(id).digest("hex");
const SESSION_MAX_AGE_S = 6 * 3600;
type Session = { id: string; setCookie?: string; ip: string };
function sessionOf(req: Request, peer: string): Session {
  // The proxy appends the real client address as the last x-forwarded-for entry; earlier ones are client-supplied.
  const ip = req.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() || peer;
  if (STORE !== "memory") return { id: "local", ip };
  const https = req.headers.get("x-forwarded-proto") === "https";
  const name = https ? "__Host-kocha_session" : "kocha_session";
  const found = req.headers.get("cookie")?.match(new RegExp(`(?:^|;\\s*)${name}=([0-9a-f-]{36})\\.([0-9a-f]{64})(?:;|$)`));
  if (found && timingSafeEqual(Buffer.from(found[2]), Buffer.from(sign(found[1])))) return { id: found[1], ip };
  const id = crypto.randomUUID();
  return { id, ip, setCookie: `${name}=${id}.${sign(id)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_MAX_AGE_S}${https ? "; Secure" : ""}` };
}

// Per-session limits for the in-process backend, where every message spends money: one answer
// at a time (so replies build on each other), and caps on messages and intakes.
const MAX_MESSAGES = 80;
const MAX_INTAKES = 5;
function overLimit(messages: ThreadItem[], intake: boolean): Response | null {
  if (BACKEND !== "gemini") return null;
  if (messages.some((m) => !m.reply)) return Response.json({ error: "busy" }, { status: 409 });
  if (messages.length >= MAX_MESSAGES) return Response.json({ error: "too many messages" }, { status: 429 });
  if (intake && messages.filter((m) => m.intake).length >= MAX_INTAKES) return Response.json({ error: "too many intakes" }, { status: 429 });
  return null;
}

// Start a Gemini answer in the background. Users see a generic message on failure; the detail
// goes to the log, not the chat.
function startAnswer(session: string, id: string, ip: string) {
  answer(session, id, ip).catch((e) => {
    console.error(`gemini ${id} failed:`, e?.message ?? e);
    return addReply(session, id, "משהו השתבש אצלי. נסו לשלוח שוב בעוד רגע.", "server");
  });
}

async function postMessage(req: Request, s: Session) {
  const body = await req.json().catch(() => null);
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  if (!text || text.length > CAPS.message) return Response.json({ error: "bad text" }, { status: 400 });
  const context = typeof body?.context === "string" ? body.context.trim() : "";
  if (context.length > CAPS.context) return Response.json({ error: "bad context" }, { status: 400 });
  const limited = overLimit(await thread(s.id), false);
  if (limited) return limited;

  const msg = await addMessage(s.id, text, undefined, context, body?.hidden === true && text.startsWith(FIT_PREFIX));
  if (BACKEND === "gemini") startAnswer(s.id, msg.id, s.ip);
  const { context: _hidden, ...shown } = msg;
  return Response.json(shown, { status: 201 });
}

// The intake form: target role, optional job description, consent, and the current CV as a PDF.
// The PDF is saved under uploads/ and the message carries its path for the agent to read.
const MAX_BODY = MAX_PDF + 4 * 1024 * 1024;
const REJECTIONS: Record<IntakeCode, [number, string]> = {
  role_missing: [400, "role is required"],
  role_too_long: [400, "role is too long"],
  job_description_too_long: [400, "job description is too long"],
  cv_missing: [400, "cv is required"],
  cv_empty: [400, "cv is empty"],
  cv_too_big: [400, "cv must be up to 5 MB"],
  cv_word: [400, "cv must be a PDF, not a Word file"],
  cv_image: [400, "cv must be a PDF, not an image"],
  cv_not_pdf: [400, "cv must be a PDF"],
  cv_too_long: [400, "cv too long"],
  cv_unreadable: [502, "cannot check the cv"],
  too_large: [413, "too large"],
};

// One log line per rejection: fixed strings and numbers only, never user text.
function reject(tag: "intake" | "restore", code: IntakeCode, size?: number, head?: Uint8Array) {
  const hex = head ? Buffer.from(head.subarray(0, 4)).toString("hex") : "-";
  console.log(`${tag} rejected: code=${code} size=${size ?? "-"} head=${hex || "-"}`);
  const [status, error] = REJECTIONS[code];
  return Response.json({ error, code }, { status });
}

const sizeProblem = (cv: File): IntakeCode | null => (cv.size === 0 ? "cv_empty" : cv.size > MAX_PDF ? "cv_too_big" : null);

async function tokenProblem(bytes: Uint8Array): Promise<IntakeCode | null> {
  const tokens = await pdfTokens(bytes).catch(() => null);
  return tokens === null ? "cv_unreadable" : tokens > CAPS.pdfTokens ? "cv_too_long" : null;
}
function consentRecords(purposes: unknown, req: Request, ip: string, page: string): ConsentRecord[] {
  const now = new Date().toISOString();
  return (Array.isArray(purposes) ? purposes : []).filter(isPurpose).map((purpose) => ({
    purpose,
    version: CONSENT.version,
    grantedAt: now,
    ip,
    userAgent: (req.headers.get("user-agent") ?? "").slice(0, 300),
    page,
  }));
}

async function postIntake(req: Request, s: Session) {
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BODY) return reject("intake", "too_large", length);
  const form = await req.formData().catch(() => null);
  const role = String(form?.get("role") ?? "").trim();
  const jobDescription = String(form?.get("jobDescription") ?? "").trim();
  // consents: a JSON list of the purposes the user ticked; recorded with the text version shown.
  // The box is shown only with the handoff on, so without it nothing is recorded.
  let purposes: unknown = [];
  try {
    if (handoffEnabled) purposes = JSON.parse(String(form?.get("consents") ?? "[]"));
  } catch {
    // no consent
  }
  const consents = consentRecords(purposes, req, s.ip, "intake");
  const utm = parseUtm(form?.get("utm"));
  const cv = form?.get("cv");
  const size = cv instanceof File ? cv.size : undefined;
  if (!role) return reject("intake", "role_missing", size);
  if (role.length > CAPS.role) return reject("intake", "role_too_long", size);
  if (jobDescription.length > CAPS.jobDescription) return reject("intake", "job_description_too_long", size);
  if (!(cv instanceof File)) return reject("intake", "cv_missing");
  const tooBig = sizeProblem(cv);
  if (tooBig) return reject("intake", tooBig, cv.size);
  const limited = overLimit(await thread(s.id), true);
  if (limited) return limited;
  const bytes = new Uint8Array(await cv.arrayBuffer());
  const notPdf = cvProblem(bytes.subarray(0, 12));
  if (notPdf) return reject("intake", notPdf, cv.size, bytes);
  if (BACKEND === "gemini") {
    const bad = await tokenProblem(bytes);
    if (bad) return reject("intake", bad, cv.size, bytes);
  }
  const cvFile = await saveUpload(s.id, "pdf", bytes);
  const text = [`תפקיד מבוקש: ${role}`, jobDescription ? "צירפתי את תיאור המשרה." : "", `קורות חיים: ${cv.name}`]
    .filter(Boolean)
    .join("\n");
  const msg = await addMessage(s.id, text, { role, jobDescription, consents, cvFile, ...(utm ? { utm } : {}) });
  if (BACKEND === "gemini") startAnswer(s.id, msg.id, s.ip);
  return Response.json(msg, { status: 201 });
}

// The page saved its conversation in the browser and the server forgot it (STORE=memory): rebuild
// it. Only into an empty session. A trailing message with no reply is dropped (the page offers to
// resend it), except the intake, which is answered again. At most one intake, since it carries the PDF.
const restoring = new Set<string>();
async function postRestore(req: Request, s: Session) {
  if (STORE !== "memory") return Response.json({ error: "not available" }, { status: 404 });
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BODY) return reject("restore", "too_large", length);
  const form = await req.formData().catch(() => null);
  let raw: unknown;
  try {
    raw = JSON.parse(String(form?.get("thread") ?? ""));
  } catch {
    return Response.json({ error: "bad thread" }, { status: 400 });
  }
  const parsed = parseRestore(raw, { maxItems: MAX_MESSAGES, consentsOn: handoffEnabled });
  if (typeof parsed === "string") return Response.json({ error: parsed }, { status: 400 });
  if (parsed.filter((m) => m.intake).length > 1) return Response.json({ error: "too many intakes" }, { status: 400 });
  const last = parsed.at(-1)!;
  const items = last.reply || last.intake ? parsed : parsed.slice(0, -1);
  if (items.length === 0) return Response.json({ error: "nothing to restore" }, { status: 400 });

  const cv = form?.get("cv");
  let pdf: Uint8Array | null = null;
  if (cv instanceof File) {
    const tooBig = sizeProblem(cv);
    if (tooBig) return reject("restore", tooBig, cv.size);
    pdf = new Uint8Array(await cv.arrayBuffer());
    const notPdf = cvProblem(pdf.subarray(0, 12));
    if (notPdf) return reject("restore", notPdf, cv.size, pdf);
    if (!items.some((m) => m.intake)) pdf = null;
  }
  if (pdf && BACKEND === "gemini") {
    const bad = await tokenProblem(pdf);
    if (bad) return reject("restore", bad, pdf.length, pdf);
  }

  // The empty check and the write are one step: no await between the flag and the check's result.
  if (restoring.has(s.id)) return Response.json({ error: "session not empty" }, { status: 409 });
  restoring.add(s.id);
  try {
    if ((await thread(s.id)).length > 0) return Response.json({ error: "session not empty" }, { status: 409 });
    const restored = await restoreThread(s.id, items, pdf, { ip: s.ip, userAgent: (req.headers.get("user-agent") ?? "").slice(0, 300) });
    const pending = items.at(-1)!.reply ? null : restored.at(-1)!;
    if (pending && BACKEND === "gemini") startAnswer(s.id, pending.id, s.ip);
    return Response.json({ restored: restored.length }, { status: 201 });
  } finally {
    restoring.delete(s.id);
  }
}

// The CV as a PDF: the body is the self-contained CV HTML the frontend builds (cv/exportHtml.ts).
async function postPdf(req: Request, s: Session) {
  if (!pdfAvailable) return Response.json({ error: "pdf rendering is not available here" }, { status: 503 });
  if (Number(req.headers.get("content-length") ?? 0) > MAX_HTML) return Response.json({ error: "too large" }, { status: 413 });
  const html = await req.text();
  if (!html || html.length > MAX_HTML) return Response.json({ error: "bad html" }, { status: 400 });
  try {
    return new Response(await htmlToPdf(html, s.id), { headers: { "content-type": "application/pdf" } });
  } catch (e) {
    if (e instanceof PdfBusy) return Response.json({ error: "busy" }, { status: 429 });
    console.error("pdf:", e);
    return Response.json({ error: "pdf rendering failed" }, { status: 500 });
  }
}

// The practice button: hand the user to kocha.co.il with their CVs (src/kocha.ts). The body is
// the CV document and its self-contained HTML (for the PDF), plus `consents` given on the export page
// by users who did not tick the box at intake. Without the feature or consent the
// page falls back to the plain link; errors are logged, never shown.
async function postHandoff(req: Request, s: Session) {
  if (!handoffEnabled) return Response.json({ error: "off" }, { status: 404 });
  if (Number(req.headers.get("content-length") ?? 0) > MAX_HTML * 2) return Response.json({ error: "too large" }, { status: 413 });
  const body = await req.json().catch(() => null);
  if (!body?.document || typeof body.html !== "string" || body.html.length > MAX_HTML) {
    return Response.json({ error: "bad request" }, { status: 400 });
  }
  // The export page only ever shows the CV-sharing box, so that is the only purpose it can grant.
  const late = Array.isArray(body.consents) ? body.consents.filter((p: unknown) => p === "cv_processing") : [];
  try {
    return Response.json({ url: await handoff(s.id, body.document, body.html, consentRecords(late, req, s.ip, "export")) });
  } catch (e) {
    if (e instanceof NoConsent) return Response.json({ error: "no consent" }, { status: 403 });
    if (e instanceof PdfBusy) return Response.json({ error: "busy" }, { status: 429 });
    console.error("handoff:", (e as Error)?.message ?? e);
    return Response.json({ error: "handoff failed" }, { status: 502 });
  }
}

// Pending messages the Gemini backend is answering get their live progress (typing indicator).
// The hidden context is for the model only: it never goes to the page.
function withProgress(messages: ThreadItem[]) {
  return messages.map(({ context: _hidden, ...m }) => {
    const p = !m.reply && progress.get(m.id);
    if (!p) return m;
    const { phase, thinkingTokens, thought } = p;
    return { ...m, progress: { phase, thinkingTokens, thought, seconds: Math.round((Date.now() - p.startedAt) / 1000) } };
  });
}

async function api(req: Request, pathname: string, s: Session): Promise<Response> {
  const route = `${req.method} ${pathname}`;
  if (STORE === "memory" && rateLimited(route, s.ip)) return Response.json({ error: "too many requests" }, { status: 429 });
  if (route === "GET /api/messages") return Response.json({ backend: BACKEND, handoff: handoffEnabled, ga: GA_ID || undefined, messages: withProgress(await thread(s.id)) });
  if (route === "POST /api/messages") return postMessage(req, s);
  if (route === "POST /api/intake") return postIntake(req, s);
  if (route === "POST /api/restore") return postRestore(req, s);
  if (route === "POST /api/pdf") return postPdf(req, s);
  if (route === "POST /api/handoff") return postHandoff(req, s);
  if (route === "POST /api/reset") {
    await resetStore(s.id);
    return new Response(null, { status: 204 });
  }
  return new Response("not found", { status: 404 });
}

// Security headers on every response outside dev (dev's hot reload needs looser rules). The page
// loads only its own bundle, fonts and images (plus Google Analytics when GA_MEASUREMENT_ID is
// set); inline styles are React style props.
// gtag also reports to the apex analytics.google.com and, when Ads-linked, to google.com, doubleclick.net
// and your country's google TLD (.co.il here); change that one if you serve elsewhere.
const GA_HOSTS =
  "https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com " +
  "https://*.googletagmanager.com https://*.doubleclick.net https://www.google.com https://www.google.co.il " +
  "https://www.googleadservices.com";
const GA_SCRIPT_HOSTS = "https://*.googletagmanager.com https://googleads.g.doubleclick.net https://www.googleadservices.com";
const CSP = [
  "default-src 'self'",
  `script-src 'self'${GA_ID ? " " + GA_SCRIPT_HOSTS : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${GA_ID ? " " + GA_HOSTS : ""}`,
  "font-src 'self' data:",
  `connect-src 'self'${GA_ID ? " " + GA_HOSTS : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");
function secure(res: Response, req: Request): Response {
  if (DEV) return res;
  const h = res.headers;
  h.set("content-security-policy", CSP);
  h.set("x-content-type-options", "nosniff");
  h.set("x-frame-options", "DENY");
  h.set("referrer-policy", "strict-origin-when-cross-origin");
  h.set("permissions-policy", "camera=(), microphone=(), geolocation=()");
  if (req.headers.get("x-forwarded-proto") === "https") h.set("strict-transport-security", "max-age=31536000");
  return res;
}

async function serveStatic(pathname: string) {
  const path = normalize(join(DIST, pathname === "/" ? "index.html" : pathname));
  if (!path.startsWith(DIST + "/")) return new Response("forbidden", { status: 403 });
  const file = Bun.file(path);
  return (await file.exists()) ? new Response(file) : new Response("not found", { status: 404 });
}

Bun.serve({
  port: PORT,
  maxRequestBodySize: MAX_BODY,
  development: DEV && { hmr: true },
  routes: DEV ? { "/": (await import("../frontend/index.html")).default } : undefined,
  async fetch(req, server) {
    const { pathname } = new URL(req.url);
    if (!pathname.startsWith("/api/")) return secure(await serveStatic(pathname), req);
    const s = sessionOf(req, server.requestIP(req)?.address ?? "");
    const res = await api(req, pathname, s);
    res.headers.set("cache-control", "no-store");
    if (s.setCookie) res.headers.append("set-cookie", s.setCookie);
    return secure(res, req);
  },
});

// Cloud Run stops a pod with SIGTERM and kills it 10 s later: give answers in flight up to 8 s,
// then delete the Gemini cache so its storage is not billed.
for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.on(signal, async () => {
    const until = Date.now() + 8000;
    while (progress.size > 0 && Date.now() < until) await Bun.sleep(250);
    await deleteCache().catch(() => {});
    process.exit(0);
  });
}

console.log(`listening on :${PORT} (backend=${BACKEND}, store=${STORE}${DEV ? ", dev" : ""}${pdfAvailable ? ", pdf" : ""}${handoffEnabled ? ", handoff" : ""})`);
