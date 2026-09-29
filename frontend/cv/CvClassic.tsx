import type { CvData } from "./data";
import { contactItems, Dates, Joined, Page } from "./parts";

// 1. Classic chronological (Harvard): one column, serif, centered header, rules under headings.
export function CvClassic({ cv }: { cv: CvData }) {
  return (
    <Page variant="classic">
      <header>
        <h1>{cv.name}</h1>
        <p className="cv-meta">
          <Joined items={contactItems(cv.contact)} />
        </p>
      </header>
      <p>{cv.summary}</p>

      <h2>ניסיון תעסוקתי</h2>
      {cv.experience.map((j) => (
        <section key={j.company} className="cv-entry">
          <div className="cv-row">
            <strong>
              {j.role}, {j.company}
            </strong>
            <Dates>{j.dates}</Dates>
          </div>
          <div className="cv-meta">{j.location}</div>
          <ul>
            {j.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      ))}

      <h2>השכלה</h2>
      {cv.education.map((e) => (
        <div key={e.degree} className="cv-row">
          <span>
            <strong>{e.degree}</strong>, {e.school}
          </span>
          <Dates>{e.dates}</Dates>
        </div>
      ))}

      <h2>שירות צבאי</h2>
      <div className="cv-row">
        <span>
          <strong>{cv.military.role}</strong>, {cv.military.unit}
        </span>
        <Dates>{cv.military.dates}</Dates>
      </div>

      <h2>כישורים</h2>
      {cv.skills.map((s) => (
        <p key={s.label}>
          <strong>{s.label}:</strong> <bdi>{s.items}</bdi>
        </p>
      ))}
    </Page>
  );
}
