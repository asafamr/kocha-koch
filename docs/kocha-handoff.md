# Proposal: handing a CV-tool user to kocha.co.il

Status: kocha-koch side built. kocha's endpoint is being built on kohi `refactor/integration`
with this wire format (decided 2026-10-06):

- CV-tool users are ingested as leads without an invite (the tool is a lead magnet).
- The 201 always carries `url` =
  `https://kocha.co.il/join?utm_source=cv-tool&utm_medium=export&utm_campaign=kocha-koch#cv=<token>`;
  this side opens it as-is.
- Marketing consent is sent to Brevo as false until the email is verified by a Google sign-in.
- Purposes `cv_processing` and `marketing_email`, version `he-1`, registered in kocha's
  `packages/consent` with the texts of `src/consent.ts`, verbatim: change both together.
- Originals up to 5 MB; `originalCv` may be null.
- Shared secret: Secret Manager `kocha-cv-handoff-secret`, the same value on both sides. The endpoint belongs in kocha's control server (kohi,
`apps/control`, Django); this repo only calls it. It follows kohi's own design: the CRM
allowlist in `kocha/crm.py` ("never transcript, report, CV, gender or job title") and the
safe-side consent design in `docs/legal.md` (separate unchecked consents per purpose, versioned
text logged with purpose, version, time, IP, user agent and page; "CV processing for the CV
tool" is already one of the planned purposes).

## Flow

1. The user finishes a CV here. If they ticked a consent, this server calls kocha's Django
   server once, server to server, with the original CV, the created CV and the consent records.
2. The Django server, in one request:
   - writes both CVs to the object store;
   - writes the lead, the handoff and the consent rows to its database (Supabase Postgres,
     through its Django models);
   - enqueues a CRM upsert (Brevo, through `kocha/crm.py`'s outbox): email, name, source
     `cv-tool` and the consent flags only, with `marketing_email` set from the user's choice.
     The CV never goes to the CRM.
   It returns a short-lived handoff token.
3. The export page's practice link becomes the `url` kocha returns, or by default
   `https://kocha.co.il/join?utm_...#cv=<token>`. The token is in the fragment, as kocha's
   invite links are (`/join#i=...`), so it stays out of server logs. `/join` is
   invitation-only: kocha decides whether the handoff creates an invite or lands the user on a
   waitlist, and returns that page as `url`.
4. When the user signs in on kocha.co.il, kocha attaches the stored CVs to their person, so the
   practice interview can use them.

The email comes from the CV, so it is not verified. Marketing mail needs the owner's prior
consent (Communications Law s.30A), so Brevo should send marketing only after a confirmation
(double opt-in) or the kocha sign-in; until then the contact carries the consent flag but gets
no campaigns.

## Endpoint (in kohi)

`POST /api/cv-tool/handoff`, server to server, authenticated by an HMAC-SHA256 of the body with
a shared secret (`X-Kocha-Signature`), timestamped to stop replays. Not callable from browsers.

```json
{
  "source": "cv-tool",
  "role": "Research Infrastructure Architect",
  "jobDescription": "optional",
  "contact": { "email": "from the created CV, unverified", "name": "..." },
  "consents": [
    { "purpose": "cv_processing", "version": "he-1", "grantedAt": "ISO time", "ip": "...", "userAgent": "...", "page": "intake" },
    { "purpose": "marketing_email", "version": "he-1", "grantedAt": "...", "ip": "...", "userAgent": "...", "page": "intake" }
  ],
  "originalCv": { "contentType": "application/pdf", "data": "<base64, at most 3 MB as in /api/cv>" },
  "createdCv": { "document": { "data": {}, "theme": {}, "patch": {} }, "pdf": "<base64 of the exported PDF>" },
  "utm": { "source": "cv-tool", "medium": "export", "campaign": "kocha-koch" }
}
```

Response `201 { "token": "<opaque, single use, expires in 7 days>", "url": "<optional: where to send the user, on kocha.co.il>" }`.
Headers: `X-Kocha-Timestamp` (Unix seconds) and `X-Kocha-Signature: sha256=<hex HMAC-SHA256 of
"<timestamp>.<body>" with the shared secret>`. Reject timestamps more than 5 minutes old.

Purpose names and text versions are kocha's: `cv_processing` and `marketing_email` exist in
`packages/consent`; the Hebrew texts used here (`src/consent.ts`, version `he-1`) need to be
registered there.

kohi side, in its own terms:

- Object store keys `cv-tool/<token>/original.pdf`, `cv-tool/<token>/created.json` and
  `created.pdf`; moved under the person's `cv/` prefix at sign-in.
- A `Person` for the email (not invited, source `cv-tool`) and a `CvToolHandoff` row (token,
  person, role, object keys, expiry) in the database; `Consent` rows from `consents`.
- `crm.enqueue_upsert(person)` in the same transaction, as the rest of kohi does. The CV never
  enters the CRM payload.
- Delete everything under `cv-tool/<token>/` when the token expires unused.

## This repo's side (built)

- The intake shows one box per purpose (`src/consent.ts`), checked by default; the server records
  each one still ticked with version, time, IP and user agent in the intake message.
- `src/kocha.ts` and `POST /api/handoff`: on export (PDF or HTML, in the background) and on the
  practice click, if the user ticked `cv_processing`, build the payload from the session's intake upload, the CV document and a
  PDF rendered here, sign it with `KOCHA_HANDOFF_SECRET`, POST it to `KOCHA_HANDOFF_URL`, and
  open the returned link on the practice click. An export and a practice click on the same CV
  share one call. Without the env vars,
  without consent, or on any error, the button opens the plain tracked link.
