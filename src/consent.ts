// What the intake asks consent for: one unchecked box per purpose (consent must be an active opt-in, and
// separate per purpose). Each text is registered with kocha verbatim under `version`: change it only with a new version.
// Each recorded consent keeps the version it was given under. Shared by the server and the frontend.

export type ConsentPurpose = "cv_processing" | "marketing_email";

export const PRIVACY_URL = "https://kocha.co.il/privacy#cv-tool";
export const PRIVACY_LINK_TEXT = "מדיניות הפרטיות";

export const CONSENT = {
  version: "cv-4",
  texts: {
    cv_processing: "אני מאשר/ת לקוֹחָה לקבל את קורות החיים שלי לפי מדיניות הפרטיות",
    marketing_email: "עדכונים במייל (לא חובה)",
  } satisfies Record<ConsentPurpose, string>,
};

// A consent as recorded when given: which text, when, and from where.
export type ConsentRecord = {
  purpose: ConsentPurpose;
  version: string;
  grantedAt: string;
  ip: string;
  userAgent: string;
  page: string;
};

export const isPurpose = (p: unknown): p is ConsentPurpose => typeof p === "string" && p in CONSENT.texts;
