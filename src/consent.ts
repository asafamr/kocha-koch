// What the intake asks consent for: one box, checked by default (the user may untick), that grants
// both of kocha's purposes (packages/consent in its repo). The text is registered there verbatim
// under `version` for each purpose: change it only together with a new version there and here.
// Each recorded consent keeps the version it was given under. Shared by the server and the frontend.

export type ConsentPurpose = "cv_processing" | "marketing_email";

export const CONSENT = {
  version: "cv-2",
  text: "אפשר לקוֹחָה ליצור איתי קשר ולקבל את קורות החיים שלי",
  purposes: ["cv_processing", "marketing_email"] as ConsentPurpose[],
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

export const isPurpose = (p: unknown): p is ConsentPurpose => CONSENT.purposes.includes(p as ConsentPurpose);
