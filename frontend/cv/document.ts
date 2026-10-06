import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { CvData } from "./data";
import { TEMPLATES, type TemplateName } from "./templates";
import type { PaletteName, TypographyName } from "./theme";

// A CV is three layers, so an AI can iterate on each separately:
//   1. data   — structured content (what the CV says)
//   2. theme  — template, palette and typography choices (how it looks)
//   3. patch  — edits applied to the full rendered document last (anything the first two can't express)
// renderCvDocument() runs render -> parse -> patch ops -> sanitize -> patch CSS, and reports ops
// that matched nothing so the AI can correct its selectors. Needs a DOM (browser or headless Chromium).

export type CvTheme = { template: TemplateName; palette: PaletteName; typography: TypographyName };

export type DomOp =
  | { op: "setText"; selector: string; text: string }
  | { op: "setHtml"; selector: string; html: string }
  | { op: "remove"; selector: string }
  | { op: "insert"; selector: string; position: "before" | "after" | "prepend" | "append"; html: string }
  | { op: "setAttr"; selector: string; name: string; value: string }
  | { op: "setStyle"; selector: string; style: string }; // appended to the element's inline style

export type CvPatch = {
  css?: string; // scoped to the CV page: rules are nested under .cv-doc
  ops?: DomOp[]; // applied in order to every element each selector matches
  // Made for one template (e.g. spacing to fit the page): applied only while it is selected.
  template?: TemplateName;
};

export type CvDocument = { data: CvData; theme: CvTheme; patch?: CvPatch };

export type RenderResult = { html: string; warnings: string[] };

const INSERT_POSITION = { before: "beforebegin", after: "afterend", prepend: "afterbegin", append: "beforeend" } as const;

export function renderCvDocument(doc: CvDocument): RenderResult {
  const Template = TEMPLATES[doc.theme.template];
  const markup = renderToStaticMarkup(
    createElement(Template, { cv: doc.data, palette: doc.theme.palette, typography: doc.theme.typography }),
  );
  const root = document.createElement("div");
  root.innerHTML = markup;
  annotate(root, doc.data);
  const patch = doc.patch?.template && doc.patch.template !== doc.theme.template ? undefined : doc.patch;
  const warnings = applyOps(root, patch?.ops ?? []);
  sanitize(root);
  const css = patch?.css?.trim();
  const style = css ? `<style>.cv-doc{${sanitizeCss(css)}}</style>` : "";
  return { html: style + root.innerHTML, warnings };
}

// Stable hooks for patch selectors, the same in every template, found from the data itself:
//   [data-cv="name"|"title"|"summary"], [data-cv-section="experience"|"education"|"military"|"skills"|"contact"],
//   [data-cv-section="other.N"] (heading of data.sections[N]),
//   [data-cv-job="J"] (a job's container), [data-cv-bullet="J.B"] (bullet B of job J).
// A section the CV does not have has no heading, so its hook matches nothing.
const SECTION_KEYS: [RegExp, string][] = [
  [/experience/i, "experience"],
  [/education/i, "education"],
  [/military|service/i, "military"],
  [/skill/i, "skills"],
  [/contact/i, "contact"],
];

export function annotate(root: HTMLElement, data: CvData) {
  const text = (el: Element) => el.textContent?.replace(/\s+/g, " ").trim() ?? "";
  // Innermost element whose whole text equals `value` (optionally skipping job entries).
  const exact = (value: string, outsideJobs = false) =>
    [...root.querySelectorAll("*")]
      .reverse()
      .find((el) => text(el) === value.replace(/\s+/g, " ").trim() && !(outsideJobs && el.closest("[data-cv-job]")));

  const others = (data.sections ?? []).map((s) => s.title.replace(/\s+/g, " ").trim());
  root.querySelectorAll("h2").forEach((h) => {
    // Other sections first, so e.g. "Volunteer Service" is not taken for military service.
    const other = others.indexOf(text(h));
    const hit = SECTION_KEYS.find(([re]) => re.test(text(h)));
    if (other >= 0) h.setAttribute("data-cv-section", `other.${other}`);
    else if (hit) h.setAttribute("data-cv-section", hit[1]);
  });

  // Jobs first, so the headline title is not confused with a job role of the same text.
  (data.experience ?? []).forEach((job, j) => {
    const bullets = job.bullets.map((b) => exact(b));
    bullets.forEach((el, b) => el?.setAttribute("data-cv-bullet", `${j}.${b}`));
    // The job container: smallest ancestor of its first bullet that also holds the role text.
    let el = bullets[0]?.parentElement ?? null;
    while (el && el !== root && !text(el).includes(job.role)) el = el.parentElement;
    if (el && el !== root) el.setAttribute("data-cv-job", String(j));
  });

  const mark = (value: string | undefined, key: string) => value && exact(value, true)?.setAttribute("data-cv", key);
  mark(data.name, "name");
  mark(data.title, "title");
  mark(data.summary, "summary");
}

// Apply patch ops to a subtree. Returns one warning per op that matched nothing or failed.
export function applyOps(root: ParentNode, ops: DomOp[]): string[] {
  const warnings: string[] = [];
  ops.forEach((o, i) => {
    let targets: Element[];
    try {
      targets = [...root.querySelectorAll(o.selector)];
    } catch {
      warnings.push(`op ${i} (${o.op}): invalid selector "${o.selector}"`);
      return;
    }
    if (targets.length === 0) {
      warnings.push(`op ${i} (${o.op}): selector "${o.selector}" matched nothing`);
      return;
    }
    for (const el of targets) {
      switch (o.op) {
        case "setText": el.textContent = o.text; break;
        case "setHtml": el.innerHTML = o.html; break;
        case "remove": el.remove(); break;
        case "insert": el.insertAdjacentHTML(INSERT_POSITION[o.position], o.html); break;
        case "setAttr": el.setAttribute(o.name, o.value); break;
        case "setStyle": el.setAttribute("style", `${el.getAttribute("style") ?? ""};${o.style}`); break;
      }
    }
  });
  return warnings;
}

// Patches come from an AI: drop anything executable or that can load remote content.
const BLOCKED_TAGS = "script, iframe, object, embed, link, meta, base, form, style";
function sanitize(root: HTMLElement) {
  root.querySelectorAll(BLOCKED_TAGS).forEach((el) => el.remove());
  root.querySelectorAll("*").forEach((el) => {
    for (const { name, value } of [...el.attributes]) {
      const v = value.trim().toLowerCase();
      const badHref = (name === "href" || name === "xlink:href") && !/^(https?:|mailto:|tel:|#|data:)/.test(v);
      const badSrc = name === "src" && !v.startsWith("data:");
      if (name.startsWith("on") || badHref || badSrc) el.removeAttribute(name);
    }
  });
}

function sanitizeCss(css: string) {
  return css
    .replace(/@import[^;]*;?/gi, "")
    .replace(/url\(\s*(['"]?)(?!data:)[^)]*\)/gi, "none")
    .replace(/<\/?style[^>]*>/gi, "");
}
