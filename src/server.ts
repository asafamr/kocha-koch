import { join, normalize } from "node:path";
import { addMessage, addReply, STORE, thread } from "./store";
import { answer } from "./gemini";

const BACKEND = process.env.BACKEND ?? "files"; // "files" | "gemini"
if (BACKEND === "files" && STORE !== "files") {
  throw new Error("BACKEND=files needs STORE=files: the agent reads messages from disk");
}
const PORT = Number(process.env.PORT ?? 3000);
// Bundled frontend, built by `bun run build` (see Dockerfile).
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

async function serveStatic(pathname: string) {
  const path = normalize(join(DIST, pathname === "/" ? "index.html" : pathname));
  if (!path.startsWith(DIST)) return new Response("forbidden", { status: 403 });
  const file = Bun.file(path);
  return (await file.exists()) ? new Response(file) : new Response("not found", { status: 404 });
}

Bun.serve({
  port: PORT,
  async fetch(req) {
    const { pathname } = new URL(req.url);
    if (pathname === "/api/messages") {
      if (req.method === "GET") return Response.json({ backend: BACKEND, messages: await thread() });
      if (req.method === "POST") return postMessage(req);
      return new Response("method not allowed", { status: 405 });
    }
    return serveStatic(pathname);
  },
});

console.log(`listening on :${PORT} (backend=${BACKEND}, store=${STORE})`);
