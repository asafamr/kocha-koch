// Points a recruiter may ask about, with a story to have ready. Private to the candidate, never
// part of the CV. Tone and rules: docs/prompts/prep-points.md (gentle, actionable, dismissible).
// `evidence` holds sources from docs/cv-weak-points-research.md and docs/cv-knowledge-base.md,
// added whenever one exists; an item without sources shows no sources toggle.
export type PrepEvidence = { label: string; url: string };
export type PrepPoint = {
  id: string;
  question: string;
  prepare: string;
  evidence?: PrepEvidence[];
};
export type PrepStrength = { text: string; evidence?: PrepEvidence[] };

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
              <li key={s.text}>
                {s.text}
                <Sources evidence={s.evidence} />
              </li>
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
                <Sources evidence={p.evidence} />
                <div className="ds-prep-foot">
                  <button type="button" onClick={() => onDismiss(p.id)} aria-label={`לא רלוונטי: ${p.question}`}>
                    לא רלוונטי
                  </button>
                </div>
              </li>
            ))}
          </ul>
  );
}

// Expandable source links; nothing when there are none.
function Sources({ evidence }: { evidence?: PrepEvidence[] }) {
  if (!evidence || evidence.length === 0) return null;
  return (
    <details className="ds-prep-evidence">
      <summary>מקורות ({evidence.length})</summary>
      <ul>
        {evidence.map((e) => (
          <li key={e.url}>
            <a href={encodeURI(e.url)} target="_blank" rel="noopener noreferrer">
              {e.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
