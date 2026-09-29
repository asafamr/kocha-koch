import type { Meta, StoryObj } from "@storybook/react-vite";
import { CvLede } from "./CvLede";
import { SAMPLE_CV } from "./data";
import { onDesk } from "./story";
import { themeArgTypes } from "./theme";

const meta = {
  title: "CV Styles/5 Lede",
  component: CvLede,
  args: { cv: SAMPLE_CV },
  argTypes: themeArgTypes,
  decorators: [onDesk],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CvLede>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
