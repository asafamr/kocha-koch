import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { renderCvDocument, type CvDocument } from "./document";
import { measureLayout, type Layout } from "./layoutReport";

// Renders a CvDocument (data + theme + patch) as the final patched page.
// `onWarnings` receives patch ops that matched nothing, e.g. to send back to the AI.
// `onLayout` receives the measured layout (layoutReport.ts); content below the A4 page is cut, so
// CVs must stay on one page. Measured again once fonts load.
export function CvDocumentView({
  doc,
  onWarnings,
  onLayout,
}: {
  doc: CvDocument;
  onWarnings?: (w: string[]) => void;
  onLayout?: (layout: Layout) => void;
}) {
  const { html, warnings } = useMemo(() => renderCvDocument(doc), [doc]);
  useEffect(() => onWarnings?.(warnings), [warnings, onWarnings]);

  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!onLayout) return;
    let live = true;
    // The page takes its natural height for a moment, so content in stretched or squeezed boxes is
    // measured where it really ends. The usable height stops at the bottom margin (padding), which
    // also keeps text clear of the printer's unprintable edge.
    const measure = () => {
      const page = root.current?.querySelector("article");
      if (!live || !page) return;
      const fixed = page.offsetHeight; // untransformed px, the A4 height
      if (fixed === 0) return;
      const scale = page.getBoundingClientRect().height / fixed; // canvas zoom
      page.style.blockSize = "auto";
      const layout = measureLayout(page, scale, fixed);
      page.style.blockSize = "";
      onLayout(layout);
    };
    measure();
    document.fonts?.ready.then(measure);
    return () => {
      live = false;
    };
  }, [html, onLayout]);

  return <div ref={root} className="cv-doc" dangerouslySetInnerHTML={{ __html: html }} />;
}
