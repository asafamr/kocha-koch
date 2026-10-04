import { useMemo, useState } from "react";
import { Block } from "../components/Block";
import { Button } from "../components/Button";
import { ChatInput } from "../components/ChatInput";
import { CvCanvas } from "../components/CvCanvas";
import { CvOutline } from "../components/CvOutline";
import { Drawer } from "../components/Drawer";
import { Message } from "../components/Message";
import { PrepPoints } from "../components/PrepPoints";
import { PREP_SAMPLES, SENIORITY_LABELS, TRACK_LABELS, type Seniority, type Track } from "../components/prepPointsSample";
import { StageGauge } from "../components/StageGauge";
import { Text } from "../components/Text";
import { TypingIndicator } from "../components/TypingIndicator";
import { Select } from "../components/Select";
import { CvDocumentView } from "../cv/CvDocumentView";
import { downloadCvHtml } from "../cv/exportHtml";
import { SAMPLE_CV } from "../cv/data";
import type { CvDocument } from "../cv/document";
import { PALETTE_LABELS, TEMPLATE_LABELS, TYPOGRAPHY_LABELS } from "../cv/labels";
import { cvToOutline } from "../cv/outline";
import { TEMPLATES, type TemplateName } from "../cv/templates";
import { PALETTES, TYPOGRAPHY, type PaletteName, type TypographyName } from "../cv/theme";

const TEMPLATE_NAMES = Object.keys(TEMPLATES) as TemplateName[];
const PALETTE_NAMES = Object.keys(PALETTES) as PaletteName[];
const TYPOGRAPHY_NAMES = Object.keys(TYPOGRAPHY) as TypographyName[];
import { ExportPanel } from "./ExportPanel";
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
  // Chat messages; sending only appends locally until the chat is wired to the backend.
  const [chat, setChat] = useState(SAMPLE_CHAT);
  // Prep points the candidate marked as not relevant.
  // Improvement tips depend on seniority and track (the sample CV is senior hands-on).
  const [seniority, setSeniority] = useState<Seniority>("senior");
  const [track, setTrack] = useState<Track>("hands-on");
  const [dismissed, setDismissed] = useState<string[]>([]);
  const prep = PREP_SAMPLES[`${seniority}/${track}`];
  const prepPoints = prep.points.filter((pt) => !dismissed.includes(pt.id));
  const jobFit = prep.jobFit.filter((pt) => !dismissed.includes(pt.id));
  function changeProfile(s: Seniority, t: Track) {
    // No junior management profile: picking management from junior moves to mid.
    setSeniority(t === "management" && s === "junior" ? "mid" : s);
    setTrack(t);
    setDismissed([]);
  }
  // Design-stage theming: which template, palette and typography the CV renders with.
  const [template, setTemplate] = useState<TemplateName>("Ledger");
  const [palette, setPalette] = useState<PaletteName>("Slate");
  const [typography, setTypography] = useState<TypographyName>("Bricolage");
  // The CV the canvas shows: data + theme (+ patch, later from the AI).
  const doc = useMemo<CvDocument>(
    () => ({ data: SAMPLE_CV, theme: { template, palette, typography } }),
    [template, palette, typography],
  );

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
      ) : stage === 3 ? (
        // Export, laid out like the intake form. PDF: print dialog with print-only CV.
        // TODO: server renderer for PDF, and a real booking link.
        <section className="app-page-form" aria-label={STAGES[3]}>
          <ExportPanel
            doc={doc}
            onExportPdf={() => window.print()}
            onExportHtml={() => downloadCvHtml(doc)}
            onBookPractice={() => {}}
          />
        </section>
      ) : (
        <>
          <section className="app-page-cv" aria-label="קורות חיים">
            <Block>
              <div className="app-page-cv-head">
                <Text variant="heading">קורות חיים</Text>
                <Button onClick={() => setStage(stage + 1)}>הבא</Button>
              </div>
              {stage === 1 ? (
                // Fine-tuning: plain structured content. tabIndex: scrollable regions need keyboard access.
                <div className="app-page-cv-body">
                  <div className="app-page-cv-scroll" tabIndex={0} aria-label="סעיפי קורות החיים">
                    <CvOutline sections={cvToOutline(doc.data)} />
                  </div>
                  {/* Private to the candidate, never part of the CV. Sample until the AI is wired in. */}
                  <Drawer title="טיפים לשיפור" count={jobFit.length + prepPoints.length} placement="top">
                    <div className="app-page-prep-profile">
                      <p className="app-page-prep-target" dir="auto">משרה לדוגמה: {prep.target}</p>
                      <Select
                        compact
                        label="רמה"
                        value={seniority}
                        options={track === "management" ? (["mid", "senior"] as const) : (["junior", "mid", "senior"] as const)}
                        labels={SENIORITY_LABELS}
                        onChange={(s) => changeProfile(s, track)}
                      />
                      <Select
                        compact
                        label="מסלול"
                        value={track}
                        options={["hands-on", "management"] as const}
                        labels={TRACK_LABELS}
                        onChange={(t) => changeProfile(seniority, t)}
                      />
                    </div>
                    <PrepPoints
                      strengths={prep.strengths}
                      jobFit={jobFit}
                      points={prepPoints}
                      onDismiss={(id) => setDismissed((d) => [...d, id])}
                    />
                  </Drawer>
                </div>
              ) : (
                // Design: the laid-out page on a zoom/pan canvas, with template, palette and
                // typography pickers in the canvas tray.
                <CvCanvas
                  label="תצוגת קורות חיים"
                  controls={
                    stage === 2 && (
                    <>
                      <Select compact label="תבנית" value={template} options={TEMPLATE_NAMES} labels={TEMPLATE_LABELS} onChange={setTemplate} />
                      <Select compact label="צבעים" value={palette} options={PALETTE_NAMES} labels={PALETTE_LABELS} onChange={setPalette} />
                      <Select compact label="גופן" value={typography} options={TYPOGRAPHY_NAMES} labels={TYPOGRAPHY_LABELS} onChange={setTypography} />
                    </>
                    )
                  }
                >
                  <CvDocumentView doc={doc} />
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
                  {chat.map((m, i) => (
                    <Message key={i} from={m.from}>
                      {m.text}
                    </Message>
                  ))}
                  <TypingIndicator />
                </div>
              </div>
              <ChatInput onSend={(text) => setChat((c) => [...c, { from: "user", text }])} />
            </Block>
          </section>
        </>
      )}
    </main>
  );
}
