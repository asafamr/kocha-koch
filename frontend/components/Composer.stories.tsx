import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Composer } from "./Composer";

const meta = { component: Composer, args: { onSend: fn() } } satisfies Meta<typeof Composer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
