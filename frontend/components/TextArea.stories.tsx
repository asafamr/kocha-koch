import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./TextArea";

const longText = Array.from(
  { length: 12 },
  (_, i) => `דרישה ${i + 1}: ניסיון בעבודה עם צוותים חוצי ארגון והובלת פרויקטים מקצה לקצה.`,
).join("\n");

const meta = {
  title: "Components/TextArea",
  component: TextArea,
  args: { label: "תיאור המשרה המלא (לא חובה)", placeholder: "הדביקו כאן את תיאור המשרה" },
} satisfies Meta<typeof TextArea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const Scrolling: Story = { args: { defaultValue: longText } };
