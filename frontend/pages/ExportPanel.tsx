import { Button } from "../components/Button";
import { Message } from "../components/Message";

export type PdfState = { status: "idle" | "working" | "done" | "error"; text?: string };

// Last stage, laid out like the intake form: kocha thanks the user, export buttons (PDF, HTML)
// with the PDF's status under them, then the call to action for camera practice. The PDF is
// rendered by the server (src/pdf.ts) the same way for every browser, then downloaded.
export function ExportPanel({
  pdf,
  onExportPdf,
  onExportHtml,
  onBookPractice,
  onBack,
}: {
  pdf: PdfState;
  onExportPdf: () => void;
  onExportHtml: () => void;
  onBookPractice: () => void;
  onBack: () => void;
}) {
  return (
    <div className="intake export-panel">
      <Message from="kocha">
        תודה שבניתם איתי את קורות החיים! הם מוכנים. אפשר לייצא אותם עכשיו ולהתחיל לשלוח. בהצלחה!
      </Message>
      <div className="export-actions">
        <Button onClick={onExportPdf} disabled={pdf.status === "working"}>
          {pdf.status === "working" ? "מכין PDF…" : "ייצוא PDF"}
        </Button>
        <Button onClick={onExportHtml}>ייצוא HTML</Button>
      </div>
      <p className={`export-status${pdf.status === "error" ? " is-error" : ""}`} role="status">
        {pdf.text}
      </p>
      <Message from="kocha">רוצים להגיע מוכנים לראיון? אפשר להתאמן איתי מול מצלמה.</Message>
      <Button variant="secondary" onClick={onBookPractice} style={{ justifySelf: "center" }}>
        הזמן מקום לאימון מול מצלמה
      </Button>
      <Button variant="secondary" onClick={onBack} style={{ justifySelf: "center" }}>
        חזרה לעיצוב
      </Button>
    </div>
  );
}
