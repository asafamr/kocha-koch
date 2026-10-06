import { useId, type TextareaHTMLAttributes } from "react";

export type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & { label: string };

// Label above a fixed-height, scrollable multi-line input.
export function TextArea({ label, rows = 6, className = "", ...props }: TextAreaProps) {
  const id = useId();
  return (
    <div className="ds-field">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} rows={rows} className={`ds-input ds-textarea ${className}`} {...props} />
    </div>
  );
}
