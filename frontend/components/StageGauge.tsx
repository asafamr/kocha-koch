// Progress through ordered stages: circles on a line, filled up to the current stage.
// Follows page direction (RTL: first stage on the right).
// With `onSelect`, stages that `canSelect` allows are buttons that jump to that stage.
export function StageGauge({
  stages,
  current,
  label,
  onSelect,
  canSelect = () => true,
}: {
  stages: string[];
  current: number; // index of the active stage
  label: string; // accessible name, e.g. "שלבי העבודה"
  onSelect?: (index: number) => void;
  canSelect?: (index: number) => boolean;
}) {
  return (
    <ol className="ds-stages" aria-label={label} style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}>
      {stages.map((name, i) => {
        const content = (
          <>
            <span className="ds-stages-dot" aria-hidden="true" />
            {name}
          </>
        );
        return (
          <li
            key={name}
            className={i < current ? "is-done" : i === current ? "is-current" : undefined}
            aria-current={i === current ? "step" : undefined}
          >
            {onSelect && i !== current && canSelect(i) ? (
              <button type="button" className="ds-stages-button" onClick={() => onSelect(i)}>
                {content}
              </button>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ol>
  );
}
