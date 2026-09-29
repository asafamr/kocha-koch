import type { ReactNode } from "react";
import type { CvData } from "./data";
import "./cv.css";

// One A4 page (210x297 mm). Content past one page is cut: CVs are one page only.
export function Page({ variant, children }: { variant: string; children: ReactNode }) {
  return (
    <article className={`cv cv-${variant}`} lang="he" dir="rtl">
      {children}
    </article>
  );
}

// Phone, email and URLs: always LTR and isolated, or digits and dots scramble in RTL.
export const Ltr = ({ children }: { children: ReactNode }) => <span dir="ltr">{children}</span>;

// Date ranges: bdi picks direction from content, so "2018–2021" stays LTR and "2021 – היום" reads RTL.
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
