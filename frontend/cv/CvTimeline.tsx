import type { ReactNode } from "react";
import { contactItems, type CvProps, Dates, Joined, Page } from "./parts";

// 1. Timeline: dates in a narrow start column, entries hang off a vertical line with a dot each.
function Item({ dates, children }: { dates: string; children: ReactNode }) {
  return (
    <section className="cv-tl-item">
      <Dates>{dates}</Dates>
      <div className="cv-tl-body">{children}</div>
    </section>
  );
}

export function CvTimeline({ cv, palette = "Slate", typography = "Modern" }: CvProps) {
  return (
    <Page variant="timeline" palette={palette} typography={typography}>
      <header>
        <h1>{cv.name}</h1>
        <p className="cv-title">{cv.title}</p>
        <p className="cv-meta">
          <Joined items={contactItems(cv.contact)} sep="  ·  " />
        </p>
      </header>
      <p className="cv-summary">{cv.summary}</p>

      <h2>Experience</h2>
      {cv.experience.map((j) => (
        <Item key={j.company} dates={j.dates}>
          <strong>{j.role}</strong>
          <div className="cv-meta">
            {j.company} · {j.location}
          </div>
          <ul>
            {j.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Item>
      ))}

      <h2>Education &amp; Military Service</h2>
      {cv.education.map((e) => (
        <Item key={e.degree} dates={e.dates}>
          <strong>{e.degree}</strong>
          <div className="cv-meta">{e.school}</div>
        </Item>
      ))}
      <Item dates={cv.military.dates}>
        <strong>{cv.military.role}</strong>
        <div className="cv-meta">{cv.military.unit}</div>
      </Item>

      <h2>Skills</h2>
      <dl className="cv-skills">
        {cv.skills.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>
              <bdi>{s.items}</bdi>
            </dd>
          </div>
        ))}
      </dl>
    </Page>
  );
}
