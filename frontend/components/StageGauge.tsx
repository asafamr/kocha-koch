// Progress through ordered stages: circles on a line, filled up to the current stage.
// Follows page direction (RTL: first stage on the right).
export function StageGauge({
  stages,
  current,
  label,
}: {
  stages: string[];
  current: number; // index of the active stage
  label: string; // accessible name, e.g. "שלבי העבודה"
}) {
  return (
    <ol className="ds-stages" aria-label={label} style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}>
      {stages.map((name, i) => (
        <li
          key={name}
          className={i < current ? "is-done" : i === current ? "is-current" : undefined}
          aria-current={i === current ? "step" : undefined}
        >
          <span className="ds-stages-dot" aria-hidden="true" />
          {name}
        </li>
      ))}
    </ol>
  );
}
