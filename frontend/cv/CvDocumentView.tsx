import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { renderCvDocument, type CvDocument } from "./document";

const PAGE_MM = 297;

// Renders a CvDocument (data + theme + patch) as the final patched page.
// `onWarnings` receives patch ops that matched nothing, e.g. to send back to the AI.
// `onOverflow` receives how many mm of content fall below the A4 page (0 when it fits); the
// page cuts that content, so CVs must stay on one page. Measured again once fonts load.
export function CvDocumentView({
  doc,
  onWarnings,
  onOverflow,
}: {
  doc: CvDocument;
  onWarnings?: (w: string[]) => void;
  onOverflow?: (mm: number) => void;
}) {
  const { html, warnings } = useMemo(() => renderCvDocument(doc), [doc]);
  useEffect(() => onWarnings?.(warnings), [warnings, onWarnings]);

  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!onOverflow) return;
    let live = true;
    // Overflow = how far the lowest content reaches past the page's bottom margin (padding), which
    // also keeps text clear of the printer's unprintable edge. The page takes its natural height
    // for a moment, so content in stretched or squeezed boxes is measured where it really ends.
    const measure = () => {
      const page = root.current?.querySelector("article");
      if (!live || !page) return;
      const fixed = page.offsetHeight; // untransformed px
      if (fixed === 0) return;
      const scale = page.getBoundingClientRect().height / fixed; // canvas zoom
      const limit = fixed - parseFloat(getComputedStyle(page).paddingBlockEnd);
      page.style.blockSize = "auto";
      const top = page.getBoundingClientRect().top;
      const lowest = Math.max(top, ...[...page.querySelectorAll("*")].map((e) => e.getBoundingClientRect().bottom));
      page.style.blockSize = "";
      const overPx = (lowest - top) / scale - limit;
      onOverflow(Math.max(0, Math.round((overPx / fixed) * PAGE_MM)));
    };
    measure();
    document.fonts?.ready.then(measure);
    return () => {
      live = false;
    };
  }, [html, onOverflow]);

  return <div ref={root} className="cv-doc" dangerouslySetInnerHTML={{ __html: html }} />;
}
