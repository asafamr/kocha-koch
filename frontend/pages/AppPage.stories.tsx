import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppPage } from "./AppPage";

const meta = {
  title: "Pages/App",
  component: AppPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AppPage>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Intake: Story = { args: { initialStage: 0 } };
export const CvAndChat: Story = { args: { initialStage: 1 } };
export const Design: Story = { args: { initialStage: 2 } };
export const Export: Story = { args: { initialStage: 3 } };
