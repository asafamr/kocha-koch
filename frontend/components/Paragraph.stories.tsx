import type { Meta, StoryObj } from "@storybook/react-vite";
import { Paragraph } from "./Paragraph";

const text =
  "כל הודעה נכתבת לתיבת דואר נכנס. מודל בינה מלאכותית קורא אותה וכותב תשובה עם אותו מזהה. " +
  "העמוד בודק כל שתי שניות ומציג את התשובה כשהיא מגיעה.";

const meta = { title: "Components/Paragraph", component: Paragraph, args: { children: text } } satisfies Meta<
  typeof Paragraph
>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Muted: Story = { args: { muted: true } };
