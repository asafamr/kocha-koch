// Points a recruiter may ask about, with a story to have ready. Private to the candidate, never
// part of the CV. Tone and rules: docs/prompts/prep-points.md (gentle, actionable, dismissible).
export type PrepPoint = { id: string; question: string; prepare: string; basis: "research" | "practice" };
export type PrepStrength = { text: string };

const BASIS_LABEL = { research: "מבוסס מחקר", practice: "מניסיון של מגייסים" } as const;

export function PrepPoints({
  strengths = [],
  points,
  onDismiss,
}: {
  strengths?: PrepStrength[];
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

      <section aria-label="שאלות שכדאי להתכונן אליהן">
        <h3 className="ds-prep-title">שאלות שכדאי להתכונן אליהן</h3>
        {points.length === 0 ? (
          <p className="ds-prep-empty">אין כרגע שאלות להתכונן אליהן.</p>
        ) : (
          <ul className="ds-prep-points">
            {points.map((p) => (
              <li key={p.id}>
                <p className="ds-prep-question">{p.question}</p>
                <p className="ds-prep-prepare">{p.prepare}</p>
                <div className="ds-prep-foot">
                  <span>{BASIS_LABEL[p.basis]}</span>
                  <button type="button" onClick={() => onDismiss(p.id)} aria-label={`לא רלוונטי: ${p.question}`}>
                    לא רלוונטי
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
