import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { FileInput } from "./FileInput";

const meta = {
  title: "Components/FileInput",
  component: FileInput,
  args: { label: "קורות חיים נוכחיים (PDF)", accept: "application/pdf", file: null, onChange: fn() },
} satisfies Meta<typeof FileInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const Chosen: Story = {
  args: { file: new File(["%PDF-1.4"], "cv-2026.pdf", { type: "application/pdf" }) },
};
