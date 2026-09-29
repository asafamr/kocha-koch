import type { ReactNode } from "react";
import type { CvData } from "./data";
import { themeVars, type PaletteName, type TypographyName } from "./theme";
import "./cv.css";

// Props every CV style takes: the content plus an optional palette and typography.
export type CvProps = { cv: CvData; palette?: PaletteName; typography?: TypographyName };

// One A4 page (210x297 mm). Content past one page is cut: CVs are one page only.
export function Page({
  variant,
  palette,
  typography,
  children,
}: {
  variant: string;
  palette: PaletteName;
  typography: TypographyName;
  children: ReactNode;
}) {
  return (
    <article className={`cv cv-${variant}`} lang="en" dir="ltr" style={themeVars(palette, typography)}>
      {children}
    </article>
  );
}

// Phone, email and URLs: always LTR and isolated, so they stay intact if a CV is RTL.
export const Ltr = ({ children }: { children: ReactNode }) => <span dir="ltr">{children}</span>;

// Date ranges: bdi isolates them and picks direction from content (LTR or Hebrew text).
export const Dates = ({ children }: { children: ReactNode }) => <bdi className="cv-dates">{children}</bdi>;

export function contactItems(c: CvData["contact"]): ReactNode[] {
  return [c.city, <Ltr key="p">{c.phone}</Ltr>, <Ltr key="e">{c.email}</Ltr>, <Ltr key="l">{c.linkedin}</Ltr>];
}

// "a | b | c" on one line.
export function Joined({ items, sep = " | " }: { items: ReactNode[]; sep?: string }) {
  return (
    <>
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && sep}
          {item}
        </span>
      ))}
    </>
  );
}
