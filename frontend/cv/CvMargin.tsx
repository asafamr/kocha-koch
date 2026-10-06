import { Bullets, contactItems, type CvProps, Dates, has, joined, Page } from "./parts";

// 6. Margin: two columns. The wide main column comes first (and first in the DOM) with experience
// and other sections; a narrow, untinted column at the end holds contact, skills, education and service.
function Entry({ head, sub, dates, bullets }: { head: string; sub?: string; dates?: string; bullets?: string[] }) {
  return (
    <div className="cv-entry">
      <div className="cv-row">
        <strong>{head}</strong>
        {dates && <Dates>{dates}</Dates>}
      </div>
      {sub && <div className="cv-meta">{sub}</div>}
      <Bullets items={bullets} />
    </div>
  );
}

// Side column entry: head, then sub and dates on their own lines.
function SideEntry({ head, sub, dates }: { head: string; sub?: string; dates?: string }) {
  return (
    <div className="cv-entry">
      <strong>{head}</strong>
      {sub && <div className="cv-meta">{sub}</div>}
      {dates && <Dates>{dates}</Dates>}
    </div>
  );
}

export function CvMargin({ cv, palette = "Cobalt", typography = "Schibsted" }: CvProps) {
  const contact = contactItems(cv.contact);
  return (
    <Page variant="margin" palette={palette} typography={typography}>
      <div className="cv-main">
        <header>
          <h1>{cv.name}</h1>
          {cv.title && <p className="cv-title">{cv.title}</p>}
          {cv.summary && <p className="cv-summary">{cv.summary}</p>}
        </header>

        {has(cv.experience) && (
          <>
            <h2>Experience</h2>
            {cv.experience.map((j) => (
              <Entry key={j.company + j.role} head={j.role} sub={joined(j.company, j.location)} dates={j.dates} bullets={j.bullets} />
            ))}
          </>
        )}

        {cv.sections?.filter((s) => has(s.entries)).map((s) => [
          <h2 key={s.title}>{s.title}</h2>,
          ...s.entries.map((e) => <Entry key={`${s.title}/${e.head}`} {...e} />),
        ])}
      </div>

      <aside className="cv-aside">
        {has(contact) && (
          <section>
            <h2>Contact</h2>
            {contact.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </section>
        )}
        {has(cv.skills) && (
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
        )}
        {has(cv.education) && (
          <section>
            <h2>Education</h2>
            {cv.education.map((e) => (
              <SideEntry key={e.degree} head={e.degree} sub={e.school} dates={e.dates} />
            ))}
          </section>
        )}
        {cv.military && (
          <section>
            <h2>Military Service</h2>
            <SideEntry head={cv.military.role} sub={cv.military.unit} dates={cv.military.dates} />
          </section>
        )}
      </aside>
    </Page>
  );
}
