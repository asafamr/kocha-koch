import { addReply, thread } from "./store";

const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
const KEY = process.env.GEMINI_API_KEY;

// Answer one inbox message the same way an external agent would: read the
// thread, write .messages/outbox/<id>.json.
export async function answer(id: string) {
  if (!KEY) throw new Error("GEMINI_API_KEY is not set");

  const contents = (await thread())
    .filter((m) => m.id <= id)
    .flatMap((m) => [
      { role: "user", parts: [{ text: m.text }] },
      ...(m.reply ? [{ role: "model", parts: [{ text: m.reply.text }] }] : []),
    ]);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": KEY },
      body: JSON.stringify({ contents }),
    },
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);

  const data: any = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") ?? "";
  await addReply(id, text || "(empty response)", `gemini:${MODEL}`);
}
