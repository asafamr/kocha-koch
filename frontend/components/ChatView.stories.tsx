import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { ChatView } from "./ChatView";
import { answered, withPending } from "./fixtures";

const meta = { component: ChatView, args: { onSend: fn() } } satisfies Meta<typeof ChatView>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: { backend: "files", messages: [] } };
export const Conversation: Story = { args: { backend: "gemini", messages: withPending } };
export const LoadError: Story = {
  args: { backend: "files", messages: answered, error: "load failed: 502" },
};
