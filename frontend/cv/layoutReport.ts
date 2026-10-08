import type { CvTheme } from "./document";

// What the browser measured on the rendered page, in mm on A4. Sent to the model as hidden
// context (the `context` field of a message) so it can size edits against the real page.
export type Layout = {
  usedMm: number; // lowest content, from the top of the page
  usableMm: number; // page height minus the bottom margin
  sections: { name: string; mm: number }[]; // "header" is everything above the first heading
  bullets: { id: string; lines: number; lastWords: number }[]; // id = data-cv-bullet, "job.bullet"
};

const A4_MM = 297;

// Measures the A4 `page` (an <article>) as rendered; `scale` is the canvas zoom. Call with the page
// at its natural height, so content in stretched boxes is measured where it really ends.
export function measureLayout(page: HTMLElement, scale: number): Layout {
  const fixed = page.offsetHeight; // untransformed px
  const mm = (px: number) => Math.round((px / scale / fixed) * A4_MM * 10) / 10;
  const top = page.getBoundingClientRect().top;
  const usable = fixed - parseFloat(getComputedStyle(page).paddingBlockEnd);

  // Each element without children belongs to the last heading before it; a section spans its elements.
  const groups = new Map<string, { top: number; bottom: number }>();
  let name = "header";
  let lowest = top;
  for (const e of page.querySelectorAll("*")) {
    if (e.tagName === "H2") name = e.getAttribute("data-cv-section") ?? e.textContent?.trim() ?? "section";
    if (e.firstElementChild) continue;
    const r = e.getBoundingClientRect();
    lowest = Math.max(lowest, r.bottom);
    const g = groups.get(name) ?? r;
    groups.set(name, { top: Math.min(g.top, r.top), bottom: Math.max(g.bottom, r.bottom) });
  }

  const bullets = [...page.querySelectorAll("[data-cv-bullet]")].map((el) => ({
    id: el.getAttribute("data-cv-bullet")!,
    ...wrap(el, scale),
  }));

  return {
    usedMm: mm(lowest - top),
    usableMm: mm(usable * scale),
    sections: [...groups].map(([n, g]) => ({ name: n, mm: mm(g.bottom - g.top) })),
    bullets,
  };
}

// Lines of a block of text and the words on the last one, from where each word was laid out.
function wrap(el: Element, scale: number) {
  const tops: number[] = [];
  const range = document.createRange();
  const texts = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let t = texts.nextNode() as Text | null; t; t = texts.nextNode() as Text | null) {
    for (const w of t.data.matchAll(/\S+/g)) {
      range.setStart(t, w.index!);
      range.setEnd(t, w.index! + w[0].length);
      tops.push(range.getBoundingClientRect().top);
    }
  }
  if (tops.length === 0) return { lines: 0, lastWords: 0 };
  const style = getComputedStyle(el);
  const lineGap = 0.5 * (parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2) * scale; // words on one line differ by less
  const last = Math.max(...tops);
  const lines = tops.slice().sort((a, b) => a - b).reduce((n, y, i, all) => (i === 0 || y - all[i - 1] > lineGap ? n + 1 : n), 0);
  return { lines, lastWords: tops.filter((y) => last - y <= lineGap).length };
}

export const overflowOf = (l: Layout) => Math.max(0, Math.round(l.usedMm - l.usableMm));

// The text sent to the model: compact, a few hundred tokens.
export function layoutReport(input: {
  theme: CvTheme;
  layout: Layout;
  droppedPatches: string[]; // templates whose patches are not applied now
  warnings: string[];
}): string {
  const { theme, layout: l } = input;
  const spare = Math.round(l.usableMm - l.usedMm);
  const lines = [
    "Layout of the CV as the user sees it (measured in the browser, mm on A4).",
    `Template ${theme.template}, palette ${theme.palette}, typography ${theme.typography}.`,
    `Page: content ends at ${Math.round(l.usedMm)} mm of ${Math.round(l.usableMm)} mm usable: ${spare >= 0 ? `${spare} mm spare` : `over by ${-spare} mm`}.`,
    `Sections (mm): ${l.sections.map((s) => `${s.name} ${Math.round(s.mm)}`).join(", ")}.`,
  ];
  if (l.bullets.length) {
    lines.push(`Bullets (job.bullet = lines/words on the last line): ${l.bullets.map((b) => `${b.id} = ${b.lines}/${b.lastWords}`).join(", ")}.`);
  }
  if (input.droppedPatches.length) lines.push(`Patches for other templates, not applied: ${input.droppedPatches.join(", ")}.`);
  if (input.warnings.length) lines.push(`Renderer warnings:\n${input.warnings.map((w) => `- ${w}`).join("\n")}`);
  return lines.join("\n");
}
