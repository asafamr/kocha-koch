import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "שליחה", onClick: fn() },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Secondary: Story = { args: { variant: "secondary", children: "הזמן מקום לאימון מול מצלמה" } };
export const Link: Story = { args: { variant: "link", children: "ייצוא HTML" } };
export const Dark: Story = { args: { variant: "dark", children: "ייצוא PDF" } };
