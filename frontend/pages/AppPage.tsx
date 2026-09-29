import { useState } from "react";
import { Block } from "../components/Block";
import { CvCanvas } from "../components/CvCanvas";
import { CvOutline } from "../components/CvOutline";
import { SAMPLE_OUTLINE } from "../components/cvOutlineSample";
import { Message } from "../components/Message";
import { StageGauge } from "../components/StageGauge";
import { Text } from "../components/Text";
import { TypingIndicator } from "../components/TypingIndicator";
import { CvLedger } from "../cv/CvLedger";
import { SAMPLE_CV } from "../cv/data";
import { IntakeForm } from "./IntakeForm";

const STAGES = ["מה, מו, מי", "כוונון", "עיצוב", "ייצוא"];

// Placeholder conversation until the chat is wired to the API.
const SAMPLE_CHAT: { from: "kocha" | "user"; text: string }[] = [
  { from: "kocha", text: "היי! אני קוחה. ספרו לי קצת על עצמכם: מה אתם עושים היום?" },
  { from: "user", text: "אני מפתח תוכנה, חמש שנים בפרונטאנד." },
  { from: "kocha", text: "מעולה. באילו טכנולוגיות עבדתם הכי הרבה?" },
  { from: "user", text: "בעיקר React ו־TypeScript, וקצת Node." },
  { from: "kocha", text: "יש פרויקט אחד שאתם הכי גאים בו?" },
  { from: "user", text: "בניתי מערכת הזמנות שמשרתת 20 אלף משתמשים ביום." },
  { from: "kocha", text: "זה נשמע כמו שורה חזקה לקורות החיים. מה היה החלק שלכם בפרויקט?" },
  { from: "user", text: "הובלתי את הפרונטאנד וצוות של שלושה מפתחים." },
];

// Full-height grid: stage gauge on top; below it the current stage's view.
// Stage 0 is the intake form; later stages show CV (70%, left) and chat (30%, right).
// The grid itself is LTR so CV stays physically left and chat right; each area is RTL inside.
export function AppPage({ initialStage = 0 }: { initialStage?: number }) {
  const [stage, setStage] = useState(initialStage);

  return (
    <main className="app-page">
      <h1 className="ds-sr-only">קוחה</h1>
      <div className="app-page-stages">
        <StageGauge label="שלבי העבודה" stages={STAGES} current={stage} />
      </div>

      {stage === 0 ? (
        <section className="app-page-form" aria-label={STAGES[0]}>
          <IntakeForm onNext={() => setStage(1)} />
        </section>
      ) : (
        <>
          <section className="app-page-cv" aria-label="קורות חיים">
            <Block>
              <Text variant="heading">קורות חיים</Text>
              {stage === 1 ? (
                // Fine-tuning: plain structured content. tabIndex: scrollable regions need keyboard access.
                <div className="app-page-cv-scroll" tabIndex={0} aria-label="סעיפי קורות החיים">
                  <CvOutline sections={SAMPLE_OUTLINE} />
                </div>
              ) : (
                // Design (and later): the laid-out page on a zoom/pan canvas.
                <CvCanvas label="תצוגת קורות חיים">
                  <CvLedger cv={SAMPLE_CV} />
                </CvCanvas>
              )}
            </Block>
          </section>

          <section className="app-page-chat" aria-label="צ'אט">
            <Block>
              <Text variant="heading">צ'אט</Text>
              {/* tabIndex: a scrollable region must be reachable by keyboard.
                  column-reverse pins the view to the newest message; the inner list keeps reading order. */}
              <div className="app-page-chat-scroll" tabIndex={0} aria-label="הודעות">
                <div className="app-page-chat-list">
                  {SAMPLE_CHAT.map((m, i) => (
                    <Message key={i} from={m.from}>
                      {m.text}
                    </Message>
                  ))}
                  <TypingIndicator />
                </div>
              </div>
            </Block>
          </section>
        </>
      )}
    </main>
  );
}
