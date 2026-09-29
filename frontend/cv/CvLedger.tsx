import type { ReactNode } from "react";
import { type CvProps, Dates, Ltr, Page } from "./parts";

// 1. Ledger: a two-column grid. Section headings hang in a narrow label column at the start;
// entries sit in the wide column with dates at the end of the first line. No ornaments.
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="cv-lg-section">
      <h2>{title}</h2>
      <div className="cv-lg-body">{children}</div>
    </section>
  );
}

function Entry({ head, sub, dates, children }: { head: string; sub: string; dates: string; children?: ReactNode }) {
  return (
    <div className="cv-lg-entry">
      <div className="cv-row">
        <strong>{head}</strong>
        <Dates>{dates}</Dates>
      </div>
      <div className="cv-meta">{sub}</div>
      {children}
    </div>
  );
}

export function CvLedger({ cv, palette = "Slate", typography = "Bricolage" }: CvProps) {
  const c = cv.contact;
  return (
    <Page variant="ledger" palette={palette} typography={typography}>
      <header>
        <h1>{cv.name}</h1>
        <p className="cv-title">{cv.title}</p>
        <p className="cv-summary">{cv.summary}</p>
        <p className="cv-contact">
          <span>{c.city}</span>
          <Ltr>{c.phone}</Ltr>
          <Ltr>{c.email}</Ltr>
          <Ltr>{c.linkedin}</Ltr>
        </p>
      </header>

      <Section title="Experience">
        {cv.experience.map((j) => (
          <Entry key={j.company} head={j.role} sub={`${j.company}, ${j.location}`} dates={j.dates}>
            <ul>
              {j.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Entry>
        ))}
      </Section>

      <Section title="Education">
        {cv.education.map((e) => (
          <Entry key={e.degree} head={e.degree} sub={e.school} dates={e.dates} />
        ))}
      </Section>

      <Section title="Military Service">
        <Entry head={cv.military.role} sub={cv.military.unit} dates={cv.military.dates} />
      </Section>

      <Section title="Skills">
        <dl className="cv-lg-skills">
          {cv.skills.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>
                <bdi>{s.items}</bdi>
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </Page>
  );
}
