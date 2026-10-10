import { useState, type FormEvent } from "react";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { FileInput } from "../components/FileInput";
import { Message } from "../components/Message";
import { TextArea } from "../components/TextArea";
import { TextField } from "../components/TextField";
import { kochaUrl, REPO_URL } from "../links";
import { CONSENT, type ConsentPurpose } from "../../src/consent";

const purposes = Object.keys(CONSENT.texts) as ConsentPurpose[];

export type Intake = { cv: File; role: string; jobDescription: string; consents: ConsentPurpose[] };

// Stage 1: kocha's opening words, then current CV, target role, optional job description, consent.
// Next is enabled once a CV file and a target role are present.
// The consent box is shown only with `askConsent` (the server has the handoff to kocha on).
// `backend` says who processes the CV, for the privacy note: "gemini" (the managed version) or
// "files" (a local run answered by the user's own AI tool).
export function IntakeForm({
  onNext,
  sending = false,
  backend,
  askConsent = false,
}: {
  onNext: (intake: Intake) => void;
  sending?: boolean;
  backend?: string;
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
      <Message from="kocha">
        היי, אני קוחה, מאמנת הראיונות של{" "}
        <a href={kochaUrl("intake")} target="_blank" rel="noopener">
          kocha.co.il
        </a>
        . כאן אני עוזרת לכם לבנות קורות חיים שמתאימים בדיוק לתפקיד שאתם מחפשים, ואחר כך אפשר גם לתרגל איתי ראיון טכני
        מול מצלמה.
      </Message>
      <Message from="kocha">
        כדי להתחיל, העלו את קורות החיים הנוכחיים שלכם וכתבו לאיזה תפקיד אתם מכוונים. אם יש לכם את תיאור המשרה המלא,
        הדביקו אותו למטה. זה יעזור להתאים את קורות החיים בדיוק למשרה המיועדת.
      </Message>
      <Message from="kocha">
        טיפ: כדאי ליצור גרסה נפרדת של קורות החיים לכל משרה שאתם מגישים אליה. מערכות סינון אוטומטיות ומגייסים מחפשים את
        המילים והכישורים שמופיעים בתיאור המשרה, וגרסה מותאמת מציגה קודם את הניסיון הכי רלוונטי לתפקיד. כך קל יותר לראות
        שאתם מתאימים.
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
      {askConsent &&
        purposes.map((purpose) => (
          <Checkbox
            key={purpose}
            label={CONSENT.texts[purpose]}
            checked={agreed[purpose]}
            onChange={(e) => setAgreed({ ...agreed, [purpose]: e.target.checked })}
          />
        ))}
      <p className="intake-privacy">
        {backend === "gemini"
          ? "קורות החיים והשיחה מעובדים בעזרת Gemini של Google, נשמרים רק בזיכרון השרת, ונמחקים אחרי 6 שעות בלי פעילות או כשלוחצים על \"התחלה מחדש\". "
          : backend === "files"
            ? "הכלי רץ אצלכם: קורות החיים נשמרים בתיקייה .messages במחשב שלכם ומעובדים על ידי כלי ה־AI שבחרתם. "
            : ""}
        רוצים פרטיות מלאה? הכלי הזה הוא{" "}
        <a href={REPO_URL} target="_blank" rel="noopener">
          קוד פתוח ב־GitHub
        </a>
        . אפשר להריץ אותו אצלכם עם Claude Code או Codex, וכך קורות החיים לא עוברים דרך השרת שלנו, רק דרך כלי ה־AI שתבחרו.
      </p>
      <Button type="submit" disabled={!ready || sending} style={{ justifySelf: "center" }}>
        הבא
      </Button>
    </form>
  );
}
