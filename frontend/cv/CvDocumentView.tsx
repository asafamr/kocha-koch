import { useEffect, useMemo } from "react";
import { renderCvDocument, type CvDocument } from "./document";

// Renders a CvDocument (data + theme + patch) as the final patched page.
// `onWarnings` receives patch ops that matched nothing, e.g. to send back to the AI.
export function CvDocumentView({ doc, onWarnings }: { doc: CvDocument; onWarnings?: (w: string[]) => void }) {
  const { html, warnings } = useMemo(() => renderCvDocument(doc), [doc]);
  useEffect(() => onWarnings?.(warnings), [warnings, onWarnings]);
  return <div className="cv-doc" dangerouslySetInnerHTML={{ __html: html }} />;
}
