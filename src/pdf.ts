import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

// CV HTML -> PDF with headless Chromium, so every user gets the same PDF with a real text layer
// (browser print differs: Firefox drops bold variable-font text and digits from it, which ATS
// parsers then cannot read).
//
// Containment, since the HTML comes from the client: Chromium loads it from this server under a
// one-time token, only over loopback, with a CSP that allows inline styles and data: fonts and
// images and nothing else (no scripts, no network, no files). DNS for every other host fails.
// Renders run one at a time, with a timeout.

const CHROMIUM = process.env.CHROMIUM ?? Bun.which("chromium-browser") ?? Bun.which("chromium");
export const pdfAvailable = Boolean(CHROMIUM);
export const MAX_HTML = 5 * 1024 * 1024;
const PRINT_CSP = "default-src 'none'; style-src 'unsafe-inline'; font-src data:; img-src data:";
const pages = new Map<string, string>(); // token -> HTML, only while its render runs

const isLoopback = (ip?: string) => ip === "127.0.0.1" || ip === "::1" || ip === "::ffff:127.0.0.1";

// GET /print/<token>: the page Chromium prints.
export function printPage(token: string, ip?: string): Response {
  const html = isLoopback(ip) ? pages.get(token) : undefined;
  if (!html) return new Response("not found", { status: 404 });
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8", "content-security-policy": PRINT_CSP } });
}

let queue: Promise<unknown> = Promise.resolve();
export function htmlToPdf(html: string, port: number): Promise<ArrayBuffer> {
  const run = queue.then(() => render(html, port));
  queue = run.catch(() => {});
  return run;
}

async function render(html: string, port: number): Promise<ArrayBuffer> {
  if (!CHROMIUM) throw new Error("chromium not installed");
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
