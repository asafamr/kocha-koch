import type { PrepPoint, PrepStrength } from "./components/PrepPoints";
import type { Seniority, Track } from "./components/prepPointsSample";
import type { CvData } from "./cv/data";
import type { CvPatch, CvTheme } from "./cv/document";
import type { ThreadItem } from "../src/store";

export type { ThreadItem };
export type Snapshot = { backend: string; messages: ThreadItem[] };
export type IntakeForm = { cv: File; role: string; jobDescription: string; consent: boolean };

// The app talks to the server only through this, so stories can pass a fake.
export type Api = {
  load(): Promise<Snapshot>;
  send(text: string): Promise<void>;
  sendIntake(intake: IntakeForm): Promise<void>;
  pdf(html: string): Promise<Blob>; // self-contained CV HTML (cv/exportHtml.ts) -> PDF
};

export const httpApi: Api = {
  async load() {
    const res = await fetch("/api/messages");
    if (!res.ok) throw new Error(`load failed: ${res.status}`);
    return res.json();
  },
  async send(text) {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error(`send failed: ${res.status}`);
  },
  async sendIntake({ cv, role, jobDescription, consent }) {
    const form = new FormData();
    form.set("cv", cv);
    form.set("role", role);
    form.set("jobDescription", jobDescription);
    form.set("consent", String(consent));
    const res = await fetch("/api/intake", { method: "POST", body: form });
    if (!res.ok) throw new Error(`intake failed: ${res.status}`);
  },
  async pdf(html) {
    const res = await fetch("/api/pdf", { method: "POST", headers: { "content-type": "text/html" }, body: html });
    if (!res.ok) throw new Error(`pdf failed: ${res.status}`);
    return res.blob();
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
