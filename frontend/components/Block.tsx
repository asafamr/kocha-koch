import type { HTMLAttributes } from "react";

// A bordered surface that groups content (kohi's `.card`). Pass `role` / `aria-*` when it is a region.
export function Block({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`ds-block ${className}`} {...props} />;
}
