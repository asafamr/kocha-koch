# Handing a CV-tool user to kocha.co.il

Optional. With `KOCHA_HANDOFF_URL` and `KOCHA_HANDOFF_SECRET` set, a user who ticked the intake
consent is handed to kocha with their CVs; without them, there is no consent box, nothing is
recorded, and the practice button is a plain tracked link to `https://kocha.co.il/join`.

## What this side does

- With the handoff on (`GET /api/messages` says `handoff: true`), the intake shows two separate
  unchecked boxes (`src/consent.ts`), one per purpose: `cv_processing` and `marketing_email`
  (optional, independent). Each has its own text, both under version `cv-3`. The server records
  each ticked purpose with version, time, IP and user agent in the intake message. The texts are
  registered with kocha under that version: change a text only with a new version.
- `src/kocha.ts` and `POST /api/handoff`: on export (PDF or HTML, in the background) and on the
  practice click, if the user ticked `cv_processing`, build the payload below from the session's
  intake upload, the latest tips any reply sent, as `prep` (left out if none, not an object, or over 64 KB), the CV document and a PDF rendered here, sign it, POST it to
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
    { "purpose": "cv_processing", "version": "cv-3", "grantedAt": "ISO time", "ip": "...", "userAgent": "...", "page": "intake" },
    { "purpose": "marketing_email", "version": "cv-3", "grantedAt": "...", "ip": "...", "userAgent": "...", "page": "intake" }
  ],
  "originalCv": { "contentType": "application/pdf", "data": "<base64, at most 5 MB, or null>" },
  "createdCv": { "document": { "data": {}, "theme": {}, "patch": {} }, "pdf": "<base64 of the exported PDF>" },
  "prep": { "profile": {}, "target": "...", "strengths": [], "jobFit": [], "points": [] },
  "utm": { "source": "cv-tool", "medium": "export", "campaign": "kocha-koch" }  // or the visitor's own tags
}
```

Response `201 { "token": "<opaque, single use>", "url": "<where to send the user>" }`. This side
opens `url` as-is. The token travels in the URL fragment, so it stays out of server logs.

## What kocha does with it

kocha keeps the CVs and the consents, and attaches the CVs to the user's account when they sign
in to kocha.co.il with the same email, so the practice interview can use them. The CV is never
sent to kocha's mailing list provider. The email comes from the CV and is unverified, so no
marketing mail goes out before the user signs in.

## Attribution

The page reads `utm_source`, `utm_medium`, `utm_campaign`, `utm_term` and `utm_content` from its URL
on load, keeps them for the browser session and sends them with the intake. The server keeps known
keys only, each cut to 64 characters. The handoff sends them as `utm` (`source`, `medium`, `campaign`, plus `term` and `content`
when set). A visitor who arrived with none of source, medium or campaign gets the fixed
`cv-tool` / `export` / `kocha-koch` values, and the join-link fallback carries the same tags.
