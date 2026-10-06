import { mkdir, readdir, rename } from "node:fs/promises";
import { join } from "node:path";

// Two stores with the same shape:
//   STORE=files (default): the file protocol in AGENTS.md, needed when an external agent answers.
//     .messages/inbox/<id>.json   written by the server for each user message
//     .messages/outbox/<id>.json  the reply, with the same id
//     .messages/uploads/<file>    files the user uploaded (the intake CV PDF)
//     .messages/archive/<time>/   earlier conversations, moved here by a reset ("start over")
//   STORE=memory: kept in process, nothing touches disk, lost on restart.
// A message is pending while it has no reply with the same id.

// The intake form, sent once at the start. cvFile is relative to the messages dir.
export type Intake = { role: string; jobDescription: string; consent: boolean; cvFile: string };
export type Message = { id: string; ts: string; text: string; intake?: Intake };
// A reply may carry a CV update and tips as JSON (docs/cv-document.md, docs/prompts/prep-points.md).
// The server passes them through unchanged; the frontend validates their shape.
export type Reply = { id: string; ts: string; text: string; by: string; cv?: unknown; tips?: unknown };
export type ThreadItem = Message & { reply: Reply | null };

type Store = {
  put(box: "inbox" | "outbox", item: Message | Reply): Promise<void>;
  list(): Promise<{ inbox: Message[]; outbox: Reply[] }>;
  putFile(name: string, bytes: Uint8Array): Promise<string>; // returns the path the agent reads
  reset(): Promise<void>; // start a new conversation (files: archived, memory: dropped)
};

function memoryStore(): Store {
  const boxes = { inbox: [] as Message[], outbox: [] as Reply[] };
  const files = new Map<string, Uint8Array>();
  return {
    async put(box, item) {
      (boxes[box] as (Message | Reply)[]).push(item);
    },
    async list() {
      return { inbox: [...boxes.inbox], outbox: [...boxes.outbox] };
    },
    async putFile(name, bytes) {
      files.set(name, bytes);
      return `uploads/${name}`;
    },
    async reset() {
      boxes.inbox = [];
      boxes.outbox = [];
      files.clear();
    },
  };
}

async function fileStore(root: string): Promise<Store> {
  const dirs = { inbox: join(root, "inbox"), outbox: join(root, "outbox"), uploads: join(root, "uploads") };
  await Promise.all(Object.values(dirs).map((d) => mkdir(d, { recursive: true })));

  async function readAll<T>(dir: string): Promise<T[]> {
    const names = (await readdir(dir)).filter((n) => n.endsWith(".json") && !n.startsWith("."));
    const items = await Promise.all(
      names.map((n) => Bun.file(join(dir, n)).json().catch(() => null)),
    );
    return items.filter(Boolean) as T[];
  }

  return {
    // Write to a temp name, then rename, so readers never see half a file.
    async put(box, item) {
      const tmp = join(dirs[box], `.${item.id}.tmp`);
      await Bun.write(tmp, JSON.stringify(item, null, 2) + "\n");
      await rename(tmp, join(dirs[box], `${item.id}.json`));
    },
    async list() {
      const [inbox, outbox] = await Promise.all([
        readAll<Message>(dirs.inbox),
        readAll<Reply>(dirs.outbox),
      ]);
      return { inbox, outbox };
    },
    async putFile(name, bytes) {
      await Bun.write(join(dirs.uploads, name), bytes);
      return `uploads/${name}`;
    },
    // Move the conversation aside (nothing is deleted), then start with empty folders.
    async reset() {
      const archive = join(root, "archive", new Date().toISOString().replace(/[:.]/g, "-"));
      await mkdir(archive, { recursive: true });
      for (const [name, dir] of Object.entries(dirs)) await rename(dir, join(archive, name));
      await Promise.all(Object.values(dirs).map((d) => mkdir(d, { recursive: true })));
    },
  };
}

export const STORE = process.env.STORE ?? "files";
const store =
  STORE === "memory" ? memoryStore() : await fileStore(process.env.MESSAGES_DIR ?? ".messages");

const newId = () => `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;

export async function addMessage(text: string, intake?: Intake): Promise<Message> {
  const msg: Message = { id: newId(), ts: new Date().toISOString(), text, ...(intake ? { intake } : {}) };
  await store.put("inbox", msg);
  return msg;
}

export async function addReply(id: string, text: string, by: string) {
  await store.put("outbox", { id, ts: new Date().toISOString(), text, by });
}

// Save an uploaded file under a fresh name; returns its path relative to the messages dir.
export async function saveUpload(ext: string, bytes: Uint8Array): Promise<string> {
  return store.putFile(`${newId()}.${ext}`, bytes);
}

export const resetStore = () => store.reset();

export async function thread(): Promise<ThreadItem[]> {
  const { inbox, outbox } = await store.list();
  const replies = new Map(outbox.map((r) => [r.id, r]));
  return inbox
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((m) => ({ ...m, reply: replies.get(m.id) ?? null }));
}
