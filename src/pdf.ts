// CV HTML -> PDF through the PDF service (Gotenberg, Dockerfile.pdf), so every user gets the same
// PDF with a real text layer (browser print differs: Firefox drops bold variable-font text and
// digits from it, which ATS parsers then cannot read). The service runs Chromium with JavaScript
// off and no network access; this side bounds the load: renders run one at a time per session,
// with a short global queue and a timeout.
//
// PDF_URL: the service's base URL (compose: http://pdf:3000). PDF_AUTH=id-token: the service is a
// private Cloud Run service, so each call carries an identity token for it, from the metadata
// server of the calling service's own identity.

const PDF_URL = (process.env.PDF_URL ?? "").replace(/\/$/, "");
const ID_TOKEN = process.env.PDF_AUTH === "id-token";
export const pdfAvailable = Boolean(PDF_URL);
export const MAX_HTML = 5 * 1024 * 1024;
const MAX_QUEUE = 4;

export class PdfBusy extends Error {}

let token: { value: string; until: number } | null = null;
async function authHeader(): Promise<Record<string, string>> {
  if (!ID_TOKEN) return {};
  if (!token || token.until < Date.now()) {
    const res = await fetch(
      `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${encodeURIComponent(PDF_URL)}`,
      { headers: { "Metadata-Flavor": "Google" } },
    );
    if (!res.ok) throw new Error(`identity token: ${res.status}`);
    token = { value: await res.text(), until: Date.now() + 50 * 60_000 }; // tokens last an hour
  }
  return { authorization: `Bearer ${token.value}` };
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
  if (!PDF_URL) throw new Error("PDF_URL not set");
  const form = new FormData();
  form.append("files", new File([html], "index.html", { type: "text/html" }));
  // A4, no margins (the CV page sets its own), backgrounds on, the page's own size wins.
  for (const [k, v] of Object.entries({
    paperWidth: "8.27",
    paperHeight: "11.7",
    marginTop: "0",
    marginBottom: "0",
    marginLeft: "0",
    marginRight: "0",
    printBackground: "true",
    preferCssPageSize: "true",
  })) form.append(k, v);
  const res = await fetch(`${PDF_URL}/forms/chromium/convert/html`, {
    method: "POST",
    headers: await authHeader(),
    body: form,
    signal: AbortSignal.timeout(40_000),
  });
  if (!res.ok) throw new Error(`pdf service ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.arrayBuffer();
}
