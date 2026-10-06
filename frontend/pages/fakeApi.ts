import type { Api, Snapshot, ThreadItem } from "../api";
import { PREP_SAMPLES } from "../components/prepPointsSample";
import { SAMPLE_CV } from "../cv/data";

// A server stand-in for stories: fixed messages; sends are accepted and dropped.
export function fakeApi(messages: ThreadItem[]): Api {
  const snapshot: Snapshot = { backend: "fake", messages };
  return { load: async () => snapshot, send: async () => {}, sendIntake: async () => {} };
}

const ts = "2026-10-05T09:00:00.000Z";
const reply = (id: string, text: string, extra = {}) => ({ id, ts, text, by: "fake", ...extra });

// After the intake: kocha's first version with a CV and tips, then one chat turn.
export const SAMPLE_THREAD: ThreadItem[] = [
  {
    id: "1",
    ts,
    text: "תפקיד מבוקש: Senior Backend Engineer\nצירפתי את תיאור המשרה.\nקורות חיים: cv.pdf",
    intake: { role: "Senior Backend Engineer", jobDescription: "…", consent: true, cvFile: "uploads/1.pdf" },
    reply: reply("1", "קראתי. הנה גרסה ראשונה, ובטיפים יש כמה דברים שכדאי להכין.", {
      cv: { data: SAMPLE_CV },
      tips: { profile: { seniority: "senior", track: "hands-on" }, ...PREP_SAMPLES["senior/hands-on"] },
    }),
  },
  {
    id: "2",
    ts,
    text: "אפשר לקצר את התקציר?",
    reply: reply("2", "קיצרתי לשני משפטים."),
  },
];

// Like SAMPLE_THREAD, but the CV is too long for one page (design stage shows the overflow notice).
const longCv = {
  ...SAMPLE_CV,
  experience: [1, 2, 3].flatMap((n) => SAMPLE_CV.experience!.map((j) => ({ ...j, company: `${j.company} ${n}` }))),
};
export const OVERFLOW_THREAD: ThreadItem[] = [
  { ...SAMPLE_THREAD[0], reply: { ...SAMPLE_THREAD[0].reply!, cv: { data: longCv } } },
];
