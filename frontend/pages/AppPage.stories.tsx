import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppPage } from "./AppPage";

const meta = {
  title: "Pages/App",
  component: AppPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AppPage>;
export default meta;

export const Default: StoryObj<typeof meta> = { args: { stage: 0 } };
