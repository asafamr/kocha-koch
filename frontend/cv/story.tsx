import type { Decorator } from "@storybook/react-vite";

// Shows a CV page on a gray desk, like a print preview.
export const onDesk: Decorator = (Story) => (
  <div style={{ background: "#d9d6cf", padding: "24px", minBlockSize: "100vh", boxSizing: "border-box" }}>
    <div style={{ inlineSize: "fit-content", marginInline: "auto", boxShadow: "0 2px 12px rgb(0 0 0 / 0.25)" }}>
      <Story />
    </div>
  </div>
);
