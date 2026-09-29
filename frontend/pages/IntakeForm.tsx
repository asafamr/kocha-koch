import { useState, type FormEvent } from "react";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { FileInput } from "../components/FileInput";
import { Message } from "../components/Message";
import { TextArea } from "../components/TextArea";
import { TextField } from "../components/TextField";
import { CONSENT_LABEL } from "../modals/ConsentModal";

export type Intake = { cv: File; role: string; jobDescription: string; consent: boolean };

// Stage 1: kocha's opening words, then current CV, target role, optional job description, consent.
// Next is enabled once a CV file and a target role are present.
export function IntakeForm({ onNext }: { onNext: (intake: Intake) => void }) {
  const [cv, setCv] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [consent, setConsent] = useState(false);
  const ready = cv !== null && role.trim() !== "";

  function submit(e: FormEvent) {
    e.preventDefault();
    if (cv && ready) onNext({ cv, role: role.trim(), jobDescription, consent });
  }

  return (
    <form className="intake" onSubmit={submit}>
      <Message from="kocha">היי, אני קוחה! אני כאן כדי לעזור לכם לבנות קורות חיים שמתאימים בדיוק לתפקיד שאתם מחפשים.</Message>
      <Message from="kocha">
        כדי להתחיל, העלו את קורות החיים הנוכחיים שלכם וכתבו לאיזה תפקיד אתם מכוונים. אם יש לכם את תיאור המשרה המלא,
        הדביקו אותו למטה. זה יעזור לי לדייק.
      </Message>

      <FileInput label="קורות חיים נוכחיים (PDF)" accept="application/pdf" file={cv} onChange={setCv} />
      <TextField
        label="תפקיד מבוקש"
        placeholder="למשל: מפתח פרונטאנד בכיר"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />
      <TextArea
        label="תיאור המשרה המלא (לא חובה)"
        placeholder="הדביקו כאן את תיאור המשרה"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <Checkbox label={CONSENT_LABEL} checked={consent} onChange={(e) => setConsent(e.target.checked)} />
      <Button type="submit" disabled={!ready} style={{ justifySelf: "center" }}>
        הבא
      </Button>
    </form>
  );
}
