import type { Meta, StoryObj } from "@storybook/react-vite";
import { MessageBubble } from "./MessageBubble";

const meta = { component: MessageBubble } satisfies Meta<typeof MessageBubble>;
export default meta;
type Story = StoryObj<typeof meta>;

export const User: Story = { args: { role: "user", text: "hello" } };
export const Reply: Story = { args: { role: "ai", text: "Hi. What do you need?", by: "claude-code" } };
export const Pending: Story = { args: { role: "ai", text: "waiting for reply…", pending: true } };
export const MultiLine: Story = { args: { role: "user", text: "line one\nline two\nline three" } };
