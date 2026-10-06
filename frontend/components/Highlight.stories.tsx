import type { Meta, StoryObj } from "@storybook/react-vite";
import { Highlight } from "./Highlight";
import { Paragraph } from "./Paragraph";
import { Text } from "./Text";

const meta = {
  title: "Components/Highlight",
  component: Highlight,
  args: { children: "טקסט מודגש" },
} satisfies Meta<typeof Highlight>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const InParagraph: Story = {
  render: (args) => (
    <Paragraph>
      כל הודעה נכתבת לתיבת דואר נכנס, ו<Highlight {...args} /> מופיעה כשהתשובה מגיעה.
    </Paragraph>
  ),
  args: { children: "התשובה" },
};
export const InDisplay: Story = {
  render: (args) => (
    <Text variant="display">
      שפת <Highlight {...args} />
    </Text>
  ),
  args: { children: "עיצוב" },
};
