import { mkdir, readdir, rename } from "node:fs/promises";
import { join } from "node:path";
import type { ConsentRecord } from "./consent";

// Two stores with the same shape:
//   STORE=files (default): the file protocol in AGENTS.md, needed when an external agent answers.
//     .messages/inbox/<id>.json   written by the server for each user message
//     .messages/outbox/<id>.json  the reply, with the same id
//     .messages/uploads/<file>    files the user uploaded (the intake CV PDF)
//     .messages/archive/<time>/   earlier conversations, moved here by a reset ("start over")
//     One conversation: local runs are single-user (ports bind to 127.0.0.1), so the session
//     argument is ignored.
//   STORE=memory: kept in process, one conversation per browser session (a cookie set by the
//     server), nothing touches disk. Sessions idle for SESSION_TTL are dropped, and the oldest go
//     first when there are too many or their uploads take too much memory.
// A message is pending while it has no reply with the same id.

// The intake form, sent once at the start. cvFile is relative to the messages dir. consents: the
// purposes the user agreed to (src/consent.ts), recorded with version, time, IP and user agent.
// utm: the ad tags (utm_source, ...) the user arrived with, if any.
export type Intake = { role: string; jobDescription: string; consents: ConsentRecord[]; cvFile: string; utm?: Record<string, string> };
// context: hidden text for the model (the browser's layout report), never shown to the user.
export type Message = { id: string; ts: string; text: string; intake?: Intake; context?: string };
// A reply may carry a CV update and tips as JSON (docs/cv-document.md, docs/prompts/prep-points.md).
// The server passes them through unchanged; the frontend validates their shape.
export type Reply = { id: string; ts: string; text: string; by: string; cv?: unknown; tips?: unknown };
// progress: set by the server for a message the Gemini backend is still answering.
export type ThreadItem = Message & {
  reply: Reply | null;
  progress?: { phase: "thinking" | "lookup" | "writing" | "verifying"; seconds: number; thinkingTokens: number; thought?: string };
};

type Store = {
  put(session: string, box: "inbox" | "outbox", item: Message | Reply): Promise<void>;
  list(session: string): Promise<{ inbox: Message[]; outbox: Reply[] }>;
  putFile(session: string, name: string, bytes: Uint8Array): Promise<string>; // returns the path the agent reads
  getFile(session: string, path: string): Promise<Uint8Array | null>; // a path putFile returned
  reset(session: string): Promise<void>; // start a new conversation (files: archived, memory: dropped)
};

const SESSION_TTL_MS = 6 * 3_600_000;
const MAX_SESSIONS = 2000;
const MAX_UPLOAD_BYTES = 256 * 1024 * 1024; // all sessions together

function memoryStore(): Store {
  type Conv = { inbox: Message[]; outbox: Reply[]; files: Map<string, Uint8Array>; touched: number };
  const convs = new Map<string, Conv>(); // insertion order = least recently used first
  const bytes = () => [...convs.values()].reduce((s, c) => s + [...c.files.values()].reduce((t, f) => t + f.length, 0), 0);
  const evict = () => {
    const now = Date.now();
    for (const [k, c] of convs) if (now - c.touched > SESSION_TTL_MS) convs.delete(k);
    while (convs.size > MAX_SESSIONS || (convs.size > 1 && bytes() > MAX_UPLOAD_BYTES)) convs.delete(convs.keys().next().value!);
  };
  const conv = (session: string) => {
    let c = convs.get(session);
    if (c) convs.delete(session); // re-insert to mark it recently used
    else c = { inbox: [], outbox: [], files: new Map(), touched: 0 };
    c.touched = Date.now();
    convs.set(session, c);
    evict();
    return c;
  };
  return {
    async put(session, box, item) {
      (conv(session)[box] as (Message | Reply)[]).push(item);
    },
    async list(session) {
      const c = conv(session);
      return { inbox: [...c.inbox], outbox: [...c.outbox] };
    },
    async putFile(session, name, data) {
      conv(session).files.set(name, data);
      evict();
      return `uploads/${name}`;
    },
    async getFile(session, path) {
      return convs.get(session)?.files.get(path.replace(/^uploads\//, "")) ?? null;
    },
    async reset(session) {
      convs.delete(session);
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
    async put(_session, box, item) {
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
    async putFile(_session, name, bytes) {
      await Bun.write(join(dirs.uploads, name), bytes);
      return `uploads/${name}`;
    },
    async getFile(_session, path) {
      const name = path.replace(/^uploads\//, "");
      if (name.includes("/") || name.startsWith(".")) return null;
      const file = Bun.file(join(dirs.uploads, name));
      return (await file.exists()) ? new Uint8Array(await file.arrayBuffer()) : null;
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

export async function addMessage(session: string, text: string, intake?: Intake, context?: string): Promise<Message> {
  const msg: Message = { id: newId(), ts: new Date().toISOString(), text, ...(intake ? { intake } : {}), ...(context ? { context } : {}) };
  await store.put(session, "inbox", msg);
  return msg;
}

export async function addReply(session: string, id: string, text: string, by: string, extra: { cv?: unknown; tips?: unknown } = {}) {
  await store.put(session, "outbox", { id, ts: new Date().toISOString(), text, by, ...extra });
}

export const getUpload = (session: string, path: string) => store.getFile(session, path);

// Save an uploaded file under a fresh name; returns its path relative to the messages dir.
export async function saveUpload(session: string, ext: string, bytes: Uint8Array): Promise<string> {
  return store.putFile(session, `${newId()}.${ext}`, bytes);
}

export const resetStore = (session: string) => store.reset(session);

export async function thread(session: string): Promise<ThreadItem[]> {
  const { inbox, outbox } = await store.list(session);
  const replies = new Map(outbox.map((r) => [r.id, r]));
  return inbox
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((m) => ({ ...m, reply: replies.get(m.id) ?? null }));
}
