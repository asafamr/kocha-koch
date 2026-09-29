import type { Meta, StoryObj } from "@storybook/react-vite";
import { CvSidebar } from "./CvSidebar";
import { SAMPLE_CV } from "./data";
import { onDesk } from "./story";

const meta = {
  title: "CV Styles/2 Sidebar",
  component: CvSidebar,
  args: { cv: SAMPLE_CV },
  decorators: [onDesk],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CvSidebar>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
