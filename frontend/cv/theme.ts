import type { CSSProperties } from "react";

// CV palettes and typography. Every CV style reads these as CSS variables (see cv.css),
// so any style can be combined with any palette and any typography.

export type Palette = { ink: string; muted: string; accent: string; tint: string; rule: string };
export type Typography = {
  body: string;
  display: string; // the name
  displayWeight: number;
  heading: string; // section headings
  headingCase: "uppercase" | "none";
  headingVariant: "normal" | "small-caps";
  headingTracking: string;
};

const INTER = `"Inter", Arial, sans-serif`;
const SERIF = `"Source Serif 4", Georgia, serif`;
const MONO = `"JetBrains Mono", ui-monospace, monospace`;

export const PALETTES = {
  Ink: { ink: "#111111", muted: "#4A4A4A", accent: "#111111", tint: "#ECECEA", rule: "#111111" },
  Slate: { ink: "#1D1D1B", muted: "#555555", accent: "#3A4F66", tint: "#EEF0F2", rule: "#C9CED4" },
  Navy: { ink: "#1A1A1A", muted: "#555555", accent: "#1F3A5F", tint: "#F1F4F8", rule: "#C8D1DC" },
  "Sand & Brick": { ink: "#1F1E1C", muted: "#5E574E", accent: "#9A3B2A", tint: "#E8E1D5", rule: "#D6CCBD" },
  Forest: { ink: "#1B1F1C", muted: "#56605A", accent: "#2F5D46", tint: "#E6EDE8", rule: "#C5D1C9" },
} satisfies Record<string, Palette>;

export const TYPOGRAPHY = {
  // Inter throughout, tracked uppercase headings. Neutral and very legible.
  Modern: { body: INTER, display: INTER, displayWeight: 700, heading: INTER, headingCase: "uppercase", headingVariant: "normal", headingTracking: "0.12em" },
  // Source Serif throughout, small-caps headings. Traditional, close to LaTeX CVs.
  Classic: { body: SERIF, display: SERIF, displayWeight: 700, heading: SERIF, headingCase: "none", headingVariant: "small-caps", headingTracking: "0.02em" },
  // Serif name, sans body and headings. Editorial header, plain body.
  Editorial: { body: INTER, display: SERIF, displayWeight: 600, heading: INTER, headingCase: "uppercase", headingVariant: "normal", headingTracking: "0.12em" },
  // Sans name and headings, serif body. Book-like reading text.
  Bookish: { body: SERIF, display: INTER, displayWeight: 800, heading: INTER, headingCase: "uppercase", headingVariant: "normal", headingTracking: "0.1em" },
  // Mono headings and name, sans body. For technical roles.
  Technical: { body: INTER, display: MONO, displayWeight: 400, heading: MONO, headingCase: "uppercase", headingVariant: "normal", headingTracking: "0.04em" },
} satisfies Record<string, Typography>;

export type PaletteName = keyof typeof PALETTES;
export type TypographyName = keyof typeof TYPOGRAPHY;

export function themeVars(palette: PaletteName, typography: TypographyName): CSSProperties {
  const p: Palette = PALETTES[palette];
  const t: Typography = TYPOGRAPHY[typography];
  return {
    "--cv-ink": p.ink,
    "--cv-muted": p.muted,
    "--cv-accent": p.accent,
    "--cv-tint": p.tint,
    "--cv-rule": p.rule,
    "--cv-font-body": t.body,
    "--cv-font-display": t.display,
    "--cv-display-weight": t.displayWeight,
    "--cv-font-heading": t.heading,
    "--cv-heading-case": t.headingCase,
    "--cv-heading-variant": t.headingVariant,
    "--cv-heading-tracking": t.headingTracking,
  } as CSSProperties;
}

// Shared story controls for palette and typography.
export const themeArgTypes = {
  palette: { control: "select", options: Object.keys(PALETTES) },
  typography: { control: "select", options: Object.keys(TYPOGRAPHY) },
} as const;
