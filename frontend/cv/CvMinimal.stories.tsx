import type { Meta, StoryObj } from "@storybook/react-vite";
import { CvMinimal } from "./CvMinimal";
import { SAMPLE_CV } from "./data";
import { onDesk } from "./story";

const meta = {
  title: "CV Styles/3 Minimal",
  component: CvMinimal,
  args: { cv: SAMPLE_CV },
  decorators: [onDesk],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CvMinimal>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
