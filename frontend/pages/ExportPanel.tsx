import type { ReactNode } from "react";
import { Block } from "../components/Block";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { Message } from "../components/Message";
import { consentLabel } from "./IntakeForm";

export type PdfState = { status: "idle" | "working" | "done" | "error"; text?: string };

// Last stage, laid out like the intake form: kocha thanks the user, the PDF button with the HTML
// export as a link under it and the PDF's status, a card with the call to action (practise with
// kocha on camera at kocha.co.il), then the questions to prepare for (`prep`). The PDF is rendered by
// the server (src/pdf.ts) the same way for every browser, then downloaded.
export function ExportPanel({
  pdf,
  onExportPdf,
  onExportHtml,
  practiceUrl,
  onPractice,
  onPracticeClick,
  consent,
  prep,
}: {
  prep?: ReactNode;
  pdf: PdfState;
  onExportPdf: () => void;
  onExportHtml: () => void;
  practiceUrl: string; // kocha.co.il, where she runs a practice interview on camera
  onPractice?: () => void; // hands the CVs over first (src/kocha.ts); the link is the fallback
  onPracticeClick?: () => void; // every click, whether or not the CVs are handed over
  consent?: { checked: boolean; onChange: (checked: boolean) => void }; // asked of users who did not agree at intake; practice waits for it
}) {
  return (
    <div className="intake export-panel">
      <Message from="kocha">
        תודה שבניתם איתי את קורות החיים! הם מוכנים. אפשר לייצא אותם עכשיו ולהתחיל לשלוח. בהצלחה!
      </Message>
      <div className="export-actions">
        <Button variant="dark" onClick={onExportPdf} disabled={pdf.status === "working"}>
          {pdf.status === "working" ? "מכין PDF…" : "ייצוא PDF"}
        </Button>
        <Button variant="link" onClick={onExportHtml}>ייצוא HTML</Button>
      </div>
      <p className={`export-status${pdf.status === "error" ? " is-error" : ""}`} role="status">
        {pdf.text}
      </p>
      <Block className="export-practice-card">
        <Message from="kocha">לפני שאתם מגיעים לראיון בואו לתרגל איתי אחד מול המצלמה!</Message>
        {consent && (
          <Checkbox label={consentLabel("cv_processing")} checked={consent.checked} onChange={(e) => consent.onChange(e.target.checked)} />
        )}
        {consent && !consent.checked ? (
          <Button className="export-practice" disabled>
            קבע ראיון עם קוחה
          </Button>
        ) : (
          <a
            className="ds-button export-practice"
            href={practiceUrl}
            target="_blank"
            rel="noopener"
            onClick={(e) => {
              onPracticeClick?.();
              if (!onPractice) return;
              e.preventDefault();
              onPractice();
            }}
          >
            קבע ראיון עם קוחה
          </a>
        )}
      </Block>
      {prep && (
        <>
          <h2 className="ds-sr-only">הכנה לשיחת הגיוס</h2>
          {prep}
        </>
      )}
    </div>
  );
}
