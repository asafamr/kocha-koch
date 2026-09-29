import type { ReactNode } from "react";
import type { CvData } from "./data";
import { contactItems, Dates, Joined, Page } from "./parts";

// 3. Minimalist: light name, gray hanging labels in a narrow start column, lots of white space.
function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="cv-hang">
      <h2>{label}</h2>
      <div>{children}</div>
    </section>
  );
}

export function CvMinimal({ cv }: { cv: CvData }) {
  return (
    <Page variant="minimal">
      <header>
        <h1>{cv.name}</h1>
        <p className="cv-meta">
          <Joined items={contactItems(cv.contact)} sep="   " />
        </p>
      </header>

      <Row label="תקציר">
        <p>{cv.summary}</p>
      </Row>
      <Row label="ניסיון">
        {cv.experience.map((j) => (
          <div key={j.company} className="cv-entry">
            <div className="cv-row">
              <span>
                <strong>{j.role}</strong>, {j.company}
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
      </Row>
      <Row label="השכלה">
        {cv.education.map((e) => (
          <div key={e.degree} className="cv-row">
            <span>
              {e.degree}, {e.school}
            </span>
            <Dates>{e.dates}</Dates>
          </div>
        ))}
      </Row>
      <Row label="שירות צבאי">
        <div className="cv-row">
          <span>
            {cv.military.role}, {cv.military.unit}
          </span>
          <Dates>{cv.military.dates}</Dates>
        </div>
      </Row>
      <Row label="כישורים">
        {cv.skills.map((s) => (
          <p key={s.label}>
            {s.label}: <bdi>{s.items}</bdi>
          </p>
        ))}
      </Row>
    </Page>
  );
}
