import type { ComponentType } from "react";
import { CvBars } from "./CvBars";
import { CvCompact } from "./CvCompact";
import { CvLedger } from "./CvLedger";
import { CvLede } from "./CvLede";
import { CvMargin } from "./CvMargin";
import { CvSidebar } from "./CvSidebar";
import type { CvProps } from "./parts";

// All CV templates by name, for pickers in the design stage.
export const TEMPLATES = {
  Ledger: CvLedger,
  Sidebar: CvSidebar,
  Bars: CvBars,
  Compact: CvCompact,
  Lede: CvLede,
  Margin: CvMargin,
} satisfies Record<string, ComponentType<CvProps>>;

export type TemplateName = keyof typeof TEMPLATES;
