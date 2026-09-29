import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";

const meta = {
  title: "Components/Text",
  component: Text,
  args: { children: "דג סקרן שט בים מאוכזב" },
} satisfies Meta<typeof Text>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = { args: { variant: "display" } };
export const Heading: Story = { args: { variant: "heading" } };
export const Lead: Story = { args: { variant: "lead" } };
export const Body: Story = { args: { variant: "body" } };
export const Caption: Story = { args: { variant: "caption" } };
export const Mono: Story = { args: { variant: "mono", children: "BACKEND=files" } };
