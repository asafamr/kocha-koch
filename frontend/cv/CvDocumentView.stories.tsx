import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";
import { CvDocumentView } from "./CvDocumentView";
import { SAMPLE_CV } from "./data";
import type { CvDocument } from "./document";
import { onDesk } from "./story";
import { TEMPLATES, type TemplateName } from "./templates";

// An example of what an AI would send: data + theme + a patch over the rendered page.
const PATCHED: CvDocument = {
  data: SAMPLE_CV,
  theme: { template: "Ledger", palette: "Cobalt", typography: "Schibsted" },
  patch: {
    css: ".cv-meta { font-style: italic; }",
    ops: [
      { op: "setText", selector: '[data-cv="summary"]', text: "Full stack developer who ships measurable wins: 40% faster pages, 2M events a day, 3 promoted mentees." },
      { op: "insert", selector: '[data-cv-job="0"] ul', position: "append", html: "<li>Cut cloud costs by 25% by moving batch jobs to spot instances.</li>" },
      { op: "remove", selector: '[data-cv-bullet="1.1"]' },
      { op: "setStyle", selector: '[data-cv="name"]', style: "letter-spacing: -0.03em" },
      { op: "setText", selector: ".does-not-exist", text: "shows up as a warning" },
    ],
  },
};

function Demo({ doc, template }: { doc: CvDocument; template?: TemplateName }) {
  const [warnings, setWarnings] = useState<string[]>([]);
  // Memoized: a new object each render would re-render the document and loop via onWarnings.
  const shown = useMemo(() => (template ? { ...doc, theme: { ...doc.theme, template } } : doc), [doc, template]);
  return (
    <div>
      <CvDocumentView doc={shown} onWarnings={setWarnings} />
      <ul lang="en" dir="ltr" className="cv-doc-warnings" aria-label="Patch warnings" style={{ font: "12px monospace", margin: "12px 0 0" }}>
        {warnings.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
    </div>
  );
}

const meta = {
  title: "CV Styles/Document (data + theme + patch)",
  component: Demo,
  argTypes: { template: { control: "select", options: Object.keys(TEMPLATES) } },
  decorators: [onDesk],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Demo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Unpatched: Story = { args: { doc: { data: SAMPLE_CV, theme: PATCHED.theme } } };
export const Patched: Story = { args: { doc: PATCHED } };
