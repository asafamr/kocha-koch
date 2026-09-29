import type { Meta, StoryObj } from "@storybook/react-vite";
import { Thread } from "./Thread";
import { answered, withPending } from "./fixtures";

const meta = { component: Thread } satisfies Meta<typeof Thread>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: { messages: [] } };
export const Answered: Story = { args: { messages: answered } };
export const Pending: Story = { args: { messages: withPending } };
