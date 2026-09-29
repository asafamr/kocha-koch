import type { ThreadItem } from "../src/store";

export type { ThreadItem };
export type Snapshot = { backend: string; messages: ThreadItem[] };

// App talks to the server only through this, so stories can pass a fake.
export type Api = {
  load(): Promise<Snapshot>;
  send(text: string): Promise<void>;
};

export const httpApi: Api = {
  async load() {
    const res = await fetch("/api/messages");
    if (!res.ok) throw new Error(`load failed: ${res.status}`);
    return res.json();
  },
  async send(text) {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error(`send failed: ${res.status}`);
  },
};
