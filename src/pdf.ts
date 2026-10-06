import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

// CV HTML -> PDF with headless Chromium, so every user gets the same PDF with a real text layer
// (browser print differs: Firefox drops bold variable-font text and digits from it, which ATS
// parsers then cannot read).
//
// Containment, since the HTML comes from the client:
// - Chromium loads it from a separate server on a random loopback port that serves nothing but
//   /print/<one-time token>, with a CSP that allows inline styles and data: fonts and images
//   only (no scripts, no network, no files).
// - CSP does not cover navigation (a <meta refresh> could go elsewhere), so every request
//   Chromium makes goes to a dead proxy except those to that one port: the app's own API on
//   loopback is unreachable too. DNS for every other host fails as well.
// - Renders run one at a time, at most one per session, with a short queue and a timeout.

const CHROMIUM = process.env.CHROMIUM ?? Bun.which("chromium-browser") ?? Bun.which("chromium");
export const pdfAvailable = Boolean(CHROMIUM);
export const MAX_HTML = 5 * 1024 * 1024;
const MAX_QUEUE = 4;
const PRINT_CSP = "default-src 'none'; style-src 'unsafe-inline'; font-src data:; img-src data:";

export class PdfBusy extends Error {}

const pages = new Map<string, string>(); // token -> HTML, only while its render runs
let printServer: ReturnType<typeof Bun.serve> | null = null;
function printPort(): number {
  printServer ??= Bun.serve({
    hostname: "127.0.0.1",
    port: 0,
    fetch(req) {
      const token = new URL(req.url).pathname.match(/^\/print\/([0-9a-f-]{36})$/)?.[1];
      const html = token && pages.get(token);
      if (!html) return new Response("not found", { status: 404 });
      return new Response(html, { headers: { "content-type": "text/html; charset=utf-8", "content-security-policy": PRINT_CSP } });
    },
  });
  return printServer.port!;
}

let queue: Promise<unknown> = Promise.resolve();
let waiting = 0;
const rendering = new Set<string>(); // sessions with a render queued or running

export function htmlToPdf(html: string, session: string): Promise<ArrayBuffer> {
  if (waiting >= MAX_QUEUE || rendering.has(session)) return Promise.reject(new PdfBusy());
  waiting++;
  rendering.add(session);
  const run = queue.then(() => render(html)).finally(() => {
    waiting--;
    rendering.delete(session);
  });
  queue = run.catch(() => {});
  return run;
}

async function render(html: string): Promise<ArrayBuffer> {
  if (!CHROMIUM) throw new Error("chromium not installed");
  const port = printPort();
  const token = crypto.randomUUID();
  const dir = await mkdtemp(join(tmpdir(), "pdf-"));
  const out = join(dir, "cv.pdf");
  pages.set(token, html);
  try {
    const proc = Bun.spawn(
      [
        CHROMIUM,
        "--headless",
        "--no-sandbox", // the container drops all capabilities, so Chromium's own sandbox cannot start
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--no-pdf-header-footer",
        "--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1",
        "--proxy-server=http://127.0.0.1:9", // nothing listens there
        `--proxy-bypass-list=<-loopback>;127.0.0.1:${port}`,
        "--virtual-time-budget=3000", // let the embedded fonts load
        `--user-data-dir=${join(dir, "profile")}`,
        `--print-to-pdf=${out}`,
        `http://127.0.0.1:${port}/print/${token}`,
      ],
      { env: { ...process.env, HOME: dir }, stdout: "ignore", stderr: "pipe", timeout: 30_000 },
    );
    const code = await proc.exited;
    const file = Bun.file(out);
    if (code !== 0 || !(await file.exists())) {
      const err = (await new Response(proc.stderr).text()).trim().split("\n").slice(-3).join(" | ");
      throw new Error(`chromium exited ${code}: ${err}`);
    }
    return await file.arrayBuffer();
  } finally {
    pages.delete(token);
    await rm(dir, { recursive: true, force: true });
  }
}
