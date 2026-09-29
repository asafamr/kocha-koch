import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { CvTimeline } from "../cv/CvTimeline";
import { SAMPLE_CV } from "../cv/data";
import "../cv/cv.css";
import { PALETTES, themeVars, TYPOGRAPHY, type PaletteName, type TypographyName } from "../cv/theme";

// CV styling kitchen sink (English): the five palettes and five typography options from cv/theme.ts,
// each shown as tokens, a specimen, and a small Timeline CV using it.
const palettes = Object.keys(PALETTES) as PaletteName[];
const typographies = Object.keys(TYPOGRAPHY) as TypographyName[];
const ROLES = ["ink", "muted", "accent", "tint", "rule"] as const;

const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 };
const card: CSSProperties = { background: "#fff", border: "1px solid #d9d5ca", padding: 16, display: "grid", gap: 10 };

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ display: "grid", gap: 12, marginBlockEnd: 40 }}>
      <h2 style={{ margin: 0, font: "700 18px/1.2 Inter, sans-serif" }}>{title}</h2>
      {children}
    </section>
  );
}

// A4 page shrunk to 26% so five fit side by side.
function Mini({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figure style={{ margin: 0, display: "grid", gap: 6 }}>
      <div style={{ inlineSize: "54.6mm", blockSize: "77.2mm", overflow: "hidden", boxShadow: "0 1px 6px rgb(0 0 0 / 0.2)" }}>
        <div style={{ transform: "scale(0.26)", transformOrigin: "top left" }} aria-hidden="true">
          {children}
        </div>
      </div>
      <figcaption style={{ font: "500 13px Inter, sans-serif" }}>{label}</figcaption>
    </figure>
  );
}

function CvKitchenSink() {
  return (
    <main lang="en" dir="ltr" style={{ padding: 32, background: "#F4F2ED", minBlockSize: "100vh", color: "#111", font: "14px/1.5 Inter, sans-serif" }}>
      <h1 style={{ margin: "0 0 24px", font: "700 28px/1.2 Inter, sans-serif" }}>CV styling</h1>

      <Section title="Palettes">
        <div style={grid}>
          {palettes.map((name) => (
            <div key={name} style={{ ...card, ...themeVars(name, "Modern") }}>
              <strong>{name}</strong>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4 }}>
                {ROLES.map((role) => (
                  <div key={role} style={{ display: "grid", gap: 2, fontSize: 11, minInlineSize: 0 }}>
                    <div title={PALETTES[name][role]} style={{ blockSize: 32, background: PALETTES[name][role], border: "1px solid #0002" }} />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
              <div style={{ color: "var(--cv-accent)", font: "700 11px Inter, sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Experience
              </div>
              <div style={{ color: "var(--cv-ink)" }}>Senior Full Stack Developer</div>
              <div style={{ color: "var(--cv-muted)", fontSize: 12 }}>Monday.com · Tel Aviv</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div style={grid}>
          {typographies.map((name) => {
            const t = TYPOGRAPHY[name];
            return (
              <div key={name} style={{ ...card, ...themeVars("Ink", name) }}>
                <strong style={{ fontFamily: "Inter, sans-serif" }}>{name}</strong>
                <div style={{ fontFamily: "var(--cv-font-display)", fontWeight: t.displayWeight, fontSize: 28, lineHeight: 1.1 }}>Noa Levi</div>
                <div
                  style={{
                    fontFamily: "var(--cv-font-heading)", fontWeight: 700, fontSize: 12,
                    textTransform: t.headingCase, fontVariant: t.headingVariant, letterSpacing: t.headingTracking,
                  }}
                >
                  Experience
                </div>
                <p style={{ margin: 0, fontFamily: "var(--cv-font-body)", fontSize: 13 }}>
                  Led the migration of the booking system to React and TypeScript, cutting load time by 40%.
                </p>
                <code style={{ fontSize: 10, color: "#555" }}>
                  name {t.display.split(",")[0]} · body {t.body.split(",")[0]}
                </code>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Palettes on the Timeline style">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {palettes.map((p) => (
            <Mini key={p} label={p}>
              <CvTimeline cv={SAMPLE_CV} palette={p} />
            </Mini>
          ))}
        </div>
      </Section>

      <Section title="Typography on the Timeline style">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {typographies.map((t) => (
            <Mini key={t} label={t}>
              <CvTimeline cv={SAMPLE_CV} typography={t} />
            </Mini>
          ))}
        </div>
      </Section>
    </main>
  );
}

const meta = {
  title: "Pages/CV Kitchen Sink",
  component: CvKitchenSink,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CvKitchenSink>;
export default meta;

export const Overview: StoryObj<typeof meta> = {};
