import type { ReactNode } from "react";
import { Bullets, contactItems, type CvProps, Dates, has, inOrder, joined, Page } from "./parts";

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

function Entry({ head, sub, dates, children }: { head: string; sub?: string; dates?: string; children?: ReactNode }) {
  return (
    <div className="cv-lg-entry">
      <div className="cv-row">
        <strong>{head}</strong>
        {dates && <Dates>{dates}</Dates>}
      </div>
      {sub && <div className="cv-meta">{sub}</div>}
      {children}
    </div>
  );
}

export function CvLedger({ cv, palette = "Slate", typography = "Bricolage" }: CvProps) {
  const contact = contactItems(cv.contact);
  return (
    <Page variant="ledger" palette={palette} typography={typography}>
      <header>
        <h1>{cv.name}</h1>
        {cv.title && <p className="cv-title">{cv.title}</p>}
        {cv.summary && <p className="cv-summary">{cv.summary}</p>}
        {has(contact) && (
          <p className="cv-contact">
            {contact.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </p>
        )}
      </header>

      {inOrder(cv, {
        experience: has(cv.experience) && (
          <Section title="Experience">
            {cv.experience.map((j) => (
              <Entry key={j.company + j.role} head={j.role} sub={joined(j.company, j.location)} dates={j.dates}>
                <Bullets items={j.bullets} />
              </Entry>
            ))}
          </Section>
        ),
        sections: cv.sections?.filter((s) => has(s.entries)).map((s) => (
          <Section key={s.title} title={s.title}>
            {s.entries.map((e) => (
              <Entry key={e.head} head={e.head} sub={e.sub} dates={e.dates}>
                <Bullets items={e.bullets} />
              </Entry>
            ))}
          </Section>
        )),
        education: has(cv.education) && (
          <Section title="Education">
            {cv.education.map((e) => (
              <Entry key={e.degree} head={e.degree} sub={e.school} dates={e.dates} />
            ))}
          </Section>
        ),
        military: cv.military && (
          <Section title="Military Service">
            <Entry head={cv.military.role} sub={cv.military.unit} dates={cv.military.dates} />
          </Section>
        ),
        skills: has(cv.skills) && (
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
        ),
      })}
    </Page>
  );
}
