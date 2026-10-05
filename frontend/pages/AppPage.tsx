import { useEffect, useMemo, useRef, useState } from "react";
import { httpApi, readCv, readTips, type Api, type Snapshot } from "../api";
import { Block } from "../components/Block";
import { Button } from "../components/Button";
import { ChatInput } from "../components/ChatInput";
import { CvCanvas } from "../components/CvCanvas";
import { CvOutline } from "../components/CvOutline";
import { Drawer } from "../components/Drawer";
import { Message } from "../components/Message";
import { PrepPoints } from "../components/PrepPoints";
import { SENIORITY_LABELS, TRACK_LABELS, type Seniority, type Track } from "../components/prepPointsSample";
import { Select } from "../components/Select";
import { StageGauge } from "../components/StageGauge";
import { Text } from "../components/Text";
import { TypingIndicator } from "../components/TypingIndicator";
import { CvDocumentView } from "../cv/CvDocumentView";
import type { CvData } from "../cv/data";
import type { CvDocument, CvPatch } from "../cv/document";
import { downloadCvHtml } from "../cv/exportHtml";
import { PALETTE_LABELS, TEMPLATE_LABELS, TYPOGRAPHY_LABELS } from "../cv/labels";
import { cvToOutline } from "../cv/outline";
import { TEMPLATES, type TemplateName } from "../cv/templates";
import { PALETTES, TYPOGRAPHY, type PaletteName, type TypographyName } from "../cv/theme";
import { ExportPanel } from "./ExportPanel";
import { IntakeForm } from "./IntakeForm";

const STAGES = ["מה, מו, מי", "כוונון", "עיצוב", "ייצוא"];
const TEMPLATE_NAMES = Object.keys(TEMPLATES) as TemplateName[];
const PALETTE_NAMES = Object.keys(PALETTES) as PaletteName[];
const TYPOGRAPHY_NAMES = Object.keys(TYPOGRAPHY) as TypographyName[];
const READING = "קוחה קוראת את קורות החיים ותחזור עם גרסה ראשונה…";

// Full-height grid: stage gauge on top; below it the current stage's view.
// Stage 0 is the intake form; later stages show CV (70%, left) and chat (30%, right).
// The grid itself is LTR so CV stays physically left and chat right; each area is RTL inside.
// Everything comes from the server through `api`: messages, kocha's replies, and the CV and
// tips her replies carry (see AGENTS.md). Polls instead of pushing: file watching is unreliable
// across container volume mounts.
export function AppPage({ api = httpApi, initialStage = 0, pollMs = 2000 }: { api?: Api; initialStage?: number; pollMs?: number }) {
  const [stage, setStage] = useState(initialStage);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const fail = (e: unknown) => setError(e instanceof Error ? e.message : String(e));

  useEffect(() => {
    let live = true;
    const refresh = () =>
      api.load().then(
        (s) => live && (setSnapshot(s), setError(null)),
        (e) => live && fail(e),
      );
    refresh();
    const timer = setInterval(refresh, pollMs);
    return () => {
      live = false;
      clearInterval(timer);
    };
  }, [api, pollMs]);

  const messages = snapshot?.messages ?? [];
  const waiting = messages.length > 0 && !messages[messages.length - 1].reply;

  // On reload, an intake already on the server means the form is done.
  const resumed = useRef(false);
  useEffect(() => {
    if (!snapshot || resumed.current) return;
    resumed.current = true;
    if (stage === 0 && messages.some((m) => m.intake)) setStage(1);
  }, [snapshot]); // eslint-disable-line react-hooks/exhaustive-deps

  // The CV is the latest data any reply sent, with the patch that came with or after it.
  const cv = useMemo(() => {
    let data: CvData | null = null;
    let patch: CvPatch | undefined;
    let theme: { key: string; value: NonNullable<ReturnType<typeof readCv>>["theme"] } | null = null;
    for (const m of messages) {
      const c = m.reply && readCv(m.reply.cv);
      if (!c) continue;
      if (c.data) {
        data = c.data;
        patch = undefined;
      }
      if (c.patch) patch = c.patch;
      if (c.theme) theme = { key: m.id, value: c.theme };
    }
    return { data, patch, theme };
  }, [messages]);

  // The latest tips any reply sent.
  const tips = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const t = messages[i].reply && readTips(messages[i].reply!.tips);
      if (t) return t;
    }
    return null;
  }, [messages]);

  // Design-stage theming. A theme kocha suggests is applied once; the user can change it after.
  const [template, setTemplate] = useState<TemplateName>("Ledger");
  const [palette, setPalette] = useState<PaletteName>("Slate");
  const [typography, setTypography] = useState<TypographyName>("Bricolage");
  useEffect(() => {
    const t = cv.theme?.value;
    if (!t) return;
    if (t.template && t.template in TEMPLATES) setTemplate(t.template);
    if (t.palette && t.palette in PALETTES) setPalette(t.palette);
    if (t.typography && t.typography in TYPOGRAPHY) setTypography(t.typography);
  }, [cv.theme?.key]); // eslint-disable-line react-hooks/exhaustive-deps

  const doc = useMemo<CvDocument | null>(
    () => (cv.data ? { data: cv.data, theme: { template, palette, typography }, patch: cv.patch } : null),
    [cv.data, cv.patch, template, palette, typography],
  );

  // Tips: dismissed locally; changing seniority or track asks kocha to redo them.
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [profile, setProfile] = useState<{ seniority: Seniority; track: Track } | null>(null);
  const shownProfile = profile ?? tips?.profile ?? null;
  const jobFit = (tips?.jobFit ?? []).filter((p) => !dismissed.includes(p.id));
  const points = (tips?.points ?? []).filter((p) => !dismissed.includes(p.id));
  function changeProfile(s: Seniority, t: Track) {
    const next = { seniority: t === "management" && s === "junior" ? ("mid" as const) : s, track: t };
    setProfile(next);
    send(`עדכון פרופיל: רמה ${SENIORITY_LABELS[next.seniority]}, מסלול ${TRACK_LABELS[next.track]}. אפשר לעדכן את הטיפים בהתאם?`);
  }

  function send(text: string) {
    api.send(text).catch(fail);
  }

  async function submitIntake(intake: Parameters<Api["sendIntake"]>[0]) {
    setSending(true);
    try {
      await api.sendIntake(intake);
      setStage(1);
    } catch (e) {
      fail(e);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="app-page">
      <h1 className="ds-sr-only">קוחה</h1>
      <div className="app-page-stages">
        <StageGauge label="שלבי העבודה" stages={STAGES} current={stage} />
        <div role="alert" className="app-page-error">
          {error && `משהו השתבש בחיבור לשרת (${error}). מנסים שוב…`}
        </div>
      </div>

      {stage === 0 ? (
        <section className="app-page-form" aria-label={STAGES[0]}>
          <IntakeForm onNext={submitIntake} sending={sending} />
        </section>
      ) : stage === 3 ? (
        // Export, laid out like the intake form. PDF: print dialog with print-only CV.
        // TODO: server renderer for PDF, and a real booking link.
        <section className="app-page-form" aria-label={STAGES[3]}>
          {doc ? (
            <ExportPanel
              doc={doc}
              onExportPdf={() => window.print()}
              onExportHtml={() => downloadCvHtml(doc)}
              onBookPractice={() => {}}
            />
          ) : (
            <p className="ds-prep-empty">{READING}</p>
          )}
        </section>
      ) : (
        <>
          <section className="app-page-cv" aria-label="קורות חיים">
            <Block>
              <div className="app-page-cv-head">
                <Text variant="heading">קורות חיים</Text>
                <Button onClick={() => setStage(stage + 1)}>הבא</Button>
              </div>
              {!doc ? (
                <p className="ds-prep-empty">{READING}</p>
              ) : stage === 1 ? (
                // Fine-tuning: plain structured content. tabIndex: scrollable regions need keyboard access.
                <div className="app-page-cv-body">
                  <div className="app-page-cv-scroll" tabIndex={0} aria-label="סעיפי קורות החיים">
                    <CvOutline sections={cvToOutline(doc.data)} />
                  </div>
                  {/* Private to the candidate, never part of the CV. */}
                  <Drawer title="טיפים לשיפור" count={jobFit.length + points.length} placement="top">
                    {shownProfile && (
                      <div className="app-page-prep-profile">
                        {tips?.target && (
                          <p className="app-page-prep-target" dir="auto">
                            משרה: {tips.target}
                          </p>
                        )}
                        <Select
                          compact
                          label="רמה"
                          value={shownProfile.seniority}
                          options={shownProfile.track === "management" ? (["mid", "senior"] as const) : (["junior", "mid", "senior"] as const)}
                          labels={SENIORITY_LABELS}
                          onChange={(s) => changeProfile(s, shownProfile.track)}
                        />
                        <Select
                          compact
                          label="מסלול"
                          value={shownProfile.track}
                          options={["hands-on", "management"] as const}
                          labels={TRACK_LABELS}
                          onChange={(t) => changeProfile(shownProfile.seniority, t)}
                        />
                      </div>
                    )}
                    {tips ? (
                      <PrepPoints
                        strengths={tips.strengths}
                        jobFit={jobFit}
                        points={points}
                        onDismiss={(id) => setDismissed((d) => [...d, id])}
                      />
                    ) : (
                      <p className="ds-prep-empty">קוחה תכין טיפים אחרי שתקרא את קורות החיים.</p>
                    )}
                  </Drawer>
                </div>
              ) : (
                // Design: the laid-out page on a zoom/pan canvas, with template, palette and
                // typography pickers in the canvas tray.
                <CvCanvas
                  label="תצוגת קורות חיים"
                  controls={
                    <>
                      <Select compact label="תבנית" value={template} options={TEMPLATE_NAMES} labels={TEMPLATE_LABELS} onChange={setTemplate} />
                      <Select compact label="צבעים" value={palette} options={PALETTE_NAMES} labels={PALETTE_LABELS} onChange={setPalette} />
                      <Select compact label="גופן" value={typography} options={TYPOGRAPHY_NAMES} labels={TYPOGRAPHY_LABELS} onChange={setTypography} />
                    </>
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
                  column-reverse pins the view to the newest message; the inner list keeps reading order.
                  aria-live: screen readers announce kocha's replies as they arrive. */}
              <div className="app-page-chat-scroll" tabIndex={0} aria-label="הודעות">
                <div className="app-page-chat-list" aria-live="polite">
                  {messages.map((m) => (
                    <div key={m.id} className="app-page-chat-turn">
                      <Message from="user">{m.text}</Message>
                      {m.reply && <Message from="kocha">{m.reply.text}</Message>}
                    </div>
                  ))}
                  {waiting && <TypingIndicator />}
                </div>
              </div>
              <ChatInput onSend={send} />
            </Block>
          </section>
        </>
      )}
    </main>
  );
}
