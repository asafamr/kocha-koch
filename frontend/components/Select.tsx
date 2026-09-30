import { useId } from "react";

// Native select with a label. `compact` puts the label inline (for toolbars).
export function Select<T extends string>({
  label,
  value,
  options,
  onChange,
  compact,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  compact?: boolean;
}) {
  const id = useId();
  return (
    <div className={compact ? "ds-select ds-select-compact" : "ds-select"}>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
