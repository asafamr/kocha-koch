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
const LITERATA = `"Literata", Georgia, serif`;

export const PALETTES = {
  Ink: { ink: "#111111", muted: "#4A4A4A", accent: "#111111", tint: "#ECECEA", rule: "#111111" },
  Slate: { ink: "#1D1D1B", muted: "#555555", accent: "#3A4F66", tint: "#EEF0F2", rule: "#C9CED4" },
  // Vivid ultramarine on cool paper (Linear/Stripe-docs style single strong color).
  Cobalt: { ink: "#0F1226", muted: "#565A6E", accent: "#2338C8", tint: "#EDEFFB", rule: "#C9CEEA" },
  // Signal red-orange on warm blush-grey (Swiss poster / Monocle print accent).
  Vermilion: { ink: "#1A1210", muted: "#66605C", accent: "#C2280F", tint: "#F7EFEC", rule: "#E3D3CD" },
  // Deep berry on pale rose-grey (editorial / fashion print).
  Mulberry: { ink: "#1E1219", muted: "#6A5D66", accent: "#7C1D55", tint: "#F6EEF3", rule: "#DDCBD6" },
  // Dark amber on pale butter paper (printed specimen sheet).
  Ochre: { ink: "#1C1810", muted: "#666052", accent: "#85570A", tint: "#FAF3E1", rule: "#E6D9B8" },
  // Electric ink-violet on lavender, between Cobalt and Mulberry.
  Iris: { ink: "#14112A", muted: "#5E5A75", accent: "#5B2FB0", tint: "#F0ECFA", rule: "#D3CBEA" },
  // Dark chartreuse on pale lime (editorial acid green, toned down to print).
  Lichen: { ink: "#11140E", muted: "#5B6052", accent: "#4C6A00", tint: "#F1F5DC", rule: "#D5DDB0" },
  // Chocolate on warm off-white (heritage publishing); darkest accent, safest in grayscale.
  Umber: { ink: "#1F1612", muted: "#6B5F58", accent: "#5C3826", tint: "#F4EDE7", rule: "#DCCFC5" },
  // Saturated cyan-leaning blue on ice paper; more vivid than Slate.
  Petrol: { ink: "#0D1719", muted: "#54646A", accent: "#0B6383", tint: "#E9F3F6", rule: "#C5DCE3" },
} satisfies Record<string, Palette>;

export const TYPOGRAPHY = {
  // Bricolage Grotesque name (quirky ink-trap details), quiet Hanken Grotesk body and headings.
  Bricolage: { body: HANKEN, display: BRICOLAGE, displayWeight: 700, heading: HANKEN, headingCase: "none", headingVariant: "normal", headingTracking: "0" },
  // Sober Literata book-serif name, Hanken body, small tracked uppercase headings.
  Literata: { body: HANKEN, display: LITERATA, displayWeight: 600, heading: HANKEN, headingCase: "uppercase", headingVariant: "normal", headingTracking: "0.06em" },
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
