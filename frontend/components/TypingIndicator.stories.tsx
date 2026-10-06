import type { Meta, StoryObj } from "@storybook/react-vite";
import { TypingIndicator } from "./TypingIndicator";

const meta = { title: "Components/TypingIndicator", component: TypingIndicator } satisfies Meta<
  typeof TypingIndicator
>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
// A long answer: elapsed time, thinking so far, and the model's latest thought heading.
export const WithProgress: StoryObj<typeof meta> = {
  args: { detail: "חושבת · 24 שנ׳ · 3,100 טוקנים", note: "Matching the CV to the job's required skills" },
};
