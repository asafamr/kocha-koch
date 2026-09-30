import { renderCvDocument, type CvDocument } from "./document";
import { TYPOGRAPHY } from "./theme";

// Export a CvDocument as one self-contained HTML file: the patched page, the CV CSS rules from
// the loaded stylesheets, and only the fonts its typography uses, embedded as data: URLs.

const familyNames = (stack: string) => stack.split(",").map((f) => f.trim().replace(/^["']|["']$/g, ""));

async function toDataUrl(url: string): Promise<string> {
  const blob = await (await fetch(url)).blob();
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

async function inlineUrls(cssText: string, base: string): Promise<string> {
  const urls = [...cssText.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)].map((m) => m[1]);
  for (const u of urls) {
    if (u.startsWith("data:")) continue;
    cssText = cssText.replace(u, await toDataUrl(new URL(u, base).href));
  }
  return cssText;
}

async function cvCss(doc: CvDocument): Promise<string> {
  const t = TYPOGRAPHY[doc.theme.typography];
  const fonts = new Set([...familyNames(t.body), ...familyNames(t.display), ...familyNames(t.heading)]);
  const out: string[] = [];
  for (const sheet of [...document.styleSheets]) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin sheet
    }
    const base = sheet.href ?? location.href;
    for (const rule of [...rules]) {
      if (rule instanceof CSSFontFaceRule) {
        const family = rule.style.getPropertyValue("font-family").replace(/["']/g, "").trim();
        if (fonts.has(family)) out.push(await inlineUrls(rule.cssText, base));
      } else if (rule instanceof CSSStyleRule && /\.cv\b|\.cv-/.test(rule.selectorText)) {
        out.push(rule.cssText);
      }
    }
  }
  return out.join("\n");
}

export async function cvHtmlFile(doc: CvDocument): Promise<string> {
  const { html } = renderCvDocument(doc);
  const css = await cvCss(doc);
  return `<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${doc.data.name.replace(/[<&]/g, "")} — CV</title>
<style>
@page { size: A4; margin: 0; }
body { margin: 0; background: #fff; }
${css}
</style>
</head>
<body><div class="cv-doc">${html}</div></body>
</html>
`;
}

export async function downloadCvHtml(doc: CvDocument) {
  const file = await cvHtmlFile(doc);
  const url = URL.createObjectURL(new Blob([file], { type: "text/html" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${doc.data.name.replace(/\s+/g, "-")}-CV.html`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
