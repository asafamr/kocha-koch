import type { Meta, StoryObj } from "@storybook/react-vite";
import { CvBars } from "./CvBars";
import { SAMPLE_CV, SAMPLE_CV_JUNIOR } from "./data";
import { onDesk } from "./story";
import { themeArgTypes } from "./theme";

const meta = {
  title: "CV Styles/3 Bars",
  component: CvBars,
  args: { cv: SAMPLE_CV },
  argTypes: themeArgTypes,
  decorators: [onDesk],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CvBars>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
// Only some sections: no summary, no military service, a Projects section.
export const Junior: StoryObj<typeof meta> = { args: { cv: SAMPLE_CV_JUNIOR } };
