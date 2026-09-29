import type { Meta, StoryObj } from "@storybook/react-vite";
import { Block } from "../components/Block";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { Highlight } from "../components/Highlight";
import { Paragraph } from "../components/Paragraph";
import { Text, type TextVariant } from "../components/Text";

// One page with the tokens and every design component. Values live in components/design.css.
const COLORS = ["paper", "surface", "ink", "muted", "faint", "hair", "marker", "audio", "critical"];
const VARIANTS: TextVariant[] = ["display", "heading", "lead", "body", "caption", "mono"];

const section = { display: "grid", gap: "1rem", marginBottom: "2.5rem" } as const;

function DesignKitchenSink() {
  return (
    <div style={{ background: "var(--paper)", padding: "2rem", minHeight: "100vh" }}>
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
        <Text variant="heading">בלוק</Text>
        <Block>
          <Text variant="heading">כותרת בלוק</Text>
          <Paragraph>תוכן בתוך בלוק.</Paragraph>
          <Button>פעולה</Button>
        </Block>
      </section>
    </div>
  );
}

const meta = {
  title: "Pages/Design Kitchen Sink",
  component: DesignKitchenSink,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DesignKitchenSink>;
export default meta;

export const Overview: StoryObj<typeof meta> = {};
