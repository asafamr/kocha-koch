import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";

const MIN = 0.2;
const MAX = 3;
const STEP = 1.2;
const clamp = (z: number) => Math.min(MAX, Math.max(MIN, z));

// A page (e.g. a CV) on a gray canvas with zoom and pan, like a design tool.
// Drag or wheel to pan, Ctrl/Cmd + wheel to zoom at the cursor, tray buttons to zoom/fit.
// Keyboard (canvas focused): arrows pan, + / - zoom, 0 fits.
export function CvCanvas({ label, children }: { label: string; children: ReactNode }) {
  const viewport = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const [view, setView] = useState({ zoom: 1, x: 0, y: 0 });
  const viewRef = useRef(view);
  viewRef.current = view;
  const { zoom } = view;
  const setPan = (f: (p: { x: number; y: number }) => { x: number; y: number }) =>
    setView((v) => ({ ...v, ...f(v) }));

  // Scale the page to fit the viewport with a margin, centered.
  const fit = useCallback(() => {
    const v = viewport.current, p = page.current;
    if (!v || !p) return;
    const z = clamp(Math.min(v.clientWidth / p.offsetWidth, v.clientHeight / p.offsetHeight) * 0.9);
    setView({ zoom: z, x: (v.clientWidth - p.offsetWidth * z) / 2, y: (v.clientHeight - p.offsetHeight * z) / 2 });
  }, []);

  useLayoutEffect(fit, [fit]);
  useEffect(() => {
    const v = viewport.current;
    if (!v) return;
    const ro = new ResizeObserver(fit);
    ro.observe(v);
    return () => ro.disconnect();
  }, [fit]);

  // Zoom keeping the point (cx, cy) in viewport coordinates fixed; defaults to the center.
  const zoomTo = useCallback((next: number, cx?: number, cy?: number) => {
    const v = viewport.current;
    if (!v) return;
    const x = cx ?? v.clientWidth / 2, y = cy ?? v.clientHeight / 2;
    const cur = viewRef.current;
    const nz = clamp(next);
    setView({ zoom: nz, x: x - ((x - cur.x) * nz) / cur.zoom, y: y - ((y - cur.y) * nz) / cur.zoom });
  }, []);

  // Native wheel listener: React's onWheel is passive and cannot preventDefault.
  useEffect(() => {
    const v = viewport.current;
    if (!v) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const r = v.getBoundingClientRect();
        zoomTo(viewRef.current.zoom * Math.exp(-e.deltaY * 0.002), e.clientX - r.left, e.clientY - r.top);
      } else {
        setPan((p) => ({ x: p.x - e.deltaX, y: p.y - e.deltaY }));
      }
    };
    v.addEventListener("wheel", onWheel, { passive: false });
    return () => v.removeEventListener("wheel", onWheel);
  }, [zoomTo]);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest(".ds-canvas-tray")) return;
    drag.current = { x: e.clientX - view.x, y: e.clientY - view.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (d) setPan(() => ({ x: e.clientX - d.x, y: e.clientY - d.y }));
  }
  function onPointerUp() {
    drag.current = null;
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, [number, number]> = { ArrowUp: [0, 40], ArrowDown: [0, -40], ArrowLeft: [40, 0], ArrowRight: [-40, 0] };
    if (moves[e.key]) {
      e.preventDefault();
      const [dx, dy] = moves[e.key];
      setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
    } else if (e.key === "+" || e.key === "=") zoomTo(zoom * STEP);
    else if (e.key === "-") zoomTo(zoom / STEP);
    else if (e.key === "0") fit();
  }

  return (
    <div className="ds-canvas">
      <div
        ref={viewport}
        className="ds-canvas-viewport"
        tabIndex={0}
        role="region"
        aria-label={label}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <div className="ds-canvas-stage" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${zoom})` }}>
          <div ref={page} className="ds-canvas-page">
            {children}
          </div>
        </div>
      </div>
      <div className="ds-canvas-tray" role="toolbar" aria-label="זום">
        <button type="button" onClick={() => zoomTo(zoom / STEP)} aria-label="הקטנה">−</button>
        <output aria-live="polite">{Math.round(zoom * 100)}%</output>
        <button type="button" onClick={() => zoomTo(zoom * STEP)} aria-label="הגדלה">+</button>
        <button type="button" onClick={fit}>התאמה</button>
        <button type="button" onClick={() => zoomTo(1)}>100%</button>
      </div>
    </div>
  );
}
