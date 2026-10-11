import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Segmented } from "./Segmented";

const OPTIONS = [
  { value: "cv", label: "קורות חיים" },
  { value: "chat", label: "צ'אט" },
] as const;

const meta = {
  title: "Components/Segmented",
  component: Segmented,
  args: { label: "תצוגה", value: "cv", options: OPTIONS, onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <Segmented {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof Segmented>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const UnreadDot: Story = {
  args: { options: [OPTIONS[0], { ...OPTIONS[1], dot: true }], dotLabel: "הודעה חדשה" },
};
