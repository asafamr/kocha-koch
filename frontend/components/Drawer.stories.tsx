import type { Meta, StoryObj } from "@storybook/react-vite";
import { Drawer } from "./Drawer";
import { Paragraph } from "./Paragraph";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  args: {
    title: "טיפים לשיפור",
    count: 3,
    children: (
      <>
        {Array.from({ length: 8 }, (_, i) => (
          <Paragraph key={i}>תוכן המגירה, שורה {i + 1}.</Paragraph>
        ))}
      </>
    ),
  },
  // The drawer floats at the bottom of a positioned container.
  decorators: [
    (Story) => (
      <div style={{ position: "relative", blockSize: 360, maxInlineSize: 560, background: "var(--paper)", padding: 16 }}>
        <Paragraph muted>תוכן העמוד שמתחת למגירה.</Paragraph>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};
export const Open: Story = { args: { defaultOpen: true } };
export const TopOpen: Story = { args: { defaultOpen: true, placement: "top" } };
