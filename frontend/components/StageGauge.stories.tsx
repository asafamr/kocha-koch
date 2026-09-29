import type { Meta, StoryObj } from "@storybook/react-vite";
import { StageGauge } from "./StageGauge";

const meta = {
  title: "Components/StageGauge",
  component: StageGauge,
  args: {
    label: "שלבי העבודה",
    stages: ["איסוף מידע", "כוונון עדין", "עיצוב", "ייצוא"],
    current: 0,
  },
} satisfies Meta<typeof StageGauge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const GatherInfo: Story = { args: { current: 0 } };
export const FineTuning: Story = { args: { current: 1 } };
export const Design: Story = { args: { current: 2 } };
export const Export: Story = { args: { current: 3 } };
