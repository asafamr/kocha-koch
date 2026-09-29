import { type CvProps, Dates, Ltr, Page } from "./parts";

// 5. Accent header band: full-bleed light sand band, name and title at start, contact stacked at end.
export function CvBand({ cv, palette = "Vermilion", typography = "Editorial" }: CvProps) {
  return (
    <Page variant="band" palette={palette} typography={typography}>
      <header className="cv-head">
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

      <div className="cv-body">
        <p>{cv.summary}</p>

        <h2>Experience</h2>
        {cv.experience.map((j) => (
          <section key={j.company} className="cv-entry">
            <div className="cv-row">
              <strong>
                {j.role}, {j.company}
              </strong>
              <Dates>{j.dates}</Dates>
            </div>
            <ul>
              {j.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>
        ))}

        <h2>Skills</h2>
        {cv.skills.map((s) => (
          <p key={s.label}>
            <strong>{s.label}:</strong> <bdi>{s.items}</bdi>
          </p>
        ))}

        <h2>Education &amp; Military Service</h2>
        {cv.education.map((e) => (
          <div key={e.degree} className="cv-row">
            <span>
              <strong>{e.degree}</strong>, {e.school}
            </span>
            <Dates>{e.dates}</Dates>
          </div>
        ))}
        <div className="cv-row">
          <span>
            <strong>{cv.military.role}</strong>, {cv.military.unit}
          </span>
          <Dates>{cv.military.dates}</Dates>
        </div>
      </div>
    </Page>
  );
}
