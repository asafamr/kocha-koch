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

// Fonts: all SIL OFL 1.1 from fontsource, declared in cv-fonts.css. Chosen for legibility for
// non-native readers (tall x-height, open apertures, clear I/l/1); the name may be more distinctive.
const HANKEN = `"Hanken Grotesk", system-ui, sans-serif`;
const SCHIBSTED = `"Schibsted Grotesk", system-ui, sans-serif`;
const BRICOLAGE = `"Bricolage Grotesque", system-ui, sans-serif`;
const NEWSREADER = `"Newsreader", Georgia, serif`;
const INSTRUMENT_SERIF = `"Instrument Serif", Georgia, serif`;

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
  // Bricolage Grotesque name (quirky ink-trap details), quiet Hanken Grotesk body and headings.
  Bricolage: { body: HANKEN, display: BRICOLAGE, displayWeight: 700, heading: HANKEN, headingCase: "none", headingVariant: "normal", headingTracking: "0" },
  // Elegant single-weight Instrument Serif name, Hanken body, small tracked uppercase headings.
  Instrument: { body: HANKEN, display: INSTRUMENT_SERIF, displayWeight: 400, heading: HANKEN, headingCase: "uppercase", headingVariant: "normal", headingTracking: "0.06em" },
  // Newsreader throughout: a contemporary, open text serif made for screen reading.
  Newsreader: { body: NEWSREADER, display: NEWSREADER, displayWeight: 500, heading: NEWSREADER, headingCase: "none", headingVariant: "normal", headingTracking: "0" },
  // Schibsted Grotesk throughout: news-house grotesque, large x-height, heavy name.
  Schibsted: { body: SCHIBSTED, display: SCHIBSTED, displayWeight: 800, heading: SCHIBSTED, headingCase: "none", headingVariant: "normal", headingTracking: "-0.01em" },
  // Newsreader name over a Schibsted body, small tracked uppercase headings.
  Editorial: { body: SCHIBSTED, display: NEWSREADER, displayWeight: 600, heading: SCHIBSTED, headingCase: "uppercase", headingVariant: "normal", headingTracking: "0.08em" },
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
