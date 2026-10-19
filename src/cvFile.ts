// Recognises what a CV upload is from its first 12 bytes only; nothing is parsed or decoded.
// Shared by the server (the authority) and the page (a convenience).
export const MAX_PDF = 5 * 1024 * 1024;

export const INTAKE_CODES = [
  "role_missing",
  "role_too_long",
  "job_description_too_long",
  "cv_missing",
  "cv_empty",
  "cv_too_big",
  "cv_word",
  "cv_image",
  "cv_not_pdf",
  "cv_too_long",
  "cv_unreadable",
  "too_large",
] as const;
export type IntakeCode = (typeof INTAKE_CODES)[number];

const starts = (b: Uint8Array, at: number, s: number[]) => s.every((c, i) => b[at + i] === c);
const ascii = (s: string) => [...s].map((c) => c.charCodeAt(0));

export function cvProblem(head: Uint8Array): "cv_word" | "cv_image" | "cv_not_pdf" | null {
  if (starts(head, 0, ascii("%PDF-"))) return null;
  if (starts(head, 0, [0x50, 0x4b, 0x03, 0x04]) || starts(head, 0, [0xd0, 0xcf, 0x11, 0xe0])) return "cv_word";
  if (
    starts(head, 0, [0xff, 0xd8, 0xff]) ||
    starts(head, 0, [0x89, 0x50, 0x4e, 0x47]) ||
    starts(head, 4, ascii("ftyp")) ||
    (starts(head, 0, ascii("RIFF")) && starts(head, 8, ascii("WEBP")))
  ) {
    return "cv_image";
  }
  return "cv_not_pdf";
}
