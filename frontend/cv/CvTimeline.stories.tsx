import type { Meta, StoryObj } from "@storybook/react-vite";
import { CvTimeline } from "./CvTimeline";
import { SAMPLE_CV } from "./data";
import { onDesk } from "./story";

const meta = {
  title: "CV Styles/1 Timeline",
  component: CvTimeline,
  args: { cv: SAMPLE_CV },
  decorators: [onDesk],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CvTimeline>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
