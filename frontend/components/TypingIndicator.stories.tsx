import type { Meta, StoryObj } from "@storybook/react-vite";
import { TypingIndicator } from "./TypingIndicator";

const meta = { title: "Components/TypingIndicator", component: TypingIndicator } satisfies Meta<
  typeof TypingIndicator
>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
