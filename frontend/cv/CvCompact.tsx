import { Bullets, contactItems, type CvProps, Dates, has, Joined, Page } from "./parts";

// 4. Compact technical ("Jake's Resume"): dense serif single column, small-caps headings,
// two-row entries with the role in italics.

// Bold head with dates at the end; an italic second line and bullets when there are any.
function Entry({ head, sub, dates, bullets }: { head: string; sub?: string; dates?: string; bullets?: string[] }) {
  return (
    <section className="cv-entry">
      <div className="cv-row">
        <strong>{head}</strong>
        {dates && <Dates>{dates}</Dates>}
      </div>
      {sub && <div className="cv-sub">{sub}</div>}
      <Bullets items={bullets} />
    </section>
  );
}

export function CvCompact({ cv, palette = "Ink", typography = "Newsreader" }: CvProps) {
  const contact = contactItems(cv.contact);
  return (
    <Page variant="compact" palette={palette} typography={typography}>
      <header>
        <h1>{cv.name}</h1>
        {has(contact) && (
          <p className="cv-meta">
            <Joined items={contact} />
          </p>
        )}
      </header>

      {has(cv.experience) && (
        <>
          <h2>Experience</h2>
          {cv.experience.map((j) => (
            <section key={j.company + j.role} className="cv-entry">
              <div className="cv-row">
                <strong>{j.company}</strong>
                {j.location && <span>{j.location}</span>}
              </div>
              <div className="cv-row cv-sub">
                <span>{j.role}</span>
                <Dates>{j.dates}</Dates>
              </div>
              <Bullets items={j.bullets} />
            </section>
          ))}
        </>
      )}

      {cv.sections?.filter((s) => has(s.entries)).map((s) => [
        <h2 key={s.title}>{s.title}</h2>,
        ...s.entries.map((e) => <Entry key={`${s.title}/${e.head}`} {...e} />),
      ])}

      {has(cv.education) && (
        <>
          <h2>Education</h2>
          {cv.education.map((e) => (
            <Entry key={e.degree} head={e.school ?? e.degree} sub={e.school ? e.degree : undefined} dates={e.dates} />
          ))}
        </>
      )}

      {cv.military && (
        <>
          <h2>Military Service</h2>
          <div className="cv-row">
            <span>
              {cv.military.unit ? (
                <>
                  <strong>{cv.military.unit}</strong>, {cv.military.role}
                </>
              ) : (
                <strong>{cv.military.role}</strong>
              )}
            </span>
            {cv.military.dates && <Dates>{cv.military.dates}</Dates>}
          </div>
        </>
      )}

      {has(cv.skills) && (
        <>
          <h2>Technical Skills</h2>
          {cv.skills.map((s) => (
            <p key={s.label}>
              <strong>{s.label}:</strong> <bdi>{s.items}</bdi>
            </p>
          ))}
        </>
      )}
    </Page>
  );
}
