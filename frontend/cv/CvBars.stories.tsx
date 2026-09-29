import type { Meta, StoryObj } from "@storybook/react-vite";
import { CvBars } from "./CvBars";
import { SAMPLE_CV } from "./data";
import { onDesk } from "./story";

const meta = {
  title: "CV Styles/3 Bars",
  component: CvBars,
  args: { cv: SAMPLE_CV },
  decorators: [onDesk],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CvBars>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
