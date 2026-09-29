import { useId, type InputHTMLAttributes } from "react";

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & { label: string };

// Label above a single-line input.
export function TextField({ label, className = "", ...props }: TextFieldProps) {
  const id = useId();
  return (
    <div className="ds-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" className={`ds-input ${className}`} {...props} />
    </div>
  );
}
