import type { Meta, StoryObj } from "@storybook/react-vite";
import { CvLedger } from "./CvLedger";
import { SAMPLE_CV } from "./data";
import { onDesk } from "./story";
import { themeArgTypes } from "./theme";

const meta = {
  title: "CV Styles/1 Ledger",
  component: CvLedger,
  args: { cv: SAMPLE_CV },
  argTypes: themeArgTypes,
  decorators: [onDesk],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CvLedger>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
