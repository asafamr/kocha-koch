import type { Meta, StoryObj } from "@storybook/react-vite";
import { CvLedger } from "../cv/CvLedger";
import { SAMPLE_CV } from "../cv/data";
import { CvCanvas } from "./CvCanvas";

const meta = {
  title: "Components/CvCanvas",
  component: CvCanvas,
  args: { label: "תצוגת קורות חיים", children: <CvLedger cv={SAMPLE_CV} /> },
  decorators: [(Story) => <div style={{ blockSize: 560 }}><Story /></div>],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CvCanvas>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
