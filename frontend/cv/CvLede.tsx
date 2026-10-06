import { Bullets, contactItems, type CvProps, Dates, has, inOrder, joined, Page } from "./parts";

// 5. Lede: one column, no rules. The summary is set large as the opening statement;
// education and service share one block of short columns (placed where cv.order puts
// education), and skills sit in short columns too.
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

export function CvLede({ cv, palette = "Vermilion", typography = "Editorial" }: CvProps) {
  const contact = contactItems(cv.contact);
  const foot = [
    ...(cv.education ?? []).map((e) => ({ key: e.degree, head: e.degree, sub: e.school, dates: e.dates })),
    ...(cv.military ? [{ key: "military", head: cv.military.role, sub: cv.military.unit, dates: cv.military.dates }] : []),
  ];
  const footTitle = !cv.military ? "Education" : has(cv.education) ? "Education & Service" : "Military Service";
  return (
    <Page variant="lede" palette={palette} typography={typography}>
      <header>
        <h1>{cv.name}</h1>
        {cv.title && <p className="cv-title">{cv.title}</p>}
        {has(contact) && (
          <p className="cv-contact">
            {contact.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </p>
        )}
      </header>
      {cv.summary && <p className="cv-summary">{cv.summary}</p>}

      {inOrder(cv, {
        experience: has(cv.experience) && (
          <>
            <h2>Experience</h2>
            {cv.experience.map((j) => (
              <Entry key={j.company + j.role} head={j.role} sub={joined(j.company, j.location)} dates={j.dates} bullets={j.bullets} />
            ))}
          </>
        ),
        sections: cv.sections?.filter((s) => has(s.entries)).map((s) => [
          <h2 key={s.title}>{s.title}</h2>,
          ...s.entries.map((e) => <Entry key={`${s.title}/${e.head}`} {...e} />),
        ]),
        education: has(foot) && (
          <>
            <h2>{footTitle}</h2>
            <div className="cv-ld-cols two">
              {foot.map((e) => (
                <div key={e.key}>
                  <strong>{e.head}</strong>
                  {e.sub && <div className="cv-meta">{e.sub}</div>}
                  {e.dates && <Dates>{e.dates}</Dates>}
                </div>
              ))}
            </div>
          </>
        ),
        skills: has(cv.skills) && (
          <>
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
          </>
        ),
      })}
    </Page>
  );
}
