import { useEffect, useMemo, useRef, useState } from "react";
import { httpApi, readCv, readTips, type Api, type Snapshot, type ThreadItem } from "../api";
import { Block } from "../components/Block";
import { Button } from "../components/Button";
import { ChatInput } from "../components/ChatInput";
import { CvCanvas } from "../components/CvCanvas";
import { CvOutline } from "../components/CvOutline";
import { Drawer } from "../components/Drawer";
import { Message } from "../components/Message";
import { PrepPoints } from "../components/PrepPoints";
import { Select } from "../components/Select";
import { StageGauge } from "../components/StageGauge";
import { Text } from "../components/Text";
import { TypingIndicator } from "../components/TypingIndicator";
import { CvDocumentView } from "../cv/CvDocumentView";
import type { CvData } from "../cv/data";
import type { CvDocument, CvPatch } from "../cv/document";
import { cvHtmlFile, downloadCvHtml, downloadCvPdf } from "../cv/exportHtml";
import { PALETTE_LABELS, TEMPLATE_LABELS, TYPOGRAPHY_LABELS } from "../cv/labels";
import { cvToOutline } from "../cv/outline";
import { TEMPLATES, type TemplateName } from "../cv/templates";
import { PALETTES, TYPOGRAPHY, type PaletteName, type TypographyName } from "../cv/theme";
import { kochaUrl } from "../links";
import { ExportPanel, type PdfState } from "./ExportPanel";
import { IntakeForm } from "./IntakeForm";

const STAGES = ["מה, מו, מי", "כוונון", "עיצוב", "ייצוא"];
const TEMPLATE_NAMES = Object.keys(TEMPLATES) as TemplateName[];
const PALETTE_NAMES = Object.keys(PALETTES) as PaletteName[];
const TYPOGRAPHY_NAMES = Object.keys(TYPOGRAPHY) as TypographyName[];
const READING = "קוחה קוראת את קורות החיים ותחזור עם גרסה ראשונה…";

type Saved = {
  stage?: number;
  template?: TemplateName;
  palette?: PaletteName;
  typography?: TypographyName;
  themeKey?: string;
  dismissed?: string[];
};

// Saved state, keeping only values that are still valid.
function loadSaved(key?: string): Saved {
  if (!key) return {};
  let v: Saved;
  try {
    v = JSON.parse(localStorage.getItem(key) ?? "{}");
  } catch {
    return {};
  }
  return {
    stage: Number.isInteger(v.stage) && v.stage! >= 0 && v.stage! < STAGES.length ? v.stage : undefined,
    template: v.template && v.template in TEMPLATES ? v.template : undefined,
    palette: v.palette && v.palette in PALETTES ? v.palette : undefined,
    typography: v.typography && v.typography in TYPOGRAPHY ? v.typography : undefined,
    themeKey: typeof v.themeKey === "string" ? v.themeKey : undefined,
    dismissed: Array.isArray(v.dismissed) ? v.dismissed.filter((d) => typeof d === "string") : undefined,
  };
}

// The typing indicator's progress line for a Gemini answer: phase and seconds.
const PHASES = { thinking: "חושבת", lookup: "בודקת מקורות", writing: "כותבת", verifying: "בודקת דיוק" } as const;
function progressText(p?: ThreadItem["progress"]): { detail?: string; note?: string } {
  if (!p) return {};
  const parts = [PHASES[p.phase], `${p.seconds} שנ׳`];
  return { detail: parts.join(" · "), note: p.thought };
}

// Full-height grid: stage gauge on top; below it the current stage's view.
// Stage 0 is the intake form; later stages show CV (70%, left) and chat (30%, right).
// The grid itself is LTR so CV stays physically left and chat right; each area is RTL inside.
// Everything comes from the server through `api`: messages, kocha's replies, and the CV and
// tips her replies carry (see AGENTS.md). Polls instead of pushing: file watching is unreliable
// across container volume mounts.
// With `persistKey`, the stage and the user's choices (design picks, dismissed tips)
// are kept in this browser, so a reload returns to the same place. The real app passes it;
// stories don't, so they never share saved state.
export function AppPage({
  api = httpApi,
  initialStage = 0,
  pollMs = 2000,
  persistKey,
}: {
  api?: Api;
  initialStage?: number;
  pollMs?: number;
  persistKey?: string;
}) {
  const [saved] = useState(() => loadSaved(persistKey));
  const [stage, setStage] = useState(saved.stage ?? initialStage);
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

  // The CV is the latest data any reply sent, with the patches that came with or after it: the
  // latest general one, and the latest one per template (used while that template is selected).
  const cv = useMemo(() => {
    let data: CvData | null = null;
    let patch: CvPatch | undefined;
    let byTemplate: Partial<Record<TemplateName, CvPatch>> = {};
    let theme: { key: string; value: NonNullable<ReturnType<typeof readCv>>["theme"] } | null = null;
    for (const m of messages) {
      const c = m.reply && readCv(m.reply.cv);
      if (!c) continue;
      if (c.data) {
        data = c.data;
        patch = undefined;
        byTemplate = {};
      }
      if (c.patch?.template) byTemplate[c.patch.template] = c.patch;
      else if (c.patch) patch = c.patch;
      if (c.theme) theme = { key: m.id, value: c.theme };
    }
    return { data, patch, byTemplate, theme };
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
  const [template, setTemplate] = useState<TemplateName>(saved.template ?? TEMPLATE_NAMES[0]);
  const [palette, setPalette] = useState<PaletteName>(saved.palette ?? "Slate");
  const [typography, setTypography] = useState<TypographyName>(saved.typography ?? "Bricolage");
  const [themeKey, setThemeKey] = useState(saved.themeKey); // the suggestion already applied
  useEffect(() => {
    const t = cv.theme?.value;
    if (!t || cv.theme!.key === themeKey) return;
    setThemeKey(cv.theme!.key);
    if (t.template && t.template in TEMPLATES) setTemplate(t.template);
    if (t.palette && t.palette in PALETTES) setPalette(t.palette);
    if (t.typography && t.typography in TYPOGRAPHY) setTypography(t.typography);
  }, [cv.theme?.key]); // eslint-disable-line react-hooks/exhaustive-deps

  // Design: mm of content below the A4 page. The button asks kocha to cut it (cut, don't shrink: KB D2).
  const [overflowMm, setOverflowMm] = useState(0);
  const overflowing = stage === 2 && overflowMm > 0;
  function askToFit() {
    send(`קורות החיים חורגים מעמוד אחד בכ־${overflowMm} מ״מ בתבנית ${TEMPLATE_LABELS[template]} (${template}). אפשר לקצר כך שייכנסו בעמוד אחד?`);
  }

  const doc = useMemo<CvDocument | null>(
    () =>
      cv.data
        ? { data: cv.data, theme: { template, palette, typography }, patch: cv.byTemplate[template] ?? cv.patch }
        : null,
    [cv.data, cv.patch, cv.byTemplate, template, palette, typography],
  );

  // Tips: dismissed locally. Seniority and track are inferred by kocha (docs/prompts/prep-points.md).
  const [dismissed, setDismissed] = useState<string[]>(saved.dismissed ?? []);

  useEffect(() => {
    if (!persistKey) return;
    const state: Saved = { stage, template, palette, typography, themeKey, dismissed };
    try {
      localStorage.setItem(persistKey, JSON.stringify(state));
    } catch {
      // Storage blocked (private mode): the page still works, it just won't remember.
    }
  }, [persistKey, stage, template, palette, typography, themeKey, dismissed]);
  const jobFit = (tips?.jobFit ?? []).filter((p) => !dismissed.includes(p.id));
  const points = (tips?.points ?? []).filter((p) => !dismissed.includes(p.id));

  function send(text: string) {
    api.send(text).catch(fail);
  }

  // Users who agreed to share their CVs with kocha (consent cv_processing) send them on export
  // too, in the background; the server reuses the result for an unchanged CV, so a later practice
  // click adds nothing. A failure never affects the download.
  const sharesCvs = messages.some((m) => m.intake?.consents?.some((c) => c.purpose === "cv_processing"));
  function shareWithKocha(d: CvDocument) {
    if (!sharesCvs) return;
    cvHtmlFile(d)
      .then((html) => api.handoff({ document: d, html }))
      .catch(() => {});
  }

  const [pdf, setPdf] = useState<PdfState>({ status: "idle" });
  async function exportPdf(d: CvDocument) {
    setPdf({ status: "working", text: "מכין את קובץ ה־PDF…" });
    try {
      const name = await downloadCvPdf(d, api.pdf);
      setPdf({ status: "done", text: `הקובץ ${name} ירד לתיקיית ההורדות.` });
      shareWithKocha(d);
    } catch (e) {
      const unavailable = e instanceof Error && e.message.includes("503");
      setPdf({ status: "error", text: unavailable ? "יצירת PDF לא זמינה בשרת הזה." : "לא הצלחתי ליצור PDF. נסו שוב." });
    }
  }

  // Stages after the intake can be opened from the gauge once the intake is sent.
  const intakeSent = messages.some((m) => m.intake);

  // The practice button. If the user agreed to share their CVs with kocha, hand them over first
  // and open kocha's join link with the token; on any failure open the plain tracked link. The
  // tab is opened inside the click (popup blockers allow it) and pointed at the link afterwards.
  async function practice(d: CvDocument) {
    const tab = window.open("about:blank", "_blank");
    if (tab) tab.opener = null;
    let url = kochaUrl("export");
    try {
      url = await api.handoff({ document: d, html: await cvHtmlFile(d) });
    } catch {
      // plain link
    }
    if (tab) tab.location.href = url;
    else window.location.href = url;
  }

  // Start over: the server archives the conversation; this browser forgets its saved state.
  const [confirmReset, setConfirmReset] = useState(false);
  async function startOver() {
    try {
      await api.reset();
    } catch (e) {
      fail(e);
      return;
    }
    try {
      if (persistKey) localStorage.removeItem(persistKey);
    } catch {
      // storage blocked: nothing saved to forget
    }
    setSnapshot((s) => ({ backend: s?.backend ?? "", messages: [] }));
    setStage(0);
    setTemplate(TEMPLATE_NAMES[0]);
    setPalette("Slate");
    setTypography("Bricolage");
    setThemeKey(undefined);
    setDismissed([]);
    setOverflowMm(0);
    setPdf({ status: "idle" });
    setConfirmReset(false);
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
        <StageGauge label="שלבי העבודה" stages={STAGES} current={stage} onSelect={setStage} canSelect={(i) => i > 0 && intakeSent} />
        <div role="alert" className="app-page-error">
          {error && `משהו השתבש בחיבור לשרת (${error}). מנסים שוב…`}
        </div>
      </div>

      {stage === 0 ? (
        <section className="app-page-form" aria-label={STAGES[0]}>
          <IntakeForm onNext={submitIntake} sending={sending} backend={snapshot?.backend} />
        </section>
      ) : stage === 3 ? (
        // Export, laid out like the intake form. PDF from the server, the same in every browser.
        // TODO: a real booking link.
        <section className="app-page-form" aria-label={STAGES[3]}>
          {doc ? (
            <ExportPanel
              prep={tips && <PrepPoints points={points} onDismiss={(id) => setDismissed((d) => [...d, id])} />}
              pdf={pdf}
              onExportPdf={() => exportPdf(doc)}
              onExportHtml={() => {
                downloadCvHtml(doc);
                shareWithKocha(doc);
              }}
              practiceUrl={kochaUrl("export")}
              onPractice={sharesCvs ? () => practice(doc) : undefined}
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
                {overflowing && (
                  <div className="app-page-overflow" role="status">
                    <span>חורג מעמוד אחד בכ־{overflowMm} מ״מ</span>
                    <Button variant="secondary" onClick={askToFit} disabled={waiting}>
                      קצרו לעמוד אחד
                    </Button>
                  </div>
                )}
                <div className="app-page-cv-nav">
                  {stage > 1 && (
                    <Button variant="secondary" onClick={() => setStage(stage - 1)}>
                      חזרה
                    </Button>
                  )}
                  <Button onClick={() => setStage(stage + 1)}>הבא</Button>
                </div>
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
                  <Drawer title="טיפים לשיפור" count={(tips?.strengths?.length ?? 0) + jobFit.length} placement="top">
                    {tips?.target && (
                      <p className="app-page-prep-target" dir="auto">
                        משרה: {tips.target}
                      </p>
                    )}
                    {tips ? (
                      <PrepPoints
                        strengths={tips.strengths}
                        jobFit={jobFit}
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
                  <CvDocumentView doc={doc} onOverflow={setOverflowMm} />
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
                  {waiting && <TypingIndicator {...progressText(messages[messages.length - 1].progress)} />}
                </div>
              </div>
              <ChatInput onSend={send} busy={waiting} />
            </Block>
          </section>
        </>
      )}
      <footer className="app-page-footer">
        <p className="app-page-footer-pitch">
          כשתגיעו לראיון תהיו מוכנים אם תתאמנו עם{" "}
          <a href={kochaUrl("footer")} target="_blank" rel="noopener">
            קוֹחָה
          </a>
        </p>
        {messages.length > 0 && (
          <div className="app-page-reset">
            {confirmReset ? (
              <div role="group" aria-label="התחלה מחדש" className="app-page-reset-confirm">
                <span>למחוק את השיחה ואת קורות החיים ולהתחיל מחדש?</span>
                <Button variant="secondary" onClick={startOver}>
                  כן, להתחיל מחדש
                </Button>
                <Button onClick={() => setConfirmReset(false)}>ביטול</Button>
              </div>
            ) : (
              <button type="button" className="app-page-reset-link" onClick={() => setConfirmReset(true)}>
                התחלה מחדש
              </button>
            )}
          </div>
        )}
      </footer>
    </main>
  );
}
