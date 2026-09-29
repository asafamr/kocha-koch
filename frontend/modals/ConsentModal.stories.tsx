import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { ConsentModal } from "./ConsentModal";

const meta = {
  title: "Modals/Consent",
  component: ConsentModal,
  args: { onContinue: fn() },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ConsentModal>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
