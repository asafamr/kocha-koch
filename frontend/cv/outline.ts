import type { OutlineSection } from "../components/CvOutline";
import type { CvData } from "./data";

// The fine-tuning view of a CV: the same structured data, as plain sections -> entries -> bullets.
// Section names are UI labels (Hebrew); entry text stays in the CV's own language. No dates.
export function cvToOutline(cv: CvData): OutlineSection[] {
  return [
    { title: "תקציר", entries: [{ title: cv.summary, bullets: [] }] },
    {
      title: "ניסיון תעסוקתי",
      entries: cv.experience.map((j) => ({ title: `${j.company} — ${j.role}`, bullets: j.bullets })),
    },
    {
      title: "השכלה",
      entries: cv.education.map((e) => ({ title: `${e.school} — ${e.degree}`, bullets: [] })),
    },
    { title: "שירות צבאי", entries: [{ title: `${cv.military.unit} — ${cv.military.role}`, bullets: [] }] },
    { title: "כישורים", entries: cv.skills.map((s) => ({ title: s.label, bullets: s.items.split(/,\s*/) })) },
  ];
}
