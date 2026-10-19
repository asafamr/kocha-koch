import { useId, type TextareaHTMLAttributes } from "react";

export type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & { label: string; error?: string };

// Label above a fixed-height, scrollable multi-line input.
export function TextArea({ label, error, rows = 6, className = "", ...props }: TextAreaProps) {
  const id = useId();
  return (
    <div className="ds-field">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} rows={rows} className={`ds-input ds-textarea ${className}`} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      {error && (
        <p id={`${id}-error`} className="ds-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
