import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Api, ThreadItem } from "./api";
import { App } from "./App";
import { answered } from "./components/fixtures";

// In-memory API: replies 1 s after each message, like a fast backend.
function fakeApi(initial: ThreadItem[] = []): Api {
  const messages = [...initial];
  return {
    async load() {
      return { backend: "fake", messages: [...messages] };
    },
    async send(text) {
      const id = String(Date.now());
      const item: ThreadItem = { id, ts: new Date().toISOString(), text, reply: null };
      messages.push(item);
      setTimeout(() => {
        item.reply = { id, ts: new Date().toISOString(), text: `echo: ${text}`, by: "fake" };
      }, 1000);
    },
  };
}

const failingApi: Api = {
  load: () => Promise.reject(new Error("load failed: 502")),
  send: () => Promise.reject(new Error("send failed: 502")),
};

const meta = { component: App, args: { pollMs: 500 } } satisfies Meta<typeof App>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Live: Story = { args: { api: fakeApi(answered) } };
export const ServerDown: Story = { args: { api: failingApi } };
