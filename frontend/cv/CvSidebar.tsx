import { Bullets, contactItems, type CvProps, Dates, has, joined, Page } from "./parts";

// 2. Sidebar: a 31% tinted column at the start (left in English) with contact, skills and education;
// the main column carries the name, summary, experience and other sections. Main comes first in
// the DOM so parsers read it first; the grid places the sidebar at the start.
export function CvSidebar({ cv, palette = "Cobalt", typography = "Schibsted" }: CvProps) {
  const contact = contactItems(cv.contact);
  const main = [
    {
      title: "Experience",
      entries: (cv.experience ?? []).map((j) => ({ head: j.role, sub: joined(j.company, j.location), dates: j.dates, bullets: j.bullets })),
    },
    ...(cv.sections ?? []),
  ].filter((s) => has(s.entries));
  return (
    <Page variant="sidebar" palette={palette} typography={typography}>
      <div className="cv-main">
        <h1>{cv.name}</h1>
        {cv.title && <p className="cv-title">{cv.title}</p>}
        {cv.summary && <p className="cv-summary">{cv.summary}</p>}

        {main.map((s) => [
          <h2 key={s.title}>{s.title}</h2>,
          ...s.entries.map((e) => (
            <section key={`${s.title}/${e.head}/${e.sub}`} className="cv-entry">
              <div className="cv-row">
                <strong>{e.head}</strong>
                {e.dates && <Dates>{e.dates}</Dates>}
              </div>
              {e.sub && <div className="cv-meta">{e.sub}</div>}
              <Bullets items={e.bullets} />
            </section>
          )),
        ])}
      </div>

      <aside className="cv-side">
        {has(contact) && (
          <>
            <h2>Contact</h2>
            {contact.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </>
        )}

        {has(cv.skills) && (
          <>
            <h2>Skills</h2>
            {cv.skills.map((s) => (
              <p key={s.label} className="cv-side-item">
                <span className="cv-meta">{s.label}</span>
                <bdi>{s.items}</bdi>
              </p>
            ))}
          </>
        )}

        {has(cv.education) && (
          <>
            <h2>Education</h2>
            {cv.education.map((e) => (
              <p key={e.degree} className="cv-side-item">
                <strong>{e.degree}</strong>
                {e.school && <span>{e.school}</span>}
                {e.dates && <Dates>{e.dates}</Dates>}
              </p>
            ))}
          </>
        )}

        {cv.military && (
          <>
            <h2>Military Service</h2>
            <p className="cv-side-item">
              <strong>{cv.military.role}</strong>
              {cv.military.unit && <span>{cv.military.unit}</span>}
              {cv.military.dates && <Dates>{cv.military.dates}</Dates>}
            </p>
          </>
        )}
      </aside>
    </Page>
  );
}
