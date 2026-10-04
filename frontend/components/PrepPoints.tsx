// Points a recruiter may ask about, with a story to have ready. Private to the candidate, never
// part of the CV. Tone and rules: docs/prompts/prep-points.md (gentle, actionable, dismissible).
// `evidence` holds sources from docs/cv-weak-points-research.md; points without measured
// research have none, and show no sources toggle.
export type PrepEvidence = { label: string; url: string };
export type PrepPoint = {
  id: string;
  question: string;
  prepare: string;
  basis: "research" | "practice";
  evidence?: PrepEvidence[];
};
export type PrepStrength = { text: string };

const BASIS_LABEL = { research: "מבוסס מחקר", practice: "מניסיון של מגייסים" } as const;

export function PrepPoints({
  strengths = [],
  jobFit = [],
  points,
  onDismiss,
}: {
  strengths?: PrepStrength[];
  jobFit?: PrepPoint[]; // fit to this job ad: required skills and wording
  points: PrepPoint[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="ds-prep">
      {strengths.length > 0 && (
        <section aria-label="כדאי להבליט">
          <h3 className="ds-prep-title">כדאי להבליט</h3>
          <ul className="ds-prep-strengths">
            {strengths.map((s) => (
              <li key={s.text}>{s.text}</li>
            ))}
          </ul>
        </section>
      )}

      {jobFit.length > 0 && (
        <section aria-label="התאמה למשרה">
          <h3 className="ds-prep-title">התאמה למשרה</h3>
          <PointList points={jobFit} onDismiss={onDismiss} />
        </section>
      )}

      <section aria-label="שאלות שכדאי להתכונן אליהן">
        <h3 className="ds-prep-title">שאלות שכדאי להתכונן אליהן</h3>
        {points.length === 0 ? (
          <p className="ds-prep-empty">אין כרגע שאלות להתכונן אליהן.</p>
        ) : (
          <PointList points={points} onDismiss={onDismiss} />
        )}
      </section>
    </div>
  );
}

function PointList({ points, onDismiss }: { points: PrepPoint[]; onDismiss: (id: string) => void }) {
  return (
          <ul className="ds-prep-points">
            {points.map((p) => (
              <li key={p.id}>
                <p className="ds-prep-question">{p.question}</p>
                <p className="ds-prep-prepare">{p.prepare}</p>
                {p.evidence && p.evidence.length > 0 && (
                  <details className="ds-prep-evidence">
                    <summary>מקורות ({p.evidence.length})</summary>
                    <ul>
                      {p.evidence.map((e) => (
                        <li key={e.url}>
                          <a href={encodeURI(e.url)} target="_blank" rel="noopener noreferrer">
                            {e.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
                <div className="ds-prep-foot">
                  <span>{BASIS_LABEL[p.basis]}</span>
                  <button type="button" onClick={() => onDismiss(p.id)} aria-label={`לא רלוונטי: ${p.question}`}>
                    לא רלוונטי
                  </button>
                </div>
              </li>
            ))}
          </ul>
  );
}
