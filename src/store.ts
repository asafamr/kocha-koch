import { mkdir, readdir, rename } from "node:fs/promises";
import { join } from "node:path";

// File protocol (see AGENTS.md):
//   .messages/inbox/<id>.json   written by the server for each user message
//   .messages/outbox/<id>.json  the reply, written by the agent or the Gemini backend
// A message is pending while it has no outbox file with the same id.

export type Message = { id: string; ts: string; text: string };
export type Reply = Message & { by: string };

const MESSAGES_DIR = process.env.MESSAGES_DIR ?? ".messages";
export const INBOX = join(MESSAGES_DIR, "inbox");
export const OUTBOX = join(MESSAGES_DIR, "outbox");

await mkdir(INBOX, { recursive: true });
await mkdir(OUTBOX, { recursive: true });

// Write to a temp name, then rename, so readers never see half a file.
async function writeJson(dir: string, id: string, value: unknown) {
  const tmp = join(dir, `.${id}.tmp`);
  await Bun.write(tmp, JSON.stringify(value, null, 2) + "\n");
  await rename(tmp, join(dir, `${id}.json`));
}

async function readAll<T>(dir: string): Promise<T[]> {
  const names = (await readdir(dir)).filter((n) => n.endsWith(".json") && !n.startsWith("."));
  const items = await Promise.all(
    names.map((n) => Bun.file(join(dir, n)).json().catch(() => null)),
  );
  return items.filter(Boolean) as T[];
}

export async function addMessage(text: string): Promise<Message> {
  const id = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  const msg = { id, ts: new Date().toISOString(), text };
  await writeJson(INBOX, id, msg);
  return msg;
}

export async function addReply(id: string, text: string, by: string) {
  await writeJson(OUTBOX, id, { id, ts: new Date().toISOString(), text, by });
}

export async function thread() {
  const [inbox, outbox] = await Promise.all([readAll<Message>(INBOX), readAll<Reply>(OUTBOX)]);
  const replies = new Map(outbox.map((r) => [r.id, r]));
  return inbox
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((m) => ({ ...m, reply: replies.get(m.id) ?? null }));
}
