import { contactItems, type CvProps, Dates, Joined, Page } from "./parts";

// 4. Compact technical ("Jake's Resume"): dense serif single column, small-caps headings,
// two-row entries with the role in italics.

export function CvCompact({ cv, palette = "Ink", typography = "Classic" }: CvProps) {
  return (
    <Page variant="compact" palette={palette} typography={typography}>
      <header>
        <h1>{cv.name}</h1>
        <p className="cv-meta">
          <Joined items={contactItems(cv.contact)} />
        </p>
      </header>

      <h2>Experience</h2>
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

      <h2>Education</h2>
      {cv.education.map((e) => (
        <section key={e.degree} className="cv-entry">
          <div className="cv-row">
            <strong>{e.school}</strong>
            <Dates>{e.dates}</Dates>
          </div>
          <div className="cv-sub">{e.degree}</div>
        </section>
      ))}

      <h2>Military Service</h2>
      <div className="cv-row">
        <span>
          <strong>{cv.military.unit}</strong>, {cv.military.role}
        </span>
        <Dates>{cv.military.dates}</Dates>
      </div>

      <h2>Technical Skills</h2>
      {cv.skills.map((s) => (
        <p key={s.label}>
          <strong>{s.label}:</strong> <bdi>{s.items}</bdi>
        </p>
      ))}
    </Page>
  );
}
