import type { InputHTMLAttributes, ReactNode } from "react";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: ReactNode };

export function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="ds-checkbox">
      <input type="checkbox" {...props} />
      {label}
    </label>
  );
}
