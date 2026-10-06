import type { ReactNode } from "react";
import { Bullets, contactItems, type CvProps, Dates, has, joined, Page } from "./parts";

// 3. Bars: uppercase section headings on full-width light-gray bars,
// name and title at start with contact stacked at end, dates at the end of each row.
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      <div className="cv-bars-body">{children}</div>
    </section>
  );
}

// "Head | sub" with dates at the end; bullets below when there are any.
function Entry({ head, sub, dates, bullets }: { head: string; sub?: string; dates?: string; bullets?: string[] }) {
  const row = (
    <div className="cv-row">
      <span>
        <strong>{head}</strong>
        {sub && ` | ${sub}`}
      </span>
      {dates && <Dates>{dates}</Dates>}
    </div>
  );
  return has(bullets) ? (
    <div className="cv-entry">
      {row}
      <Bullets items={bullets} />
    </div>
  ) : (
    row
  );
}

export function CvBars({ cv, palette = "Ink", typography = "Literata" }: CvProps) {
  const contact = contactItems(cv.contact);
  return (
    <Page variant="bars" palette={palette} typography={typography}>
      <header className="cv-row">
        <div>
          <h1>{cv.name}</h1>
          {cv.title && <p className="cv-title">{cv.title}</p>}
        </div>
        {has(contact) && (
          <div className="cv-contact">
            {contact.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        )}
      </header>

      {cv.summary && (
        <Section title="Summary">
          <p>{cv.summary}</p>
        </Section>
      )}

      {has(cv.experience) && (
        <Section title="Experience">
          {cv.experience.map((j) => (
            <div key={j.company + j.role} className="cv-entry">
              <div className="cv-row">
                <span>
                  <strong>{j.role}</strong> | {joined(j.company, j.location)}
                </span>
                <Dates>{j.dates}</Dates>
              </div>
              <Bullets items={j.bullets} />
            </div>
          ))}
        </Section>
      )}

      {cv.sections?.filter((s) => has(s.entries)).map((s) => (
        <Section key={s.title} title={s.title}>
          {s.entries.map((e) => (
            <Entry key={e.head} {...e} />
          ))}
        </Section>
      ))}

      {has(cv.education) && (
        <Section title="Education">
          {cv.education.map((e) => (
            <Entry key={e.degree} head={e.degree} sub={e.school} dates={e.dates} />
          ))}
        </Section>
      )}

      {cv.military && (
        <Section title="Military Service">
          <Entry head={cv.military.role} sub={cv.military.unit} dates={cv.military.dates} />
        </Section>
      )}

      {has(cv.skills) && (
        <Section title="Skills">
          {cv.skills.map((s) => (
            <p key={s.label}>
              <strong>{s.label}:</strong> <bdi>{s.items}</bdi>
            </p>
          ))}
        </Section>
      )}
    </Page>
  );
}
