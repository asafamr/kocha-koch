import type { Meta, StoryObj } from "@storybook/react-vite";
import { CvBand } from "./CvBand";
import { SAMPLE_CV } from "./data";
import { onDesk } from "./story";

const meta = {
  title: "CV Styles/5 Band",
  component: CvBand,
  args: { cv: SAMPLE_CV },
  decorators: [onDesk],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CvBand>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
