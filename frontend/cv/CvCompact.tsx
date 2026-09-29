import type { CvData } from "./data";
import { contactItems, Dates, Joined, Page } from "./parts";

// 4. Compact technical ("Jake's Resume"): dense single column, two-row entries, mono tech names.
// Mono only for Latin tech lists; JetBrains Mono has no Hebrew glyphs.
const HEBREW = /[\u0590-\u05FF]/;

export function CvCompact({ cv }: { cv: CvData }) {
  return (
    <Page variant="compact">
      <header>
        <h1>{cv.name}</h1>
        <p className="cv-meta">
          <Joined items={contactItems(cv.contact)} />
        </p>
      </header>

      <h2>ניסיון תעסוקתי</h2>
      {cv.experience.map((j) => (
        <section key={j.company} className="cv-entry">
          <div className="cv-row">
            <strong>{j.company}</strong>
            <span>{j.location}</span>
          </div>
          <div className="cv-row cv-sub">
            <span>{j.role}</span>
            <Dates>{j.dates}</Dates>
          </div>
          <ul>
            {j.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      ))}

      <h2>השכלה</h2>
      {cv.education.map((e) => (
        <section key={e.degree} className="cv-entry">
          <div className="cv-row">
            <strong>{e.school}</strong>
            <Dates>{e.dates}</Dates>
          </div>
          <div className="cv-sub">{e.degree}</div>
        </section>
      ))}

      <h2>שירות צבאי</h2>
      <div className="cv-row">
        <span>
          <strong>{cv.military.unit}</strong>, {cv.military.role}
        </span>
        <Dates>{cv.military.dates}</Dates>
      </div>

      <h2>כישורים טכניים</h2>
      {cv.skills.map((s) => (
        <p key={s.label}>
          <strong>{s.label}:</strong> <bdi className={HEBREW.test(s.items) ? undefined : "cv-mono"}>{s.items}</bdi>
        </p>
      ))}
    </Page>
  );
}
