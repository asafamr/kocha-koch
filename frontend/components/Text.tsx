import type { ReactNode } from "react";

export type TextVariant = "display" | "heading" | "lead" | "body" | "caption" | "mono";

const TAGS = { display: "h1", heading: "h2", lead: "p", body: "span", caption: "span", mono: "code" } as const;

export function Text({ variant = "body", children }: { variant?: TextVariant; children: ReactNode }) {
  const Tag = TAGS[variant];
  // Mono is code: always left to right, isolated so it keeps its order inside Hebrew text.
  return (
    <Tag className={`ds-text ds-text-${variant}`} dir={variant === "mono" ? "ltr" : undefined}>
      {children}
    </Tag>
  );
}
