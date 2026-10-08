# Handing a CV-tool user to kocha.co.il

Optional. With `KOCHA_HANDOFF_URL` and `KOCHA_HANDOFF_SECRET` set, a user who ticked the intake
consent is handed to kocha with their CVs; without them, there is no consent box, nothing is
recorded, and the practice button is a plain tracked link to `https://kocha.co.il/join`.

## What this side does

- With the handoff on (`GET /api/messages` says `handoff: true`), the intake shows one unchecked
  box (`src/consent.ts`) that grants both purposes,
  `cv_processing` and `marketing_email`, under one text and one version (`cv-2`). The server
  records each purpose with version, time, IP and user agent in the intake message. The text is
  registered with kocha under that version: change the text only with a new version.
- `src/kocha.ts` and `POST /api/handoff`: on export (PDF or HTML, in the background) and on the
  practice click, if the user ticked `cv_processing`, build the payload below from the session's
  intake upload, the CV document and a PDF rendered here, sign it, POST it to
  `KOCHA_HANDOFF_URL`, and open the returned link on the practice click. An export and a practice
  click on the same CV share one call. Without consent or on any error, the button opens the
  plain link.

## The call

`POST $KOCHA_HANDOFF_URL`, server to server. Headers: `X-Kocha-Timestamp` (Unix seconds) and
`X-Kocha-Signature: sha256=<hex HMAC-SHA256 of "<timestamp>.<body>" with KOCHA_HANDOFF_SECRET>`.
The receiver rejects timestamps more than 5 minutes off.

```json
{
  "source": "cv-tool",
  "role": "Research Infrastructure Architect",
  "jobDescription": "optional",
  "contact": { "email": "from the created CV, unverified", "name": "..." },
  "consents": [
    { "purpose": "cv_processing", "version": "cv-2", "grantedAt": "ISO time", "ip": "...", "userAgent": "...", "page": "intake" },
    { "purpose": "marketing_email", "version": "cv-2", "grantedAt": "...", "ip": "...", "userAgent": "...", "page": "intake" }
  ],
  "originalCv": { "contentType": "application/pdf", "data": "<base64, at most 5 MB, or null>" },
  "createdCv": { "document": { "data": {}, "theme": {}, "patch": {} }, "pdf": "<base64 of the exported PDF>" },
  "utm": { "source": "cv-tool", "medium": "export", "campaign": "kocha-koch" }
}
```

Response `201 { "token": "<opaque, single use>", "url": "<where to send the user>" }`. This side
opens `url` as-is. The token travels in the URL fragment, so it stays out of server logs.

## What kocha does with it

kocha keeps the CVs and the consents, and attaches the CVs to the user's account when they sign
in to kocha.co.il with the same email, so the practice interview can use them. The CV is never
sent to kocha's mailing list provider. The email comes from the CV and is unverified, so no
marketing mail goes out before the user signs in.
