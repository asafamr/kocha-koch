import type { OutlineSection } from "../components/CvOutline";
import type { CvData } from "./data";

// The fine-tuning view of a CV: the same structured data, as plain sections -> entries -> bullets.
// Section names are UI labels (Hebrew); entry text stays in the CV's own language. No dates.
// Sections the CV does not have are left out, in the same order the templates use.
export function cvToOutline(cv: CvData): OutlineSection[] {
  const line = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(" — ");
  const sections: OutlineSection[] = [
    { title: "תקציר", entries: cv.summary ? [{ title: cv.summary, bullets: [] }] : [] },
    {
      title: "ניסיון תעסוקתי",
      entries: (cv.experience ?? []).map((j) => ({ title: line(j.company, j.role), bullets: j.bullets })),
    },
    ...(cv.sections ?? []).map((s) => ({
      title: s.title, // the CV's own heading, in English
      entries: s.entries.map((e) => ({ title: line(e.head, e.sub), bullets: e.bullets ?? [] })),
    })),
    {
      title: "השכלה",
      entries: (cv.education ?? []).map((e) => ({ title: line(e.school, e.degree), bullets: [] })),
    },
    { title: "שירות צבאי", entries: cv.military ? [{ title: line(cv.military.unit, cv.military.role), bullets: [] }] : [] },
    { title: "כישורים", entries: (cv.skills ?? []).map((s) => ({ title: s.label, bullets: s.items.split(/,\s*/) })) },
  ];
  return sections.filter((s) => s.entries.length > 0);
}
