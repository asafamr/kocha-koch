import type { Meta, StoryObj } from "@storybook/react-vite";
import { CvClassic } from "./CvClassic";
import { SAMPLE_CV } from "./data";
import { onDesk } from "./story";

const meta = {
  title: "CV Styles/1 Classic",
  component: CvClassic,
  args: { cv: SAMPLE_CV },
  decorators: [onDesk],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CvClassic>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
