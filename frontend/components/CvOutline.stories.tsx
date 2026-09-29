import type { Meta, StoryObj } from "@storybook/react-vite";
import { CvOutline } from "./CvOutline";
import { SAMPLE_OUTLINE } from "./cvOutlineSample";

const meta = {
  title: "Components/CvOutline",
  component: CvOutline,
  args: { sections: SAMPLE_OUTLINE },
  decorators: [(Story) => <div style={{ maxInlineSize: 640 }}><Story /></div>],
} satisfies Meta<typeof CvOutline>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {};
export const OneSection: Story = { args: { sections: SAMPLE_OUTLINE.slice(0, 1) } };
export const Empty: Story = { args: { sections: [] } };
