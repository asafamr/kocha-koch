import { useId } from "react";

// A CV as plain structured content for the fine-tuning stage: sections -> entries -> bullets.
// No dates or layout styling here; those belong to the design stage. Items use dir="auto", so
// English content reads LTR inside the Hebrew UI.
export type OutlineEntry = { title: string; bullets: string[] };
export type OutlineSection = { title: string; entries: OutlineEntry[] };

export function CvOutline({ sections }: { sections: OutlineSection[] }) {
  return (
    <div className="ds-outline">
      {sections.map((s) => (
        <OutlineSectionView key={s.title} section={s} />
      ))}
    </div>
  );
}

function OutlineSectionView({ section }: { section: OutlineSection }) {
  const id = useId();
  return (
    <section aria-labelledby={id}>
      <h3 id={id} className="ds-outline-title">
        {section.title}
      </h3>
      <ul className="ds-outline-entries">
        {section.entries.map((e) => (
          <li key={e.title} dir="auto">
            {e.title}
            {e.bullets.length > 0 && (
              <ul>
                {e.bullets.map((b) => (
                  <li key={b} dir="auto">{b}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
