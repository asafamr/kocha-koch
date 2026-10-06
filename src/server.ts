import { join, normalize } from "node:path";
import { addMessage, addReply, resetStore, saveUpload, STORE, thread, type ThreadItem } from "./store";
import { answer, deleteCache, progress } from "./gemini";
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
const MAX_TEXT = 20_000;

// Sessions (STORE=memory, the managed app): each browser gets a random id in an HttpOnly cookie
// and sees only its own conversation. With STORE=files there is one local conversation.
const COOKIE = "kocha_session";
const SESSION_MAX_AGE_S = 6 * 3600;
type Session = { id: string; setCookie?: string };
function sessionOf(req: Request): Session {
  if (STORE !== "memory") return { id: "local" };
  const found = req.headers.get("cookie")?.match(/(?:^|;\s*)kocha_session=([0-9a-f-]{36})(?:;|$)/)?.[1];
  if (found) return { id: found };
  const id = crypto.randomUUID();
  const secure = req.headers.get("x-forwarded-proto") === "https" ? "; Secure" : "";
  return { id, setCookie: `${COOKIE}=${id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_MAX_AGE_S}${secure}` };
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
function startAnswer(session: string, id: string) {
  answer(session, id).catch((e) => {
    console.error(`gemini ${id} failed:`, e?.message ?? e);
    return addReply(session, id, "משהו השתבש אצלי. נסו לשלוח שוב בעוד רגע.", "server");
  });
}

async function postMessage(req: Request, s: Session) {
  const body = await req.json().catch(() => null);
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  if (!text || text.length > MAX_TEXT) return Response.json({ error: "bad text" }, { status: 400 });
  const limited = overLimit(await thread(s.id), false);
  if (limited) return limited;

  const msg = await addMessage(s.id, text);
  if (BACKEND === "gemini") startAnswer(s.id, msg.id);
  return Response.json(msg, { status: 201 });
}

// The intake form: target role, optional job description, consent, and the current CV as a PDF.
// The PDF is saved under uploads/ and the message carries its path for the agent to read.
const MAX_PDF = 5 * 1024 * 1024;
async function postIntake(req: Request, s: Session) {
  const form = await req.formData().catch(() => null);
  const role = String(form?.get("role") ?? "").trim();
  const jobDescription = String(form?.get("jobDescription") ?? "").trim();
  const consent = form?.get("consent") === "true";
  const cv = form?.get("cv");
  if (!role || role.length > 200 || jobDescription.length > MAX_TEXT) {
    return Response.json({ error: "bad role or job description" }, { status: 400 });
  }
  if (!(cv instanceof File) || cv.size === 0 || cv.size > MAX_PDF) {
    return Response.json({ error: "cv must be a PDF up to 5 MB" }, { status: 400 });
  }
  const limited = overLimit(await thread(s.id), true);
  if (limited) return limited;
  const bytes = new Uint8Array(await cv.arrayBuffer());
  if (new TextDecoder().decode(bytes.subarray(0, 5)) !== "%PDF-") {
    return Response.json({ error: "cv must be a PDF" }, { status: 400 });
  }
  const cvFile = await saveUpload(s.id, "pdf", bytes);
  const text = [`תפקיד מבוקש: ${role}`, jobDescription ? "צירפתי את תיאור המשרה." : "", `קורות חיים: ${cv.name}`]
    .filter(Boolean)
    .join("\n");
  const msg = await addMessage(s.id, text, { role, jobDescription, consent, cvFile });
  if (BACKEND === "gemini") startAnswer(s.id, msg.id);
  return Response.json(msg, { status: 201 });
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

// Pending messages the Gemini backend is answering get their live progress (typing indicator).
function withProgress(messages: ThreadItem[]) {
  return messages.map((m) => {
    const p = !m.reply && progress.get(m.id);
    if (!p) return m;
    const { phase, thinkingTokens, thought } = p;
    return { ...m, progress: { phase, thinkingTokens, thought, seconds: Math.round((Date.now() - p.startedAt) / 1000) } };
  });
}

async function api(req: Request, pathname: string, s: Session): Promise<Response> {
  const route = `${req.method} ${pathname}`;
  if (route === "GET /api/messages") return Response.json({ backend: BACKEND, messages: withProgress(await thread(s.id)) });
  if (route === "POST /api/messages") return postMessage(req, s);
  if (route === "POST /api/intake") return postIntake(req, s);
  if (route === "POST /api/pdf") return postPdf(req, s);
  if (route === "POST /api/reset") {
    await resetStore(s.id);
    return new Response(null, { status: 204 });
  }
  return new Response("not found", { status: 404 });
}

async function serveStatic(pathname: string) {
  const path = normalize(join(DIST, pathname === "/" ? "index.html" : pathname));
  if (!path.startsWith(DIST)) return new Response("forbidden", { status: 403 });
  const file = Bun.file(path);
  return (await file.exists()) ? new Response(file) : new Response("not found", { status: 404 });
}

Bun.serve({
  port: PORT,
  development: DEV && { hmr: true },
  routes: DEV ? { "/": (await import("../frontend/index.html")).default } : undefined,
  async fetch(req) {
    const { pathname } = new URL(req.url);
    if (!pathname.startsWith("/api/")) return serveStatic(pathname);
    const s = sessionOf(req);
    const res = await api(req, pathname, s);
    if (s.setCookie) res.headers.append("set-cookie", s.setCookie);
    return res;
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

console.log(`listening on :${PORT} (backend=${BACKEND}, store=${STORE}${DEV ? ", dev" : ""}${pdfAvailable ? ", pdf" : ""})`);
