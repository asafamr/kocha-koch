import { Bullets, contactItems, type CvProps, Dates, has, inOrder, joined, Page } from "./parts";
import type { CvEntry } from "./data";

// Main-column section: heading, then entries with dates at the end of the first line.
function MainSection({ title, entries }: { title: string; entries: CvEntry[] }) {
  return (
    <>
      <h2>{title}</h2>
      {entries.map((e) => (
        <section key={`${e.head}/${e.sub}`} className="cv-entry">
          <div className="cv-row">
            <strong>{e.head}</strong>
            {e.dates && <Dates>{e.dates}</Dates>}
          </div>
          {e.sub && <div className="cv-meta">{e.sub}</div>}
          <Bullets items={e.bullets} />
        </section>
      ))}
    </>
  );
}

// 2. Sidebar: a 31% tinted column at the start (left in English) with contact, skills and education;
// the main column carries the name, summary, experience and other sections. Main comes first in
// the DOM so parsers read it first; the grid places the sidebar at the start. cv.order applies
// within each column.
export function CvSidebar({ cv, palette = "Cobalt", typography = "Schibsted" }: CvProps) {
  const contact = contactItems(cv.contact);
  return (
    <Page variant="sidebar" palette={palette} typography={typography}>
      <div className="cv-main">
        <h1>{cv.name}</h1>
        {cv.title && <p className="cv-title">{cv.title}</p>}
        {cv.summary && <p className="cv-summary">{cv.summary}</p>}

        {inOrder(cv, {
          experience: has(cv.experience) && (
            <MainSection
              title="Experience"
              entries={cv.experience.map((j) => ({ head: j.role, sub: joined(j.company, j.location), dates: j.dates, bullets: j.bullets }))}
            />
          ),
          sections: cv.sections?.filter((s) => has(s.entries)).map((s) => <MainSection key={s.title} {...s} />),
        })}
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

        {inOrder(cv, {
          skills: has(cv.skills) && (
            <>
              <h2>Skills</h2>
              {cv.skills.map((s) => (
                <p key={s.label} className="cv-side-item">
                  <span className="cv-meta">{s.label}</span>
                  <bdi>{s.items}</bdi>
                </p>
              ))}
            </>
          ),
          education: has(cv.education) && (
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
          ),
          military: cv.military && (
            <>
              <h2>Military Service</h2>
              <p className="cv-side-item">
                <strong>{cv.military.role}</strong>
                {cv.military.unit && <span>{cv.military.unit}</span>}
                {cv.military.dates && <Dates>{cv.military.dates}</Dates>}
              </p>
            </>
          ),
        })}
      </aside>
    </Page>
  );
}
