import { useState, type FormEvent } from "react";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { FileInput } from "../components/FileInput";
import { Message } from "../components/Message";
import { TextArea } from "../components/TextArea";
import { TextField } from "../components/TextField";
import { REPO_URL } from "../links";
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

export type Intake = { cv: File; role: string; jobDescription: string; consents: ConsentPurpose[] };

// Stage 1: kocha's instruction, then current CV, target role, optional job description (folded), consent.
// Next is enabled once a CV file and a target role are present; on phones it is pinned to the bottom.
// The consent box is shown only with `askConsent` (the server has the handoff to kocha on).
export function IntakeForm({
  onNext,
  sending = false,
  askConsent = false,
}: {
  onNext: (intake: Intake) => void;
  sending?: boolean;
  askConsent?: boolean;
}) {
  const [cv, setCv] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [agreed, setAgreed] = useState<Record<ConsentPurpose, boolean>>({ cv_processing: false, marketing_email: false }); // unchecked: consent is an active opt-in
  const ready = cv !== null && role.trim() !== "";

  function submit(e: FormEvent) {
    e.preventDefault();
    if (cv && ready) onNext({ cv, role: role.trim(), jobDescription, consents: askConsent ? purposes.filter((x) => agreed[x]) : [] });
  }

  return (
    <form className="intake" onSubmit={submit}>
      <Message from="kocha">כדי להתחיל, העלו את קורות החיים הנוכחיים שלכם וכתבו לאיזה תפקיד אתם מכוונים.</Message>

      <FileInput label="קורות חיים נוכחיים (PDF)" accept="application/pdf" file={cv} onChange={setCv} />
      <TextField
        label="תפקיד מבוקש"
        placeholder="למשל: מפתח פרונטאנד בכיר"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />
      <details className="intake-more">
        <summary>תיאור המשרה המלא (לא חובה)</summary>
        <TextArea
          label="תיאור המשרה המלא (לא חובה)"
          placeholder="הדביקו כאן את תיאור המשרה"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
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
