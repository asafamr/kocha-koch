import { Button } from "../components/Button";
import { Message } from "../components/Message";
import { CvDocumentView } from "../cv/CvDocumentView";
import type { CvDocument } from "../cv/document";

// Last stage, laid out like the intake form: kocha thanks the user, export buttons (PDF, HTML),
// then the call to action for camera practice. The CV itself is rendered print-only, so the
// browser's print dialog ("Save as PDF") exports exactly the page.
export function ExportPanel({
  doc,
  onExportPdf,
  onExportHtml,
  onBookPractice,
}: {
  doc: CvDocument;
  onExportPdf: () => void;
  onExportHtml: () => void;
  onBookPractice: () => void;
}) {
  return (
    <div className="intake export-panel">
      <Message from="kocha">
        תודה שבניתם איתי את קורות החיים! הם מוכנים. אפשר לייצא אותם עכשיו ולהתחיל לשלוח. בהצלחה!
      </Message>
      <div className="export-actions">
        <Button onClick={onExportPdf}>ייצוא PDF</Button>
        <Button onClick={onExportHtml}>ייצוא HTML</Button>
      </div>
      <Message from="kocha">רוצים להגיע מוכנים לראיון? אפשר להתאמן איתי מול מצלמה.</Message>
      <Button variant="secondary" onClick={onBookPractice} style={{ justifySelf: "center" }}>
        הזמן מקום לאימון מול מצלמה
      </Button>
      <div className="print-only" aria-hidden="true">
        <CvDocumentView doc={doc} />
      </div>
    </div>
  );
}
