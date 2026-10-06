import { join } from "node:path";
import { addReply, getUpload, thread, type ThreadItem } from "./store";

const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
const KEY = process.env.GEMINI_API_KEY;
const ROOT = join(import.meta.dir, "..");

// The instructions: kocha's role and reply format, the CV and tips prompts, the CV format and
// data type, and the research the tips cite. Read once; the Dockerfile copies these files.
const INSTRUCTION_FILES = [
  "docs/prompts/kocha.md",
  "docs/prompts/cv-content.md",
  "docs/prompts/prep-points.md",
  "docs/cv-document.md",
  "frontend/cv/data.ts",
  "docs/cv-knowledge-base.md",
  "docs/cv-weak-points-research.md",
  "docs/cv-sections-research.md",
];
let instructions: Promise<string> | null = null;
const loadInstructions = () =>
  (instructions ??= Promise.all(
    INSTRUCTION_FILES.map(async (f) => `===== ${f} =====\n${await Bun.file(join(ROOT, f)).text()}`),
  ).then((parts) => parts.join("\n\n")));

type Part = { text: string } | { inlineData: { mimeType: string; data: string } };

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

// Answer one message the same way an external agent would: read the thread, add a reply with
// the same id, with the CV and tips the model sent. Works with either store.
export async function answer(id: string) {
  if (!KEY) throw new Error("GEMINI_API_KEY is not set");

  const contents = [];
  for (const m of (await thread()).filter((m) => m.id <= id)) {
    contents.push({ role: "user", parts: await userParts(m) });
    if (m.reply) {
      const { text, cv, tips } = m.reply;
      contents.push({ role: "model", parts: [{ text: JSON.stringify({ text, cv, tips }) }] });
    }
  }

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": KEY },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: await loadInstructions() }] },
      contents,
      generationConfig: { responseMimeType: "application/json" },
    }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);

  const data: any = await res.json();
  const raw = data.candidates?.[0]?.content?.parts?.map((p: any) => p.text ?? "").join("") ?? "";
  let reply: { text?: unknown; cv?: unknown; tips?: unknown };
  try {
    reply = JSON.parse(raw);
  } catch {
    reply = { text: raw }; // not JSON: show it as chat
  }
  const text = typeof reply.text === "string" && reply.text ? reply.text : "(empty response)";
  await addReply(id, text, `gemini:${MODEL}`, { cv: reply.cv, tips: reply.tips });
}
