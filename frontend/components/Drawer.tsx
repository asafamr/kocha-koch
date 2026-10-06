import { useId, useState, type ReactNode } from "react";

// A drawer that floats in its container (which must be position: relative): along the bottom
// (opens upward), or at the top right like the design-stage tray (opens downward).
// Closed: a slim handle with the title and an optional count. Open: overlays the content and
// scrolls on its own.
export function Drawer({
  title,
  count,
  defaultOpen = false,
  placement = "bottom",
  children,
}: {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  placement?: "bottom" | "top";
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={`ds-drawer ds-drawer-${placement}${open ? " is-open" : ""}`}>
      <button type="button" className="ds-drawer-handle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        <span>
          {title}
          {count !== undefined && <span className="ds-drawer-count">{count}</span>}
        </span>
        <span className="ds-drawer-chevron" aria-hidden="true" />
      </button>
      <div id={id} className="ds-drawer-body" hidden={!open}>
        {children}
      </div>
    </div>
  );
}
