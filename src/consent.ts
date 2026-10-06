// What the intake asks consent for: one unchecked box per purpose, as in kocha's safe-side
// consent design (docs/kocha-handoff.md). Purpose names are kocha's (packages/consent in its
// repo); each text version must be registered there too. Change `version` whenever the text
// changes; each recorded consent keeps the version it was given under. Shared by the server and
// the frontend.

export type ConsentPurpose = "cv_processing" | "marketing_email";

export const CONSENTS: readonly { purpose: ConsentPurpose; version: string; text: string }[] = [
  {
    purpose: "cv_processing",
    version: "he-1",
    text: "אפשר להעביר לקוֹחָה את קורות החיים שלי (המקוריים והחדשים), כדי להמשיך איתה לאימון ראיון ב־kocha.co.il",
  },
  {
    purpose: "marketing_email",
    version: "he-1",
    text: "אפשר לשלוח לי במייל עדכונים והצעות מקוֹחָה",
  },
];

// A consent as recorded when given: which text, when, and from where.
export type ConsentRecord = {
  purpose: ConsentPurpose;
  version: string;
  grantedAt: string;
  ip: string;
  userAgent: string;
  page: string;
};

export const isPurpose = (p: unknown): p is ConsentPurpose => CONSENTS.some((c) => c.purpose === p);
