# Deploying the Gemini app on Cloud Run

The managed version is the `app-gemini` image (`BACKEND=gemini`, `STORE=memory`). It keeps
conversations in the process, so the settings below matter: they are what make sessions,
long answers and the spend limit work. Run these yourself with a deploy identity scoped to
this project; nothing here is automated.

## Settings and why

| Setting | Value | Why |
|---|---|---|
| `--max-instances` | `1` | Sessions live in one process's memory: a second instance would not see them (a poll landing there shows an empty chat). It also makes the per-pod spend limit (`src/spend.ts`, $10/hour) the global limit. |
| `--no-cpu-throttling` | on | Answers run after the HTTP response (1–3 minutes). With request-based billing Cloud Run throttles the CPU between requests and they stall. |
| `--min-instances` | `0` or `1` | 0 scales to zero when idle (sessions are lost then, and the bucket starts empty again); 1 keeps sessions and the cache warm at the cost of an always-on instance. |
| `--concurrency` | `80` (default) | Polling is cheap; one instance handles many users. |
| `--timeout` | `120` | No request waits for Gemini; the PDF render takes seconds. |
| `--memory` | `2Gi` | Chromium for PDFs, plus uploads in memory (capped at 256 MB in `src/store.ts`). |
| `--set-env-vars` | `BACKEND=gemini,STORE=memory,GEMINI_SPEND_PER_HOUR=10` | Without `BACKEND`/`STORE` the server starts in file mode. `PORT` is set by Cloud Run. |
| `--set-secrets` | `GEMINI_API_KEY=<secret>:latest` | Keep the key in Secret Manager, not in env vars or the image. |

Example (fill in project, region and image):

```sh
gcloud run deploy kocha-cv --image=<region>-docker.pkg.dev/<project>/<repo>/kocha-koch-app:<tag> \
  --region=<region> --max-instances=1 --min-instances=0 --no-cpu-throttling \
  --timeout=120 --memory=2Gi \
  --set-env-vars=BACKEND=gemini,STORE=memory,GEMINI_SPEND_PER_HOUR=10 \
  --set-secrets=GEMINI_API_KEY=gemini-api-key:latest --allow-unauthenticated
```

## Outside the app

- **Gemini API key quota**: set a requests-per-minute quota on the key in the Google Cloud
  console. It is the hard ceiling if the app's own limits are ever bypassed.
- **Paid tier**: use a billing-enabled key. Free-tier traffic may be used to improve Google's
  models, which does not fit users' CVs.
- **Budget alert** on the project, for the same reason.

## What the app enforces itself

- One conversation per browser (HttpOnly cookie); idle sessions dropped after 6 hours.
- Per session: one answer at a time, at most 80 messages and 5 intakes, one PDF render at a
  time; a global PDF queue of 4.
- Per process: the spend bucket ($10/hour, starts empty) and the 10-minute Gemini cache,
  deleted on SIGTERM after up to 8 s for answers in flight.
- Logs carry token counts and costs, not CV text.

## Moving past one instance

Sessions in memory are the limit. More instances need an external store (e.g. Firestore for
messages, Cloud Storage for uploads) behind the same `Store` interface in `src/store.ts`, a
spend limit kept in that store instead of per process, and answers moved to a queue (e.g.
Cloud Tasks) instead of running after the response.
