import type { CvData } from "./data";
import { Dates, Ltr, Page } from "./parts";

// 2. Modern two-column: 32% tinted sidebar on the start (right) side, navy accent.
// Main column comes first in the DOM so parsers read it first; the grid places the sidebar at start.
export function CvSidebar({ cv }: { cv: CvData }) {
  return (
    <Page variant="sidebar">
      <div className="cv-main">
        <h1>{cv.name}</h1>
        <p className="cv-title">{cv.title}</p>
        <p>{cv.summary}</p>

        <h2>ניסיון תעסוקתי</h2>
        {cv.experience.map((j) => (
          <section key={j.company} className="cv-entry">
            <strong>
              {j.role}, {j.company}
            </strong>
            <div className="cv-meta">
              <Dates>{j.dates}</Dates> · {j.location}
            </div>
            <ul>
              {j.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <aside className="cv-side">
        <h2>פרטי קשר</h2>
        <p>{cv.contact.city}</p>
        <p>
          <Ltr>{cv.contact.phone}</Ltr>
        </p>
        <p>
          <Ltr>{cv.contact.email}</Ltr>
        </p>
        <p>
          <Ltr>{cv.contact.linkedin}</Ltr>
        </p>

        <h2>כישורים</h2>
        {cv.skills.map((s) => (
          <p key={s.label}>
            <strong>{s.label}</strong>
            <br />
            <bdi>{s.items}</bdi>
          </p>
        ))}

        <h2>השכלה</h2>
        {cv.education.map((e) => (
          <p key={e.degree}>
            <strong>{e.degree}</strong>
            <br />
            {e.school}, <Dates>{e.dates}</Dates>
          </p>
        ))}

        <h2>שירות צבאי</h2>
        <p>
          <strong>{cv.military.role}</strong>
          <br />
          {cv.military.unit}, <Dates>{cv.military.dates}</Dates>
        </p>
      </aside>
    </Page>
  );
}
