import { Block } from "../components/Block";
import { Paragraph } from "../components/Paragraph";
import { StageGauge } from "../components/StageGauge";
import { Text } from "../components/Text";

const STAGES = ["מה, מו, מי", "כוונון", "עיצוב", "ייצוא"];

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
          {/* tabIndex: a scrollable region must be reachable by keyboard */}
          <div className="app-page-chat-scroll" tabIndex={0} aria-label="הודעות">
            <Paragraph muted>מקום שמור לרכיב הצ'אט.</Paragraph>
            {Array.from({ length: 30 }, (_, i) => (
              <Paragraph key={i}>הודעה {i + 1}</Paragraph>
            ))}
          </div>
        </Block>
      </section>
    </main>
  );
}
