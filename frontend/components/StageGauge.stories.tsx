import type { Meta, StoryObj } from "@storybook/react-vite";
import { StageGauge } from "./StageGauge";

const meta = {
  title: "Components/StageGauge",
  component: StageGauge,
  args: {
    label: "שלבי העבודה",
    stages: ["מה, מו, מי", "כוונון", "עיצוב", "ייצוא"],
    current: 0,
  },
} satisfies Meta<typeof StageGauge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const GatherInfo: Story = { args: { current: 0 } };
export const FineTuning: Story = { args: { current: 1 } };
export const Design: Story = { args: { current: 2 } };
export const Export: Story = { args: { current: 3 } };
// Stages other than the current one are buttons; here the first stage is not selectable.
export const Clickable: Story = { args: { current: 2, onSelect: () => {}, canSelect: (i: number) => i > 0 } };
