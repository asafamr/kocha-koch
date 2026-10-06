import { join, normalize } from "node:path";
import { addMessage, addReply, resetStore, saveUpload, STORE, thread } from "./store";
import { answer } from "./gemini";
import { htmlToPdf, MAX_HTML, pdfAvailable, printPage } from "./pdf";

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

async function postMessage(req: Request) {
  const body = await req.json().catch(() => null);
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  if (!text || text.length > MAX_TEXT) return Response.json({ error: "bad text" }, { status: 400 });

  const msg = await addMessage(text);
  if (BACKEND === "gemini") {
    answer(msg.id).catch((e) => addReply(msg.id, `error: ${e.message}`, "server"));
  }
  return Response.json(msg, { status: 201 });
}

// The intake form: target role, optional job description, consent, and the current CV as a PDF.
// The PDF is saved under uploads/ and the message carries its path for the agent to read.
const MAX_PDF = 5 * 1024 * 1024;
async function postIntake(req: Request) {
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
  const bytes = new Uint8Array(await cv.arrayBuffer());
  if (new TextDecoder().decode(bytes.subarray(0, 5)) !== "%PDF-") {
    return Response.json({ error: "cv must be a PDF" }, { status: 400 });
  }
  const cvFile = await saveUpload("pdf", bytes);
  const text = [`תפקיד מבוקש: ${role}`, jobDescription ? "צירפתי את תיאור המשרה." : "", `קורות חיים: ${cv.name}`]
    .filter(Boolean)
    .join("\n");
  const msg = await addMessage(text, { role, jobDescription, consent, cvFile });
  if (BACKEND === "gemini") {
    answer(msg.id).catch((e) => addReply(msg.id, `error: ${e.message}`, "server"));
  }
  return Response.json(msg, { status: 201 });
}

// The CV as a PDF: the body is the self-contained CV HTML the frontend builds (cv/exportHtml.ts).
async function postPdf(req: Request) {
  if (!pdfAvailable) return Response.json({ error: "pdf rendering is not available here" }, { status: 503 });
  if (Number(req.headers.get("content-length") ?? 0) > MAX_HTML) return Response.json({ error: "too large" }, { status: 413 });
  const html = await req.text();
  if (!html || html.length > MAX_HTML) return Response.json({ error: "bad html" }, { status: 400 });
  try {
    return new Response(await htmlToPdf(html, PORT), { headers: { "content-type": "application/pdf" } });
  } catch (e) {
    console.error("pdf:", e);
    return Response.json({ error: "pdf rendering failed" }, { status: 500 });
  }
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
  async fetch(req, server) {
    const { pathname } = new URL(req.url);
    if (pathname === "/api/messages") {
      if (req.method === "GET") return Response.json({ backend: BACKEND, messages: await thread() });
      if (req.method === "POST") return postMessage(req);
      return new Response("method not allowed", { status: 405 });
    }
    if (pathname === "/api/intake") {
      return req.method === "POST" ? postIntake(req) : new Response("method not allowed", { status: 405 });
    }
    if (pathname === "/api/reset") {
      if (req.method !== "POST") return new Response("method not allowed", { status: 405 });
      await resetStore();
      return new Response(null, { status: 204 });
    }
    if (pathname === "/api/pdf") {
      return req.method === "POST" ? postPdf(req) : new Response("method not allowed", { status: 405 });
    }
    if (pathname.startsWith("/print/")) return printPage(pathname.slice("/print/".length), server.requestIP(req)?.address);
    return serveStatic(pathname);
  },
});

console.log(`listening on :${PORT} (backend=${BACKEND}, store=${STORE}${DEV ? ", dev" : ""}${pdfAvailable ? ", pdf" : ""})`);
