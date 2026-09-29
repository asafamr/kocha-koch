import { contactItems, type CvProps, Dates, Page } from "./parts";

// 5. Lede: one column, no rules. The summary is set large as the opening statement;
// education, service and skills sit in short columns at the foot.
export function CvLede({ cv, palette = "Vermilion", typography = "Editorial" }: CvProps) {
  return (
    <Page variant="lede" palette={palette} typography={typography}>
      <header>
        <h1>{cv.name}</h1>
        <p className="cv-title">{cv.title}</p>
        <p className="cv-contact">
          {contactItems(cv.contact).map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </p>
      </header>
      <p className="cv-summary">{cv.summary}</p>

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

      <h2>Education &amp; Service</h2>
      <div className="cv-ld-cols two">
        {cv.education.map((e) => (
          <div key={e.degree}>
            <strong>{e.degree}</strong>
            <div className="cv-meta">{e.school}</div>
            <Dates>{e.dates}</Dates>
          </div>
        ))}
        <div>
          <strong>{cv.military.role}</strong>
          <div className="cv-meta">{cv.military.unit}</div>
          <Dates>{cv.military.dates}</Dates>
        </div>
      </div>

      <h2>Skills</h2>
      <dl className="cv-ld-cols">
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
