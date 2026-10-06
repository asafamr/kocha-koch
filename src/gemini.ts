import { join } from "node:path";
import { lookup, researchIndex } from "./kb";
import { addSpend, bucket, cacheCost, canSpend, turnCost } from "./spend";
import { addReply, getUpload, thread, type ThreadItem } from "./store";

const MODEL = process.env.GEMINI_MODEL ?? "gemini-3.8-flash";
const KEY = process.env.GEMINI_API_KEY;
const ROOT = join(import.meta.dir, "..");
const MAX_ROUNDS = 4; // model turns per reply: up to 3 lookups, then the answer
// Knobs, measured in docs/gemini-costs.md. Thinking level: high (default), medium or low
// (gemini-3.8-flash has no minimal); "default" leaves it to the model. GEMINI_CACHE: explicit
// (default) caches the instructions and tools for an hour; "none" sends them with every call.
const LEVEL = process.env.GEMINI_THINKING_LEVEL ?? "high";
const THINKING = LEVEL === "default" ? undefined : LEVEL;
const EXPLICIT_CACHE = (process.env.GEMINI_CACHE ?? "explicit") === "explicit";
const API = "https://generativelanguage.googleapis.com/v1beta";

// The instructions: kocha's role and reply format, the CV and tips prompts, the CV format and
// data type, and a one-line index of the research. Full research entries (with their sources)
// come from the `lookup` tool, so the instructions stay small. The Dockerfile copies these files.
const INSTRUCTION_FILES = [
  "docs/prompts/kocha.md",
  "docs/prompts/cv-content.md",
  "docs/prompts/prep-points.md",
  "docs/cv-document.md",
  "docs/cv-templates.md",
  "frontend/cv/data.ts",
];
let instructions: Promise<string> | null = null;
const loadInstructions = () =>
  (instructions ??= (async () => {
    const files = await Promise.all(
      INSTRUCTION_FILES.map(async (f) => `===== ${f} =====\n${await Bun.file(join(ROOT, f)).text()}`),
    );
    return [...files, `===== research index (call lookup for full entries and sources) =====\n${await researchIndex(ROOT)}`].join(
      "\n\n",
    );
  })());

const TOOLS = [
  {
    functionDeclarations: [
      {
        name: "lookup",
        description:
          "Full text of research entries by id from the research index (e.g. KB:A1, WP:4.3, SR:volunteering, KB:myths), each with its sources (label and URL). Ask for all the ids you need in one call.",
        parameters: {
          type: "object",
          properties: { ids: { type: "array", items: { type: "string" } } },
          required: ["ids"],
        },
      },
    ],
  },
];

type Part = Record<string, unknown>;
type Content = { role: "user" | "model"; parts: Part[] };

// Live progress of answers being written, by message id, for the page's typing indicator.
export type Progress = { phase: "thinking" | "lookup" | "writing"; startedAt: number; thinkingTokens: number; thought?: string };
export const progress = new Map<string, Progress>();

// One user turn: the message text, and for the intake its fields and the CV PDF.
async function userParts(m: ThreadItem): Promise<Part[]> {
  const parts: Part[] = [{ text: m.text }];
  if (m.intake) {
    const { role, jobDescription } = m.intake;
    parts.push({ text: `Intake.\nTarget role: ${role}\nJob description:\n${jobDescription || "(not given)"}` });
    const pdf = await getUpload(m.intake.cvFile);
    if (pdf) parts.push({ inlineData: { mimeType: "application/pdf", data: Buffer.from(pdf).toString("base64") } });
  }
  return parts;
}

// Explicit cache of the instructions and tools, reused until shortly before it expires.
let cache: { name: string; expires: number } | null = null;
async function cachedInstructions(): Promise<string | null> {
  if (!EXPLICIT_CACHE) return null;
  if (cache && cache.expires > Date.now() + 60_000) return cache.name;
  const res = await fetch(`${API}/cachedContents`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": KEY! },
    body: JSON.stringify({
      model: `models/${MODEL}`,
      systemInstruction: { parts: [{ text: await loadInstructions() }] },
      tools: TOOLS,
      ttl: "3600s",
    }),
  });
  if (!res.ok) {
    console.error(`gemini cache create failed ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return null;
  }
  const c: any = await res.json();
  cache = { name: c.name, expires: Date.parse(c.expireTime) };
  addSpend(cacheCost(c.usageMetadata?.totalTokenCount ?? 0, 1));
  console.log(`gemini cache ${c.name} tokens=${c.usageMetadata?.totalTokenCount ?? "?"} until ${c.expireTime}`);
  return c.name;
}

// One model turn, streamed so progress (thinking tokens, the latest thought heading) shows while
// it runs. Returns the turn's parts, as received, and its usage.
async function generate(id: string, contents: Content[], thinkingBefore: number, useCache = true): Promise<{ parts: Part[]; usage: any }> {
  const generationConfig = { thinkingConfig: { ...(THINKING ? { thinkingLevel: THINKING } : {}), includeThoughts: true } };
  const cached = useCache ? await cachedInstructions() : null;
  const body = cached
    ? { cachedContent: cached, contents, generationConfig }
    : { systemInstruction: { parts: [{ text: await loadInstructions() }] }, contents, tools: TOOLS, generationConfig };
  const res = await fetch(`${API}/models/${MODEL}:streamGenerateContent?alt=sse`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": KEY! },
    body: JSON.stringify(body),
  });
  if (!res.ok || !res.body) {
    const err = await res.text();
    if (cached) {
      // The cache may have expired or been rejected: drop it and send the instructions inline.
      console.error(`gemini with cache failed ${res.status}: ${err.slice(0, 300)}`);
      cache = null;
      return generate(id, contents, thinkingBefore, false);
    }
    throw new Error(`Gemini ${res.status}: ${err}`);
  }

  const parts: Part[] = [];
  let usage: any = {};
  let buffer = "";
  const decoder = new TextDecoder();
  // Server-sent events: "data: {json}" lines, events separated by a blank line (CRLF or LF).
  const events = async function* () {
    for await (const chunk of res.body as unknown as AsyncIterable<Uint8Array>) {
      buffer += decoder.decode(chunk, { stream: true }).replace(/\r\n/g, "\n");
      let end;
      while ((end = buffer.indexOf("\n\n")) >= 0) {
        yield buffer.slice(0, end);
        buffer = buffer.slice(end + 2);
      }
    }
    if (buffer.trim()) yield buffer;
  };
  for await (const event of events()) {
    {
      const data = event.split("\n").filter((l) => l.startsWith("data:")).map((l) => l.slice(5)).join("");
      if (!data.trim()) continue;
      const msg: any = JSON.parse(data);
      if (msg.error) throw new Error(`Gemini stream: ${JSON.stringify(msg.error)}`);
      const got: Part[] = msg.candidates?.[0]?.content?.parts ?? [];
      parts.push(...got);
      if (msg.usageMetadata) usage = msg.usageMetadata;
      const p = progress.get(id);
      if (p) {
        p.thinkingTokens = thinkingBefore + (usage.thoughtsTokenCount ?? 0);
        for (const part of got) {
          if (part.thought && typeof part.text === "string") {
            // Thought summaries start with a bold heading: keep it as the progress note.
            const heading = part.text.match(/\*\*(.+?)\*\*/)?.[1] ?? part.text.split("\n")[0];
            if (heading.trim()) p.thought = heading.trim().slice(0, 120);
          } else if (part.text) p.phase = "writing";
        }
      }
    }
  }
  return { parts, usage };
}

// Usage per model turn, so cost and caching show in the logs.
function logUsage(id: string, round: number, u: any, ms: number, note: string) {
  const cost = turnCost(u);
  addSpend(cost);
  const b = bucket();
  console.log(
    `gemini ${id} round ${round}: in=${u.promptTokenCount ?? "?"} cached=${u.cachedContentTokenCount ?? 0} ` +
      `out=${u.candidatesTokenCount ?? 0} thinking=${u.thoughtsTokenCount ?? 0} ${ms}ms $${cost.toFixed(4)} ` +
      `bucket=$${b.level.toFixed(3)}/$${b.capacity} ${note}`,
  );
}

// The reply JSON, also when the model wraps it in a code fence.
function parseReply(raw: string): { text?: unknown; cv?: unknown; tips?: unknown } {
  const json = raw.trim().replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  try {
    return JSON.parse(json);
  } catch {
    return { text: raw }; // not JSON: show it as chat
  }
}

// Answer one message the same way an external agent would: read the thread, add a reply with
// the same id, with the CV and tips the model sent. Works with either store.
export async function answer(id: string) {
  if (!KEY) throw new Error("GEMINI_API_KEY is not set");
  if (!canSpend()) {
    // This pod's spend limit (src/spend.ts) is used up: refuse politely until it drains.
    console.log(`gemini ${id} refused: spend limit ($${bucket().level.toFixed(3)} in the bucket)`);
    await addReply(id, "קוחה עמוסה כרגע. נסו לשלוח שוב בעוד כמה דקות.", "server");
    return;
  }
  progress.set(id, { phase: "thinking", startedAt: Date.now(), thinkingTokens: 0 });
  try {
    const contents: Content[] = [];
    for (const m of (await thread()).filter((m) => m.id <= id)) {
      contents.push({ role: "user", parts: await userParts(m) });
      if (m.reply) {
        const { text, cv, tips } = m.reply;
        contents.push({ role: "model", parts: [{ text: JSON.stringify({ text, cv, tips }) }] });
      }
    }

    let thinkingSoFar = 0;
    for (let round = 1; round <= MAX_ROUNDS; round++) {
      const started = Date.now();
      const { parts, usage } = await generate(id, contents, thinkingSoFar);
      thinkingSoFar += usage.thoughtsTokenCount ?? 0;
      const calls = parts.filter((p) => p.functionCall).map((p) => p.functionCall as { name: string; args?: { ids?: string[] } });
      logUsage(id, round, usage, Date.now() - started, calls.length ? `lookup ${calls.flatMap((c) => c.args?.ids ?? []).join(",")}` : "answer");

      if (calls.length && round < MAX_ROUNDS) {
        const p = progress.get(id);
        if (p) Object.assign(p, { phase: "lookup", thinkingTokens: thinkingSoFar });
        // Send the model's turn back unchanged (it carries thought signatures), then the results.
        contents.push({ role: "model", parts });
        const responses = await Promise.all(
          calls.map(async (c) => ({
            functionResponse: { name: c.name, response: { result: await lookup(ROOT, c.args?.ids ?? []) } },
          })),
        );
        contents.push({ role: "user", parts: responses });
        if (p) p.phase = "thinking";
        continue;
      }

      const raw = parts.map((p) => (typeof p.text === "string" && !p.thought ? p.text : "")).join("");
      const reply = parseReply(raw);
      const text = typeof reply.text === "string" && reply.text ? reply.text : "(empty response)";
      await addReply(id, text, `gemini:${MODEL}`, { cv: reply.cv, tips: reply.tips });
      return;
    }
  } finally {
    progress.delete(id);
  }
}
