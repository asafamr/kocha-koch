import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress";

const meta = {
  title: "Components/Progress",
  component: Progress,
  args: { labelledBy: "progress-label" },
  decorators: [
    (Story) => (
      <div style={{ display: "grid", gap: "0.75rem", maxInlineSize: 420 }}>
        <p id="progress-label" style={{ margin: 0 }}>קוחה קוראת את קורות החיים ותחזור עם גרסה ראשונה…</p>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Quick: Story = { args: { seconds: 5 } };
