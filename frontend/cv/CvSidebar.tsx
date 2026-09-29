import { type CvProps, Dates, Ltr, Page } from "./parts";

// 2. Sidebar: a 31% tinted column at the start (left in English) with contact, skills and education;
// the main column carries the name, summary and experience. Main comes first in the DOM so
// parsers read it first; the grid places the sidebar at the start.
export function CvSidebar({ cv, palette = "Cobalt", typography = "Schibsted" }: CvProps) {
  return (
    <Page variant="sidebar" palette={palette} typography={typography}>
      <div className="cv-main">
        <h1>{cv.name}</h1>
        <p className="cv-title">{cv.title}</p>
        <p className="cv-summary">{cv.summary}</p>

        <h2>Experience</h2>
        {cv.experience.map((j) => (
          <section key={j.company} className="cv-entry">
            <div className="cv-row">
              <strong>{j.role}</strong>
              <Dates>{j.dates}</Dates>
            </div>
            <div className="cv-meta">
              {j.company}, {j.location}
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
        <h2>Contact</h2>
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

        <h2>Skills</h2>
        {cv.skills.map((s) => (
          <p key={s.label} className="cv-side-item">
            <span className="cv-meta">{s.label}</span>
            <bdi>{s.items}</bdi>
          </p>
        ))}

        <h2>Education</h2>
        {cv.education.map((e) => (
          <p key={e.degree} className="cv-side-item">
            <strong>{e.degree}</strong>
            <span>{e.school}</span>
            <Dates>{e.dates}</Dates>
          </p>
        ))}

        <h2>Military Service</h2>
        <p className="cv-side-item">
          <strong>{cv.military.role}</strong>
          <span>{cv.military.unit}</span>
          <Dates>{cv.military.dates}</Dates>
        </p>
      </aside>
    </Page>
  );
}
