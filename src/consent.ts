// What the intake asks consent for: one unchecked box per purpose (consent must be an active opt-in, and
// separate per purpose). Each text is registered with kocha verbatim under `version`: change it only with a new version.
// Each recorded consent keeps the version it was given under. Shared by the server and the frontend.

export type ConsentPurpose = "cv_processing" | "marketing_email";

export const CONSENT = {
  version: "cv-3",
  texts: {
    cv_processing: "אפשר לקוֹחָה לקבל את קורות החיים שלי ולפנות אליי לגבי הפיילוט",
    marketing_email: "אשמח לקבל מקוֹחָה עדכונים וטיפים במייל",
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
