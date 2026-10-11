// A row of buttons where exactly one is selected, e.g. switching between two panes.
// An option with `dot` shows an unread dot; `dotLabel` is what screen readers hear for it.
export type SegmentedOption<T extends string> = { value: T; label: string; dot?: boolean };

export function Segmented<T extends string>({
  label,
  value,
  options,
  dotLabel = "חדש",
  onChange,
  className = "",
}: {
  label: string;
  value: T;
  options: readonly SegmentedOption<T>[];
  dotLabel?: string;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div role="group" aria-label={label} className={`ds-segmented ${className}`}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
          {o.dot && (
            <>
              <span className="ds-segmented-dot" aria-hidden="true" />
              <span className="ds-sr-only">{dotLabel}</span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}
