import { useId } from "react";

// Label above a dropzone-style box. The native file input covers the box (transparent),
// so click, drop, keyboard and screen readers all use the browser's own control.
export function FileInput({
  label,
  accept,
  file,
  onChange,
  prompt = "בחירת קובץ או גרירה לכאן",
  error,
}: {
  label: string;
  accept?: string;
  file: File | null;
  onChange: (file: File | null) => void;
  prompt?: string;
  error?: string;
}) {
  const id = useId();
  return (
    <div className="ds-field">
      <label htmlFor={id}>{label}</label>
      <div className={`ds-file${file ? " has-file" : ""}`}>
        <input id={id} type="file" accept={accept} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} onChange={(e) => onChange(e.target.files?.[0] ?? null)} />
        <span aria-hidden="true">{file ? file.name : prompt}</span>
      </div>
      {error && (
        <p id={`${id}-error`} className="ds-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
