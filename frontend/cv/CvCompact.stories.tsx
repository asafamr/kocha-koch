import type { Meta, StoryObj } from "@storybook/react-vite";
import { CvCompact } from "./CvCompact";
import { SAMPLE_CV } from "./data";
import { onDesk } from "./story";
import { themeArgTypes } from "./theme";

const meta = {
  title: "CV Styles/4 Compact",
  component: CvCompact,
  args: { cv: SAMPLE_CV },
  argTypes: themeArgTypes,
  decorators: [onDesk],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CvCompact>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
