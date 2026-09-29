import { useId } from "react";

// A CV as an outline: sections (e.g. work experience) -> entries (e.g. a company) -> bullets.
export type OutlineEntry = { title: string; meta?: string; bullets: string[] };
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
      {section.entries.map((e) => (
        <div key={e.title} className="ds-outline-entry">
          <div className="ds-outline-head">
            <strong>{e.title}</strong>
            {e.meta && <bdi className="ds-outline-meta">{e.meta}</bdi>}
          </div>
          {e.bullets.length > 0 && (
            <ul>
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}
