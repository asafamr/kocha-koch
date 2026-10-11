import type { SavedItem, ThreadItem } from "./api";

// The hosted app keeps a conversation in server memory only; this keeps a copy in the user's
// browser so it survives a restart (POST /api/restore). The thread goes in localStorage, the
// original CV PDF in IndexedDB (it can exceed localStorage's limit). Every call swallows storage
// errors: blocked storage just means no restore.

const threadKey = (key: string) => `${key}-thread`;
const DB = "kocha-koch";
const FILES = "files";

export function toSaved(m: ThreadItem): SavedItem {
  const { text, ts, hidden, intake, reply } = m;
  return {
    text,
    ts,
    ...(hidden ? { hidden } : {}),
    ...(intake ? { intake: { role: intake.role, jobDescription: intake.jobDescription, consents: intake.consents.map(({ purpose, version, grantedAt }) => ({ purpose, version, grantedAt })), utm: intake.utm } } : {}),
    ...(reply ? { reply: { text: reply.text, ts: reply.ts, cv: reply.cv, tips: reply.tips } } : {}),
  };
}

let lastJson = "";
export function saveThread(key: string, items: SavedItem[]) {
  const json = JSON.stringify(items);
  if (json === lastJson) return;
  try {
    localStorage.setItem(threadKey(key), json);
    lastJson = json;
  } catch {
    // storage blocked or full
  }
}

export function loadThread(key: string): SavedItem[] | null {
  try {
    const v = JSON.parse(localStorage.getItem(threadKey(key)) ?? "null");
    return Array.isArray(v) && v.length > 0 ? v : null;
  } catch {
    return null;
  }
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(FILES);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function withFiles<T>(mode: IDBTransactionMode, run: (s: IDBObjectStore) => IDBRequest<T>): Promise<T | null> {
  try {
    const db = await openDb();
    return await new Promise<T>((resolve, reject) => {
      const req = run(db.transaction(FILES, mode).objectStore(FILES));
      req.onsuccess = () => (db.close(), resolve(req.result));
      req.onerror = () => (db.close(), reject(req.error));
    });
  } catch {
    return null;
  }
}

export const savePdf = (key: string, pdf: Blob) => withFiles("readwrite", (s) => s.put(pdf, key));
export const loadPdf = async (key: string) => (await withFiles<Blob | undefined>("readonly", (s) => s.get(key))) ?? null;

export async function clearSaved(key: string) {
  lastJson = "";
  try {
    localStorage.removeItem(threadKey(key));
  } catch {
    // nothing saved to forget
  }
  await withFiles("readwrite", (s) => s.delete(key));
}
