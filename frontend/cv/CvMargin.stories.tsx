import type { Meta, StoryObj } from "@storybook/react-vite";
import { CvMargin } from "./CvMargin";
import { SAMPLE_CV, SAMPLE_CV_JUNIOR } from "./data";
import { onDesk } from "./story";
import { themeArgTypes } from "./theme";

const meta = {
  title: "CV Styles/6 Margin",
  component: CvMargin,
  args: { cv: SAMPLE_CV },
  argTypes: themeArgTypes,
  decorators: [onDesk],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CvMargin>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
// Only some sections: no summary, no military service, a Projects section.
export const Junior: StoryObj<typeof meta> = { args: { cv: SAMPLE_CV_JUNIOR } };
