# CV document format

A CV is three layers, so an AI can iterate on each one separately. Code: `frontend/cv/document.ts`.

```ts
type CvDocument = {
  data: CvData;                 // 1. what the CV says (frontend/cv/data.ts)
  theme: {                      // 2. how it looks
    template: "Ledger" | "Sidebar" | "Bars" | "Compact" | "Lede" | "Margin";
    palette: "Ink" | "Slate" | "Cobalt" | "Vermilion" | "Mulberry" | "Ochre" | "Iris" | "Lichen" | "Umber" | "Petrol";
    typography: "Bricolage" | "Literata" | "Newsreader" | "Schibsted" | "Editorial";
  };
  patch?: {                     // 3. edits to the full rendered page, applied last
    css?: string;               // nested under .cv-doc, so it only affects the CV
    ops?: DomOp[];              // applied in order, to every element each selector matches
  };
};

type DomOp =
  | { op: "setText"; selector: string; text: string }
  | { op: "setHtml"; selector: string; html: string }
  | { op: "remove"; selector: string }
  | { op: "insert"; selector: string; position: "before" | "after" | "prepend" | "append"; html: string }
  | { op: "setAttr"; selector: string; name: string; value: string }
  | { op: "setStyle"; selector: string; style: string };   // appended to the inline style
```

## Which layer to change

1. **Content** (wording, bullets, order of jobs): change `data`. It flows into every template.
2. **Look** (layout, colors, fonts): change `theme`.
3. **Only what 1 and 2 cannot express** (an extra line, a one-off spacing fix, hiding one item in
   one template): add a `patch`. Keep patches small; a template switch keeps working only if
   selectors use the stable hooks below.

## Stable hooks for selectors

Added to the rendered page in every template, found from the data:

| Selector | Element |
|---|---|
| `[data-cv="name"]`, `[data-cv="title"]`, `[data-cv="summary"]` | name, headline title, summary (only if the template shows them) |
| `[data-cv-section="experience"]` (also `education`, `military`, `skills`, `contact`) | the section's heading (`h2`) |
| `[data-cv-job="0"]` | the container of job 0 (role, company, dates, bullets) |
| `[data-cv-bullet="0.2"]` | bullet 2 of job 0 |

Rendering returns a warning for every op whose selector matched nothing, e.g.
`op 0 (setText): selector "[data-cv="summary"]" matched nothing` (the Compact template has no
summary). Send these back to the AI so it can fix the patch.

## Sanitizing

Patches come from an AI, so after the ops run the renderer removes `script`, `iframe`, `object`,
`embed`, `link`, `meta`, `base`, `form` and `style` elements, every `on*` attribute, `href` values
other than `http(s):`, `mailto:`, `tel:`, `#` and `data:`, and `src` values other than `data:`.
In `css`, `@import` and non-`data:` `url(...)` are removed.

## Example

```json
{
  "theme": { "template": "Ledger", "palette": "Cobalt", "typography": "Schibsted" },
  "patch": {
    "css": ".cv-meta { font-style: italic; }",
    "ops": [
      { "op": "setText", "selector": "[data-cv=\"summary\"]", "text": "Full stack developer who ships measurable wins." },
      { "op": "insert", "selector": "[data-cv-job=\"0\"] ul", "position": "append", "html": "<li>Cut cloud costs by 25%.</li>" },
      { "op": "remove", "selector": "[data-cv-bullet=\"1.1\"]" }
    ]
  }
}
```

Storybook: **CV Styles → Document (data + theme + patch)** renders this example (with a template
control) and lists the warnings under the page.
