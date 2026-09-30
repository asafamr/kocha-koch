import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Select } from "./Select";

const OPTIONS = ["Ledger", "Sidebar", "Bars", "Compact", "Lede", "Margin"] as const;

function Demo({ compact }: { compact?: boolean }) {
  const [value, setValue] = useState<(typeof OPTIONS)[number]>("Ledger");
  return <Select label="תבנית" value={value} options={OPTIONS} onChange={setValue} compact={compact} />;
}

const meta = { title: "Components/Select", component: Demo } satisfies Meta<typeof Demo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Compact: Story = { args: { compact: true } };
