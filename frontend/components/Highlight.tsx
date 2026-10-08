import type { ReactNode } from "react";

// Yellow marker stroke behind text, drawn state.
export function Highlight({ children }: { children: ReactNode }) {
  return <mark className="ds-mark">{children}</mark>;
}
