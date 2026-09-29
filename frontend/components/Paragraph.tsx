import type { ReactNode } from "react";

export function Paragraph({ muted, children }: { muted?: boolean; children: ReactNode }) {
  return <p className={`ds-p${muted ? " ds-p-muted" : ""}`}>{children}</p>;
}
