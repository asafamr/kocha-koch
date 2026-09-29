import type { Meta, StoryObj } from "@storybook/react-vite";
import { Message } from "./Message";

const meta = {
  title: "Components/Message",
  component: Message,
  decorators: [(Story) => <div style={{ display: "grid", maxInlineSize: 420 }}><Story /></div>],
} satisfies Meta<typeof Message>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Kocha: Story = { args: { from: "kocha", children: "היי! אני קוחה. ספרו לי קצת על עצמכם." } };
export const User: Story = { args: { from: "user", children: "אני מפתח תוכנה, חמש שנים בפרונטאנד." } };
export const LongKocha: Story = {
  args: {
    from: "kocha",
    children:
      "מעולה. בואו נתחיל מהניסיון האחרון שלכם: איפה עבדתם, מה היה התפקיד, ומה ההישג שאתם הכי גאים בו מהתקופה הזו?",
  },
};
