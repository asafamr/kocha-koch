import { utmTags } from "./utm";
import type { PrepPoint, PrepStrength } from "./components/PrepPoints";
import type { Seniority, Track } from "./components/prepPointsSample";
import type { CvData } from "./cv/data";
import type { CvPatch, CvTheme } from "./cv/document";
import type { ConsentPurpose } from "../src/consent";
import type { ThreadItem } from "../src/store";
import { INTAKE_CODES, type IntakeCode } from "../src/cvFile";

export type { ThreadItem };
export type Snapshot = { backend: string; handoff?: boolean; ga?: string; messages: ThreadItem[] }; // handoff: the consent box is shown; ga: Google Analytics id, if any
// A thread item as saved in the browser and sent to POST /api/restore: no ids, no server-only fields.
export type SavedItem = {
  text: string;
  ts: string;
  hidden?: boolean;
  intake?: { role: string; jobDescription: string; consents: { purpose: ConsentPurpose; version: string; grantedAt: string }[]; utm?: Record<string, string> };
  reply?: { text: string; ts: string; cv?: unknown; tips?: unknown };
};
export type IntakeForm = { cv: File; role: string; jobDescription: string; consents: ConsentPurpose[] };

// The app talks to the server only through this, so stories can pass a fake.
export type Api = {
  load(): Promise<Snapshot>;
  send(text: string, context?: string, hidden?: boolean): Promise<void>; // context: hidden layout report for the model (cv/layoutReport.ts); hidden: an automatic fit request, not shown in the chat
  sendIntake(intake: IntakeForm): Promise<void>;
  pdf(html: string): Promise<Blob>; // self-contained CV HTML (cv/exportHtml.ts) -> PDF
  reset(): Promise<void>; // start over: the server archives the conversation
  restore(thread: SavedItem[], pdf: Blob | null): Promise<void>; // hosted app: rebuild a conversation the server forgot from the copy saved in this browser (src/restore.ts)
  handoff(body: { document: unknown; html: string; consents?: ConsentPurpose[] }): Promise<string>; // kocha.co.il join link with the CVs (src/kocha.ts)
};

export class RateLimited extends Error {}
export type IntakeErrorCode = IntakeCode | "generic";
export class IntakeError extends Error {
  constructor(readonly code: IntakeErrorCode) {
    super(`intake rejected: ${code}`);
  }
}
async function intakeCode(res: Response): Promise<IntakeErrorCode> {
  const body: unknown = await res.json().catch(() => null);
  const code = typeof body === "object" && body !== null && "code" in body ? body.code : undefined;
  const known = INTAKE_CODES.find((c) => c === code);
  return known ?? (res.status === 413 ? "too_large" : "generic"); // the server's own body limit answers 413 without a body
}
const check = (res: Response, what: string) => {
  if (res.status === 429) throw new RateLimited(what);
  if (!res.ok) throw new Error(`${what} failed: ${res.status}`);
};

export const httpApi: Api = {
  async load() {
    const res = await fetch("/api/messages");
    if (!res.ok) throw new Error(`load failed: ${res.status}`);
    return res.json();
  },
  async send(text, context, hidden) {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text, context, hidden }),
    });
    check(res, "send");
  },
  async sendIntake({ cv, role, jobDescription, consents }) {
    const form = new FormData();
    form.set("cv", cv);
    form.set("role", role);
    form.set("jobDescription", jobDescription);
    form.set("consents", JSON.stringify(consents));
    form.set("utm", JSON.stringify(utmTags()));
    const res = await fetch("/api/intake", { method: "POST", body: form });
    if ([400, 413, 502].includes(res.status)) throw new IntakeError(await intakeCode(res));
    check(res, "intake");
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
  async restore(thread, pdf) {
    const form = new FormData();
    form.set("thread", JSON.stringify(thread));
    if (pdf) form.set("cv", pdf, "cv.pdf");
    check(await fetch("/api/restore", { method: "POST", body: form }), "restore");
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
