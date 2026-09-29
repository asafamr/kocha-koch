import type { ReactNode } from "react";
import { type CvProps, Dates, Ltr, Page } from "./parts";

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

export function CvBars({ cv, palette = "Ink", typography = "Literata" }: CvProps) {
  return (
    <Page variant="bars" palette={palette} typography={typography}>
      <header className="cv-row">
        <div>
          <h1>{cv.name}</h1>
          <p className="cv-title">{cv.title}</p>
        </div>
        <div className="cv-contact">
          <span>{cv.contact.city}</span>
          <Ltr>{cv.contact.phone}</Ltr>
          <Ltr>{cv.contact.email}</Ltr>
          <Ltr>{cv.contact.linkedin}</Ltr>
        </div>
      </header>

      <Section title="Summary">
        <p>{cv.summary}</p>
      </Section>

      <Section title="Experience">
        {cv.experience.map((j) => (
          <div key={j.company} className="cv-entry">
            <div className="cv-row">
              <span>
                <strong>{j.role}</strong> | {j.company}, {j.location}
              </span>
              <Dates>{j.dates}</Dates>
            </div>
            <ul>
              {j.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Education">
        {cv.education.map((e) => (
          <div key={e.degree} className="cv-row">
            <span>
              <strong>{e.degree}</strong> | {e.school}
            </span>
            <Dates>{e.dates}</Dates>
          </div>
        ))}
      </Section>

      <Section title="Military Service">
        <div className="cv-row">
          <span>
            <strong>{cv.military.role}</strong> | {cv.military.unit}
          </span>
          <Dates>{cv.military.dates}</Dates>
        </div>
      </Section>

      <Section title="Skills">
        {cv.skills.map((s) => (
          <p key={s.label}>
            <strong>{s.label}:</strong> <bdi>{s.items}</bdi>
          </p>
        ))}
      </Section>
    </Page>
  );
}
