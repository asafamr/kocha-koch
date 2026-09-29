import type { StorybookConfig } from "@storybook/react-vite";

export default {
  framework: "@storybook/react-vite",
  stories: ["../frontend/**/*.stories.tsx"],
  core: { disableTelemetry: true },
} satisfies StorybookConfig;
