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

export const PALETTE_LABELS: Record<PaletteName, string> = {
  Ink: "דיו",
  Slate: "צפחה",
  Cobalt: "קובלט",
  Vermilion: "אדום כתום",
  Mulberry: "תות",
  Ochre: "חרדל",
  Iris: "אירוס",
  Lichen: "ליים",
  Umber: "אדמה",
  Petrol: "פטרול",
};

export const TYPOGRAPHY_LABELS: Record<TypographyName, string> = {
  Bricolage: "עם אופי",
  Literata: "ספרותי",
  Newsreader: "עיתונאי",
  Schibsted: "חדשותי",
  Editorial: "מגזיני",
};
