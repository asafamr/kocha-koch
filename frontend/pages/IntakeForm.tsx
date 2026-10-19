import { useState, type FormEvent } from "react";
import type { IntakeErrorCode } from "../api";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { FileInput } from "../components/FileInput";
import { Message } from "../components/Message";
import { TextArea } from "../components/TextArea";
import { TextField } from "../components/TextField";
import { REPO_URL } from "../links";
import { cvProblem, MAX_PDF } from "../../src/cvFile";
import { CONSENT, PRIVACY_LINK_TEXT, PRIVACY_URL, type ConsentPurpose } from "../../src/consent";

const privacyLink = (
  <a href={PRIVACY_URL} target="_blank" rel="noopener">
    {PRIVACY_LINK_TEXT}
  </a>
);

// The recorded text stays plain; the displayed label links the policy words.
export function consentLabel(purpose: ConsentPurpose) {
  const [before, after] = CONSENT.texts[purpose].split(PRIVACY_LINK_TEXT);
  return after === undefined ? before : <>{before}{privacyLink}{after}</>;
}

const purposes = Object.keys(CONSENT.texts) as ConsentPurpose[];

const MESSAGES: Record<IntakeErrorCode, string> = {
  role_missing: "אנא כתבו לאיזה תפקיד אתם מכוונים.",
  role_too_long: "שם התפקיד ארוך מדי. אנא קצרו אותו.",
  job_description_too_long: "תיאור המשרה ארוך מדי. אנא קצרו אותו.",
  cv_missing: "אנא צרפו את קורות החיים העדכניים שלכם בקובץ PDF.",
  cv_empty: "נראה שהקובץ ריק. אנא בחרו שוב את קובץ קורות החיים.",
  cv_too_big: "הקובץ גדול מ-5MB. אנא העלו קובץ PDF קטן יותר.",
  too_large: "הקובץ גדול מ-5MB. אנא העלו קובץ PDF קטן יותר.",
  cv_word: "נראה שזה קובץ Word. אנא שמרו אותו כ-PDF והעלו שוב.",
  cv_image: "נראה שזו תמונה. אנא העלו את קורות החיים כקובץ PDF.",
  cv_not_pdf: "הקובץ אינו קובץ PDF. אנא העלו את קורות החיים בפורמט PDF.",
  cv_too_long: "קורות החיים ארוכים מכדי שנוכל לקרוא (המקסימום הוא כ-15 עמודים). אנא העלו גרסה קצרה יותר.",
  cv_unreadable: "לא הצלחנו לקרוא את קובץ ה-PDF הזה. אנא ייצאו (export) אותו מחדש ונסו שוב.",
  generic: "משהו השתבש אצלנו. אנא נסו שוב בעוד דקה.",
};
type Field = "cv" | "role" | "jobDescription";
const fieldOf = (code: IntakeErrorCode): Field =>
  code === "role_missing" || code === "role_too_long" ? "role" : code === "job_description_too_long" ? "jobDescription" : "cv";

// Only the first bytes are read, and only to tell a Word file or an image from a PDF; the server decides.
async function checkCv(cv: File): Promise<IntakeErrorCode | null> {
  if (cv.size > MAX_PDF) return "cv_too_big";
  return cvProblem(new Uint8Array(await cv.slice(0, 12).arrayBuffer()));
}

export type Intake = { cv: File; role: string; jobDescription: string; consents: ConsentPurpose[] };

// Stage 1: kocha's instruction, then current CV, target role, optional job description (folded), consent.
// Next is enabled once a CV file and a target role are present; on phones it is pinned to the bottom.
// The consent box is shown only with `askConsent` (the server has the handoff to kocha on).
export function IntakeForm({
  onNext,
  sending = false,
  askConsent = false,
}: {
  onNext: (intake: Intake) => Promise<IntakeErrorCode | undefined>; // the server's reason, if it refused
  sending?: boolean;
  askConsent?: boolean;
}) {
  const [cv, setCv] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [agreed, setAgreed] = useState<Record<ConsentPurpose, boolean>>({ cv_processing: false, marketing_email: false }); // unchecked: consent is an active opt-in
  const [problem, setProblem] = useState<IntakeErrorCode | null>(null);
  const errorFor = (field: Field) => (problem && fieldOf(problem) === field ? MESSAGES[problem] : undefined);
  const edited = (field: Field) => problem && fieldOf(problem) === field && setProblem(null);
  const ready = cv !== null && role.trim() !== "";

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!cv || !ready) return;
    const bad = await checkCv(cv);
    if (bad) return setProblem(bad);
    setProblem((await onNext({ cv, role: role.trim(), jobDescription, consents: askConsent ? purposes.filter((x) => agreed[x]) : [] })) ?? null);
  }

  return (
    <form className="intake" onSubmit={submit}>
      <Message from="kocha">כדי להתחיל, העלו את קורות החיים הנוכחיים שלכם וכתבו לאיזה תפקיד אתם מכוונים.</Message>

      <FileInput label="קורות חיים נוכחיים (PDF)" accept="application/pdf" file={cv}
        error={errorFor("cv")}
        onChange={(f) => {
          edited("cv");
          setCv(f);
        }}
      />
      <TextField
        label="תפקיד מבוקש"
        placeholder="למשל: מפתח פרונטאנד בכיר"
        value={role}
        error={errorFor("role")}
        onChange={(e) => {
          edited("role");
          setRole(e.target.value);
        }}
        required
      />
      <details className="intake-more" open={problem === "job_description_too_long" || undefined}>
        <summary>תיאור המשרה המלא (לא חובה)</summary>
        <TextArea
          label="תיאור המשרה המלא (לא חובה)"
          placeholder="הדביקו כאן את תיאור המשרה"
          value={jobDescription}
          error={errorFor("jobDescription")}
          onChange={(e) => {
            edited("jobDescription");
            setJobDescription(e.target.value);
          }}
        />
      </details>
      {askConsent &&
        purposes.map((purpose) => (
          <Checkbox
            key={purpose}
            label={consentLabel(purpose)}
            checked={agreed[purpose]}
            onChange={(e) => setAgreed({ ...agreed, [purpose]: e.target.checked })}
          />
        ))}
      <p className="intake-privacy">
        {askConsent && <>{privacyLink}. </>}
        רוצים פרטיות מלאה? אפשר להריץ את הכלי אצלכם, הוא{" "}
        <a href={REPO_URL} target="_blank" rel="noopener">
          קוד פתוח ב־GitHub
        </a>
        .
      </p>
      <div className="intake-bar">
        <Button type="submit" disabled={!ready || sending}>
          הבא
        </Button>
      </div>
    </form>
  );
}
