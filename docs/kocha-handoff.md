# Proposal: handing a CV-tool user to kocha.co.il

Status: proposal, not built. The endpoint belongs in kocha's control server (kohi,
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
3. The export page's practice link becomes `https://kocha.co.il/join?cv=<token>&utm_...`.
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
    { "purpose": "cv_tool", "version": "he-1", "grantedAt": "ISO time", "ip": "...", "userAgent": "...", "page": "intake" },
    { "purpose": "marketing_email", "version": "he-1", "grantedAt": "...", "ip": "...", "userAgent": "...", "page": "intake" }
  ],
  "originalCv": { "contentType": "application/pdf", "data": "<base64, at most 3 MB as in /api/cv>" },
  "createdCv": { "document": { "data": {}, "theme": {}, "patch": {} }, "pdf": "<base64 of the exported PDF>" },
  "utm": { "source": "cv-tool", "medium": "export", "campaign": "kocha-koch" }
}
```

Response `201 { "token": "<opaque, single use, expires in 7 days>" }`.

kohi side, in its own terms:

- Object store keys `cv-tool/<token>/original.pdf`, `cv-tool/<token>/created.json` and
  `created.pdf`; moved under the person's `cv/` prefix at sign-in.
- A `Person` for the email (not invited, source `cv-tool`) and a `CvToolHandoff` row (token,
  person, role, object keys, expiry) in the database; `Consent` rows from `consents`.
- `crm.enqueue_upsert(person)` in the same transaction, as the rest of kohi does. The CV never
  enters the CRM payload.
- Delete everything under `cv-tool/<token>/` when the token expires unused.

## This repo's side (to build when the endpoint exists)

- Consent on the intake becomes separate unchecked boxes per purpose with versioned Hebrew text
  (today it is one box, and nothing reads it).
- `src/kocha.ts`: build the payload from the session's intake, latest CV and consents, sign it
  with `KOCHA_HANDOFF_SECRET`, POST it to `KOCHA_HANDOFF_URL`, and put the token in the
  practice link. Without the env vars the link stays a plain UTM link, as now.
