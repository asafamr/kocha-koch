import { mkdir, readdir, rename } from "node:fs/promises";
import { join } from "node:path";

// Two stores with the same shape:
//   STORE=files (default): the file protocol in AGENTS.md, needed when an external agent answers.
//     .messages/inbox/<id>.json   written by the server for each user message
//     .messages/outbox/<id>.json  the reply, with the same id
//   STORE=memory: kept in process, nothing touches disk, lost on restart.
// A message is pending while it has no reply with the same id.

export type Message = { id: string; ts: string; text: string };
export type Reply = Message & { by: string };
export type ThreadItem = Message & { reply: Reply | null };

type Store = {
  put(box: "inbox" | "outbox", item: Message | Reply): Promise<void>;
  list(): Promise<{ inbox: Message[]; outbox: Reply[] }>;
};

function memoryStore(): Store {
  const boxes = { inbox: [] as Message[], outbox: [] as Reply[] };
  return {
    async put(box, item) {
      (boxes[box] as Message[]).push(item);
    },
    async list() {
      return { inbox: [...boxes.inbox], outbox: [...boxes.outbox] };
    },
  };
}

async function fileStore(root: string): Promise<Store> {
  const dirs = { inbox: join(root, "inbox"), outbox: join(root, "outbox") };
  await mkdir(dirs.inbox, { recursive: true });
  await mkdir(dirs.outbox, { recursive: true });

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
  };
}

export const STORE = process.env.STORE ?? "files";
const store =
  STORE === "memory" ? memoryStore() : await fileStore(process.env.MESSAGES_DIR ?? ".messages");

export async function addMessage(text: string): Promise<Message> {
  const id = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  const msg = { id, ts: new Date().toISOString(), text };
  await store.put("inbox", msg);
  return msg;
}

export async function addReply(id: string, text: string, by: string) {
  await store.put("outbox", { id, ts: new Date().toISOString(), text, by });
}

export async function thread(): Promise<ThreadItem[]> {
  const { inbox, outbox } = await store.list();
  const replies = new Map(outbox.map((r) => [r.id, r]));
  return inbox
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((m) => ({ ...m, reply: replies.get(m.id) ?? null }));
}
