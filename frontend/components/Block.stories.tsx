import type { Meta, StoryObj } from "@storybook/react-vite";
import { Block } from "./Block";
import { Paragraph } from "./Paragraph";
import { Text } from "./Text";

const meta = { title: "Components/Block", component: Block } satisfies Meta<typeof Block>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Text variant="heading">כותרת בלוק</Text>
        <Paragraph>תוכן בתוך בלוק.</Paragraph>
      </>
    ),
  },
};
