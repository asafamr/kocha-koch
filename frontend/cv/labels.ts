import type { TemplateName } from "./templates";
import type { PaletteName, TypographyName } from "./theme";

// Hebrew display names for the design-stage pickers. Code keys stay English.
export const TEMPLATE_LABELS: Record<TemplateName, string> = {
  Ledger: "עמודת תוויות",
  Sidebar: "סרגל צד",
  Bars: "פסי כותרת",
  Compact: "דחוס",
  Lede: "פתיח בולט",
  Margin: "טור צד",
};

// Common Hebrew color names, so the picker reads like everyday speech.
export const PALETTE_LABELS: Record<PaletteName, string> = {
  Ink: "שחור",
  Slate: "כחול אפור",
  Cobalt: "כחול",
  Vermilion: "אדום",
  Mulberry: "בורדו",
  Ochre: "חרדל",
  Iris: "סגול",
  Lichen: "ירוק זית",
  Umber: "חום",
  Petrol: "כחול פטרול",
};

export const TYPOGRAPHY_LABELS: Record<TypographyName, string> = {
  Bricolage: "עם אופי",
  Literata: "ספרותי",
  Newsreader: "עיתונאי",
  Schibsted: "חדשותי",
  Editorial: "מגזיני",
};
