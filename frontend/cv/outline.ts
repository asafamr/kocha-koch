import type { OutlineSection } from "../components/CvOutline";
import { type CvData, type SectionKey, sectionOrder } from "./data";

// The fine-tuning view of a CV: the same structured data, as plain sections -> entries -> bullets.
// Section names are UI labels (Hebrew); entry text stays in the CV's own language. No dates.
// Sections the CV does not have are left out; the rest follow cv.order like the templates.
export function cvToOutline(cv: CvData): OutlineSection[] {
  const line = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(" — ");
  const blocks: Record<SectionKey, OutlineSection[]> = {
    experience: [
      { title: "ניסיון תעסוקתי", entries: (cv.experience ?? []).map((j) => ({ title: line(j.company, j.role), bullets: j.bullets })) },
    ],
    sections: (cv.sections ?? []).map((s) => ({
      title: s.title, // the CV's own heading, in English
      entries: s.entries.map((e) => ({ title: line(e.head, e.sub), bullets: e.bullets ?? [] })),
    })),
    education: [{ title: "השכלה", entries: (cv.education ?? []).map((e) => ({ title: line(e.school, e.degree), bullets: [] })) }],
    military: [{ title: "שירות צבאי", entries: cv.military ? [{ title: line(cv.military.unit, cv.military.role), bullets: [] }] : [] }],
    skills: [{ title: "כישורים", entries: (cv.skills ?? []).map((s) => ({ title: s.label, bullets: s.items.split(/,\s*/) })) }],
  };
  const summary: OutlineSection = { title: "תקציר", entries: cv.summary ? [{ title: cv.summary, bullets: [] }] : [] };
  return [summary, ...sectionOrder(cv).flatMap((k) => blocks[k])].filter((s) => s.entries.length > 0);
}
