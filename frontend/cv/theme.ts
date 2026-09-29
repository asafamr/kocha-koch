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
  // Vivid ultramarine on cool paper (Linear/Stripe-docs style single strong color).
  Cobalt: { ink: "#0F1226", muted: "#565A6E", accent: "#2338C8", tint: "#EDEFFB", rule: "#C9CEEA" },
  // Signal red-orange on warm blush-grey (Swiss poster / Monocle print accent).
  Vermilion: { ink: "#1A1210", muted: "#66605C", accent: "#C2280F", tint: "#F7EFEC", rule: "#E3D3CD" },
  // Deep berry on pale rose-grey (editorial / fashion print).
  Mulberry: { ink: "#1E1219", muted: "#6A5D66", accent: "#7C1D55", tint: "#F6EEF3", rule: "#DDCBD6" },
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
