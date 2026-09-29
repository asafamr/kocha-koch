import { Block } from "../components/Block";
import { Message } from "../components/Message";
import { Paragraph } from "../components/Paragraph";
import { StageGauge } from "../components/StageGauge";
import { Text } from "../components/Text";
import { TypingIndicator } from "../components/TypingIndicator";

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

// Full-height grid: stage gauge on top; below it CV (70%, left) and chat (30%, right).
// The grid itself is LTR so CV stays physically left and chat right; each area is RTL inside.
// Both frames end at the viewport; only the chat messages scroll, inside the chat frame.
export function AppPage({ stage = 0 }: { stage?: number }) {
  return (
    <main className="app-page">
      <h1 className="ds-sr-only">קוחה</h1>
      <div className="app-page-stages">
        <StageGauge label="שלבי העבודה" stages={STAGES} current={stage} />
      </div>

      <section className="app-page-cv" aria-label="קורות חיים">
        <Block>
          <Text variant="heading">קורות חיים</Text>
          <Paragraph muted>מקום שמור לרכיב קורות החיים.</Paragraph>
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
    </main>
  );
}
