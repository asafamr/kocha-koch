import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { ChatInput } from "./ChatInput";

const meta = {
  title: "Components/ChatInput",
  component: ChatInput,
  args: { onSend: fn() },
  decorators: [(Story) => <div style={{ maxInlineSize: 420 }}><Story /></div>],
} satisfies Meta<typeof ChatInput>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
