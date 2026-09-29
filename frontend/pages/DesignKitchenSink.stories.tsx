import type { Meta, StoryObj } from "@storybook/react-vite";
import { Block } from "../components/Block";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { CvOutline } from "../components/CvOutline";
import { SAMPLE_OUTLINE } from "../components/cvOutlineSample";
import { FileInput } from "../components/FileInput";
import { Highlight } from "../components/Highlight";
import { Message } from "../components/Message";
import { Paragraph } from "../components/Paragraph";
import { StageGauge } from "../components/StageGauge";
import { Text, type TextVariant } from "../components/Text";
import { TextArea } from "../components/TextArea";
import { TextField } from "../components/TextField";
import { TypingIndicator } from "../components/TypingIndicator";

// One page with the tokens and every design component. Values live in components/design.css.
const COLORS = ["paper", "surface", "ink", "muted", "faint", "hair", "marker", "audio", "critical"];
const VARIANTS: TextVariant[] = ["display", "heading", "lead", "body", "caption", "mono"];

const section = { display: "grid", gap: "1rem", marginBottom: "2.5rem" } as const;

function DesignKitchenSink() {
  return (
    <main style={{ background: "var(--surface)", padding: "2rem", minHeight: "100vh" }}>
      <section style={section}>
        <Text variant="display">שפת עיצוב</Text>
      </section>

      <section style={section}>
        <Text variant="heading">צבעים</Text>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {COLORS.map((c) => (
            <div key={c} style={{ width: 96 }}>
              <div style={{ height: 56, background: `var(--${c})`, border: "2px solid var(--ink)" }} />
              <Text variant="mono">--{c}</Text>
            </div>
          ))}
        </div>
      </section>

      <section style={section}>
        <Text variant="heading">טיפוגרפיה</Text>
        {VARIANTS.map((v) => (
          <div key={v} style={{ display: "grid", gridTemplateColumns: "6rem 1fr", alignItems: "baseline" }}>
            <Text variant="caption">{v}</Text>
            <div>
              <Text variant={v}>{v === "mono" ? "BACKEND=files" : "דג סקרן שט בים מאוכזב"}</Text>
            </div>
          </div>
        ))}
      </section>

      <section style={section}>
        <Text variant="heading">פסקה</Text>
        <Paragraph>
          כל הודעה נכתבת לתיבת דואר נכנס. מודל בינה מלאכותית קורא אותה וכותב תשובה עם אותו מזהה.
        </Paragraph>
        <Paragraph muted>פסקה מעומעמת לטקסט משני.</Paragraph>
      </section>

      <section style={section}>
        <Text variant="heading">הדגשה</Text>
        <Text variant="display">
          שפת <Highlight>עיצוב</Highlight>
        </Text>
        <Paragraph>
          כל הודעה נכתבת לתיבת דואר נכנס, ו<Highlight>התשובה</Highlight> מופיעה כשהיא מגיעה.
        </Paragraph>
      </section>

      <section style={section}>
        <Text variant="heading">כפתור</Text>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button>שליחה</Button>
          <Button disabled>לא זמין</Button>
        </div>
      </section>

      <section style={section}>
        <Text variant="heading">תיבת סימון</Text>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Checkbox label="לא מסומן" />
          <Checkbox label="מסומן" defaultChecked />
          <Checkbox label="לא זמין" disabled />
        </div>
      </section>

      <section style={section}>
        <Text variant="heading">מד שלבים</Text>
        <StageGauge label="שלבי העבודה" stages={["מה, מו, מי", "כוונון", "עיצוב", "ייצוא"]} current={1} />
      </section>

      <section style={section}>
        <Text variant="heading">שדות טופס</Text>
        <div style={{ display: "grid", gap: "1rem", maxInlineSize: 480 }}>
          <FileInput label="קורות חיים נוכחיים (PDF)" accept="application/pdf" file={null} onChange={() => {}} />
          <TextField label="תפקיד מבוקש" placeholder="למשל: מפתח פרונטאנד בכיר" />
          <TextArea label="תיאור המשרה המלא (לא חובה)" placeholder="הדביקו כאן את תיאור המשרה" rows={3} />
        </div>
      </section>

      <section style={section}>
        <Text variant="heading">מתאר קורות חיים</Text>
        <div style={{ maxInlineSize: 640 }}>
          <CvOutline sections={SAMPLE_OUTLINE.slice(0, 1)} />
        </div>
      </section>

      <section style={section}>
        <Text variant="heading">הודעות</Text>
        <div style={{ display: "grid", gap: "0.75rem", maxInlineSize: 480 }}>
          <Message from="kocha">היי! אני קוחה. ספרו לי קצת על עצמכם.</Message>
          <Message from="user">אני מפתח תוכנה, חמש שנים בפרונטאנד.</Message>
          <TypingIndicator />
        </div>
      </section>

      <section style={section}>
        <Text variant="heading">בלוק</Text>
        <Block>
          <Text variant="heading">כותרת בלוק</Text>
          <Paragraph>תוכן בתוך בלוק.</Paragraph>
          <Button>פעולה</Button>
        </Block>
      </section>
    </main>
  );
}

const meta = {
  title: "Pages/Design Kitchen Sink",
  component: DesignKitchenSink,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DesignKitchenSink>;
export default meta;

export const Overview: StoryObj<typeof meta> = {};
