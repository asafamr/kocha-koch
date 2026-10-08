import type { PrepPoint, PrepStrength } from "./components/PrepPoints";
import type { Seniority, Track } from "./components/prepPointsSample";
import type { CvData } from "./cv/data";
import type { CvPatch, CvTheme } from "./cv/document";
import type { ConsentPurpose } from "../src/consent";
import type { ThreadItem } from "../src/store";

export type { ThreadItem };
export type Snapshot = { backend: string; handoff?: boolean; messages: ThreadItem[] }; // handoff: the consent box is shown
export type IntakeForm = { cv: File; role: string; jobDescription: string; consents: ConsentPurpose[] };

// The app talks to the server only through this, so stories can pass a fake.
export type Api = {
  load(): Promise<Snapshot>;
  send(text: string, context?: string): Promise<void>; // context: hidden layout report for the model (cv/layoutReport.ts)
  sendIntake(intake: IntakeForm): Promise<void>;
  pdf(html: string): Promise<Blob>; // self-contained CV HTML (cv/exportHtml.ts) -> PDF
  reset(): Promise<void>; // start over: the server archives the conversation
  handoff(body: { document: unknown; html: string }): Promise<string>; // kocha.co.il join link with the CVs (src/kocha.ts)
};

export const httpApi: Api = {
  async load() {
    const res = await fetch("/api/messages");
    if (!res.ok) throw new Error(`load failed: ${res.status}`);
    return res.json();
  },
  async send(text, context) {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text, context }),
    });
    if (!res.ok) throw new Error(`send failed: ${res.status}`);
  },
  async sendIntake({ cv, role, jobDescription, consents }) {
    const form = new FormData();
    form.set("cv", cv);
    form.set("role", role);
    form.set("jobDescription", jobDescription);
    form.set("consents", JSON.stringify(consents));
    const res = await fetch("/api/intake", { method: "POST", body: form });
    if (!res.ok) throw new Error(`intake failed: ${res.status}`);
  },
  async pdf(html) {
    const res = await fetch("/api/pdf", { method: "POST", headers: { "content-type": "text/html" }, body: html });
    if (!res.ok) throw new Error(`pdf failed: ${res.status}`);
    return res.blob();
  },
  async reset() {
    const res = await fetch("/api/reset", { method: "POST" });
    if (!res.ok) throw new Error(`reset failed: ${res.status}`);
  },
  async handoff(body) {
    const res = await fetch("/api/handoff", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error(`handoff failed: ${res.status}`);
    return ((await res.json()) as { url: string }).url;
  },
};

// What a reply may carry besides text (written by the agent, so read defensively).
export type ReplyCv = { data?: CvData; patch?: CvPatch; theme?: Partial<CvTheme> };
export type ReplyTips = {
  profile?: { seniority: Seniority; track: Track };
  target?: string;
  strengths?: PrepStrength[];
  jobFit?: PrepPoint[];
  points?: PrepPoint[];
};

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const isPoint = (p: unknown): p is PrepPoint =>
  isObj(p) && typeof p.id === "string" && typeof p.question === "string" && typeof p.prepare === "string";

export function readCv(v: unknown): ReplyCv | null {
  if (!isObj(v)) return null;
  const out: ReplyCv = {};
  if (isObj(v.data) && typeof v.data.name === "string") out.data = v.data as CvData; // only the name is required
  if (isObj(v.patch)) out.patch = v.patch as CvPatch;
  if (isObj(v.theme)) out.theme = v.theme as Partial<CvTheme>;
  return out.data || out.patch || out.theme ? out : null;
}

export function readTips(v: unknown): ReplyTips | null {
  if (!isObj(v)) return null;
  return {
    profile: isObj(v.profile) ? (v.profile as ReplyTips["profile"]) : undefined,
    target: typeof v.target === "string" ? v.target : undefined,
    strengths: Array.isArray(v.strengths) ? v.strengths.filter((s): s is PrepStrength => isObj(s) && typeof s.text === "string") : [],
    jobFit: Array.isArray(v.jobFit) ? v.jobFit.filter(isPoint) : [],
    points: Array.isArray(v.points) ? v.points.filter(isPoint) : [],
  };
}
