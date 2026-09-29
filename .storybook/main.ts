import type { StorybookConfig } from "@storybook/react-vite";

export default {
  framework: "@storybook/react-vite",
  stories: ["../frontend/**/*.stories.tsx"],
  addons: ["@storybook/addon-a11y"], // axe accessibility checks, "Accessibility" panel
  core: { disableTelemetry: true },
  // /work/.env is /dev/null in the container; Vite watching it restarts in a loop.
  // Stories need no env vars, so read them from here instead.
  viteFinal: (config) => ({ ...config, envDir: ".storybook" }),
} satisfies StorybookConfig;
