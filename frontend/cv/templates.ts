import type { ComponentType } from "react";
import { CvBars } from "./CvBars";
import { CvCompact } from "./CvCompact";
import { CvLedger } from "./CvLedger";
import { CvLede } from "./CvLede";
import { CvMargin } from "./CvMargin";
import { CvSidebar } from "./CvSidebar";
import type { CvProps } from "./parts";

// All CV templates by name, in picker order; the first is the app's default.
export const TEMPLATES = {
  Margin: CvMargin,
  Ledger: CvLedger,
  Sidebar: CvSidebar,
  Bars: CvBars,
  Compact: CvCompact,
  Lede: CvLede,
} satisfies Record<string, ComponentType<CvProps>>;

export type TemplateName = keyof typeof TEMPLATES;
