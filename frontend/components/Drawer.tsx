import { useId, useState, type ReactNode } from "react";

// A drawer that floats along the bottom of its container (which must be position: relative).
// Closed: a slim handle with the title and an optional count. Open: slides up over the content
// and scrolls on its own.
export function Drawer({
  title,
  count,
  defaultOpen = false,
  children,
}: {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={`ds-drawer${open ? " is-open" : ""}`}>
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
