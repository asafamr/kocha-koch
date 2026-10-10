import { join } from "node:path";
import { FIT_PREFIX } from "./fit";
import { lookup, researchIndex } from "./kb";
import { addSpend, bucket, cacheCost, endTurn, startTurn, turnCost } from "./spend";
import { addReply, getUpload, thread, type ThreadItem } from "./store";

const MODEL = process.env.GEMINI_MODEL ?? "gemini-3.8-flash";
const KEY = process.env.GEMINI_API_KEY;
const ROOT = join(import.meta.dir, "..");
const MAX_ROUNDS = 4; // model turns per reply: up to 3 lookups, then the answer
// Knobs, measured in docs/gemini-costs.md. Thinking level: medium (default), high or low
// (gemini-3.8-flash has no minimal); "default" leaves it to the model. GEMINI_CACHE: explicit
// (default) caches the instructions and tools (10 minutes, extended on use); "none" sends them
// with every call.
const LEVEL = process.env.GEMINI_THINKING_LEVEL ?? "medium";
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
export type Progress = { phase: "thinking" | "lookup" | "writing" | "verifying"; startedAt: number; thinkingTokens: number; thought?: string };
export const progress = new Map<string, Progress>();

// One user turn: the message text, the layout report if `withContext`, and for the intake its fields and the CV PDF.
async function userParts(session: string, m: ThreadItem, withContext: boolean): Promise<Part[]> {
  const parts: Part[] = [{ text: m.text }];
  if (withContext && m.context) parts.push({ text: `Layout report (measured by the app, not written by the user):\n${m.context}` });
  if (m.intake) {
    const { role, jobDescription } = m.intake;
    parts.push({ text: `Intake.\nTarget role: ${role}\nJob description:\n${jobDescription || "(not given)"}` });
    const pdf = await getUpload(session, m.intake.cvFile);
    if (pdf) parts.push({ inlineData: { mimeType: "application/pdf", data: Buffer.from(pdf).toString("base64") } });
  }
  return parts;
}

// Explicit cache of the instructions and tools. Storage is billed for as long as it exists, so
// it lives 10 minutes, is extended when used, and is deleted when the server stops (Cloud Run
// sends SIGTERM). An idle pod pays for at most 10 minutes.
const CACHE_TTL_S = 600;
let cache: { name: string; expires: number; tokens: number } | null = null;
async function cachedInstructions(): Promise<string | null> {
  if (!EXPLICIT_CACHE) return null;
  if (cache && cache.expires > Date.now() + 60_000) {
    if (cache.expires < Date.now() + (CACHE_TTL_S * 1000) / 2) await extendCache(cache);
    return cache.name;
  }
  const res = await fetch(`${API}/cachedContents`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": KEY! },
    body: JSON.stringify({
      model: `models/${MODEL}`,
      systemInstruction: { parts: [{ text: await loadInstructions() }] },
      tools: TOOLS,
      ttl: `${CACHE_TTL_S}s`,
    }),
  });
  if (!res.ok) {
    console.error(`gemini cache create failed ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return null;
  }
  const c: any = await res.json();
  cache = { name: c.name, expires: Date.parse(c.expireTime), tokens: c.usageMetadata?.totalTokenCount ?? 0 };
  addSpend(cacheCost(cache.tokens, CACHE_TTL_S / 3600));
  console.log(`gemini cache ${c.name} tokens=${c.usageMetadata?.totalTokenCount ?? "?"} until ${c.expireTime}`);
  return c.name;
}

async function extendCache(c: { name: string; expires: number; tokens: number }) {
  const res = await fetch(`${API}/${c.name}`, {
    method: "PATCH",
    headers: { "content-type": "application/json", "x-goog-api-key": KEY! },
    body: JSON.stringify({ ttl: `${CACHE_TTL_S}s` }),
  });
  if (!res.ok) return; // it will be recreated when it expires
  const expires = Date.parse(((await res.json()) as any).expireTime);
  addSpend(cacheCost(c.tokens, Math.max(0, expires - c.expires) / 3_600_000));
  c.expires = expires;
}

export async function deleteCache() {
  if (!cache) return;
  const name = cache.name;
  cache = null;
  await fetch(`${API}/${name}`, { method: "DELETE", headers: { "x-goog-api-key": KEY! } }).catch(() => {});
  console.log(`gemini cache ${name} deleted`);
}

// One model turn, streamed so progress (thinking tokens, the latest thought heading) shows while
// it runs. Returns the turn's parts, as received, and its usage. `json`: the answer turn, with
// tools off and JSON response mode on, so the reply is valid JSON (prompts alone do not ensure
// it; JSON mode with tools on makes the model call tools even when it should answer).
async function generate(
  id: string,
  contents: Content[],
  thinkingBefore: number,
  json: boolean,
  useCache = true,
  level = THINKING,
): Promise<{ parts: Part[]; usage: any }> {
  const generationConfig = {
    thinkingConfig: { ...(level ? { thinkingLevel: level } : {}), includeThoughts: true },
    ...(json ? { responseMimeType: "application/json" } : {}),
  };
  const toolConfig = json ? { functionCallingConfig: { mode: "NONE" } } : undefined;
  // The cache holds the tools, and a cached request cannot switch them off: JSON turns go inline.
  const cached = useCache && !json ? await cachedInstructions() : null;
  const body = cached
    ? { cachedContent: cached, contents, generationConfig, toolConfig }
    : { systemInstruction: { parts: [{ text: await loadInstructions() }] }, contents, tools: TOOLS, toolConfig, generationConfig };
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
      return generate(id, contents, thinkingBefore, json, false, level);
    }
    throw new Error(`Gemini ${res.status}: ${err.slice(0, 300)}`);
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

// The verification pass (docs/prompts/verify.md): a cheap low-thinking call compares every
// string of the new CV with the sources (the uploaded CV, the intake fields, the user's chat
// messages) and returns the smallest fixes, which are applied by exact match.
let verifyPrompt: Promise<string> | null = null;
async function verifyCv(id: string, sources: Part[], data: unknown): Promise<unknown> {
  const p = progress.get(id);
  if (p) p.phase = "verifying";
  verifyPrompt ??= Bun.file(join(ROOT, "docs/prompts/verify.md")).text();
  const started = Date.now();
  const res = await fetch(`${API}/models/${MODEL}:generateContent`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": KEY! },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: await verifyPrompt }] },
      contents: [{ role: "user", parts: [...sources, { text: `New CV (JSON):\n${JSON.stringify(data)}` }] }],
      generationConfig: { responseMimeType: "application/json", thinkingConfig: { thinkingLevel: "low" } },
    }),
  });
  if (!res.ok) {
    console.error(`gemini ${id} verify failed ${res.status}`);
    return data; // keep the unverified CV rather than fail the reply
  }
  const out: any = await res.json();
  const raw = out.candidates?.[0]?.content?.parts?.map((x: any) => (x.thought ? "" : x.text ?? "")).join("") ?? "";
  let fixes: { before: string; after: string; why?: string }[] = [];
  try {
    fixes = (JSON.parse(raw).fixes ?? []).filter((f: any) => typeof f?.before === "string" && typeof f?.after === "string");
  } catch {
    // unreadable verifier output: keep the CV as written
  }
  let applied = 0;
  const fix = (v: unknown): unknown => {
    if (typeof v === "string") {
      const f = fixes.find((x) => x.before === v);
      if (f) applied++;
      return f ? f.after : v;
    }
    if (Array.isArray(v)) return v.map(fix);
    if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fix(x)]));
    return v;
  };
  const fixed = fix(data);
  logUsage(id, 0, out.usageMetadata ?? {}, Date.now() - started, `verify: ${applied}/${fixes.length} fixes`);
  // Counts only: the fixed strings are CV content, which stays out of the logs.
  return fixed;
}

// What the CV may claim: the user's uploaded CV, the intake fields and the user's messages.
async function sourceParts(session: string, messages: ThreadItem[]): Promise<Part[]> {
  const parts: Part[] = [];
  const said: string[] = [];
  for (const m of messages) {
    if (m.intake) {
      parts.push({ text: `Target role: ${m.intake.role}\nJob description:\n${m.intake.jobDescription || "(not given)"}` });
      const pdf = await getUpload(session, m.intake.cvFile);
      if (pdf) parts.push({ text: "The user's CV:" }, { inlineData: { mimeType: "application/pdf", data: Buffer.from(pdf).toString("base64") } });
    } else said.push(m.text);
  }
  if (said.length) parts.push({ text: `What the user said in the chat:\n${said.map((t) => `- ${t}`).join("\n")}` });
  return parts;
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

// The reply JSON. Models sometimes wrap it in a code fence or write prose before it, so try the
// whole text, then a fenced block, then the span from the first "{" to the last "}". Null when
// none of them is a reply object.
function parseReply(raw: string): { text: string; cv?: unknown; tips?: unknown } | null {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1];
  const braces = raw.includes("{") ? raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1) : "";
  for (const candidate of [raw.trim(), fenced, braces]) {
    if (!candidate) continue;
    try {
      const v = JSON.parse(candidate);
      if (v && typeof v === "object" && typeof v.text === "string") return v;
    } catch {
      // try the next form
    }
  }
  console.log("gemini reply was not valid JSON");
  return null;
}

// Answer one message the same way an external agent would: read the thread, add a reply with
// the same id, with the CV and tips the model sent. Works with either store.
export async function answer(session: string, id: string) {
  if (!KEY) throw new Error("GEMINI_API_KEY is not set");
  if (!startTurn()) {
    // This pod's spend limit (src/spend.ts) is used up: refuse politely until it drains.
    console.log(`gemini ${id} refused: spend limit ($${bucket().level.toFixed(3)} in the bucket)`);
    await addReply(session, id, "קוחה עמוסה כרגע. נסו לשלוח שוב בעוד כמה דקות.", "server");
    return;
  }
  progress.set(id, { phase: "thinking", startedAt: Date.now(), thinkingTokens: 0 });
  try {
    const contents: Content[] = [];
    const history = (await thread(session)).filter((m) => m.id <= id);
    // A fit request comes with real measurements, so the model only does arithmetic: low thinking.
    const level = history.at(-1)?.text.startsWith(FIT_PREFIX) ? "low" : THINKING;
    for (const m of history) {
      contents.push({ role: "user", parts: await userParts(session, m, m.id === id) });
      if (m.reply) {
        const { text, cv, tips } = m.reply;
        contents.push({ role: "model", parts: [{ text: JSON.stringify({ text, cv, tips }) }] });
      }
    }

    let thinkingSoFar = 0;
    let json = false; // the turn after a lookup, or a retry after a reply that was not JSON
    for (let round = 1; round <= MAX_ROUNDS; round++) {
      const started = Date.now();
      const { parts, usage } = await generate(id, contents, thinkingSoFar, json, true, level);
      thinkingSoFar += usage.thoughtsTokenCount ?? 0;
      const calls = parts.filter((p) => p.functionCall).map((p) => p.functionCall as { name: string; args?: { ids?: string[] } });
      logUsage(id, round, usage, Date.now() - started, calls.length ? `lookup ${calls.flatMap((c) => c.args?.ids ?? []).join(",")}` : "answer");

      if (calls.length && !json && round < MAX_ROUNDS) {
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
        json = true;
        continue;
      }

      const raw = parts.map((p) => (typeof p.text === "string" && !p.thought ? p.text : "")).join("");
      const reply = parseReply(raw);
      if (reply === null && round < MAX_ROUNDS) {
        // Ask again in JSON mode; the invalid reply is dropped. JSON mode alone is not a guarantee
        // (one reply closed an object with "]"), and a loose schema made the model drop cv and tips.
        json = true;
        continue;
      }
      const text = reply ? (reply.text as string) : raw || "(empty response)";
      const cv = reply?.cv as { data?: unknown } | undefined;
      if (cv?.data) cv.data = await verifyCv(id, await sourceParts(session, history), cv.data);
      await addReply(session, id, text, `gemini:${MODEL}`, { cv, tips: reply?.tips });
      return;
    }
  } finally {
    endTurn();
    progress.delete(id);
  }
}
