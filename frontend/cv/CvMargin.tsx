import { contactItems, type CvProps, Dates, Page } from "./parts";

// 6. Margin: two columns. The wide main column comes first (and first in the DOM); a narrow,
// untinted column at the end holds contact, skills, education and service.
export function CvMargin({ cv, palette = "Cobalt", typography = "Schibsted" }: CvProps) {
  return (
    <Page variant="margin" palette={palette} typography={typography}>
      <div className="cv-main">
        <header>
          <h1>{cv.name}</h1>
          <p className="cv-title">{cv.title}</p>
          <p className="cv-summary">{cv.summary}</p>
        </header>

        <h2>Experience</h2>
        {cv.experience.map((j) => (
          <div key={j.company} className="cv-entry">
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
          </div>
        ))}
      </div>

      <aside className="cv-aside">
        <section>
          <h2>Contact</h2>
          {contactItems(cv.contact).map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </section>
        <section>
          <h2>Skills</h2>
          <dl>
            {cv.skills.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>
                  <bdi>{s.items}</bdi>
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <section>
          <h2>Education</h2>
          {cv.education.map((e) => (
            <div key={e.degree} className="cv-entry">
              <strong>{e.degree}</strong>
              <div className="cv-meta">{e.school}</div>
              <Dates>{e.dates}</Dates>
            </div>
          ))}
        </section>
        <section>
          <h2>Military Service</h2>
          <div className="cv-entry">
            <strong>{cv.military.role}</strong>
            <div className="cv-meta">{cv.military.unit}</div>
            <Dates>{cv.military.dates}</Dates>
          </div>
        </section>
      </aside>
    </Page>
  );
}
