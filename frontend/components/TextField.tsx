import { useId, type InputHTMLAttributes } from "react";

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & { label: string; error?: string };

// Label above a single-line input.
export function TextField({ label, error, className = "", ...props }: TextFieldProps) {
  const id = useId();
  return (
    <div className="ds-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" className={`ds-input ${className}`} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      {error && (
        <p id={`${id}-error`} className="ds-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
