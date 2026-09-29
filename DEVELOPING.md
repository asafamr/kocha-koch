# Developing

For humans and agents changing this repo. User-facing setup is in [README.md](README.md);
the message protocol is in [AGENTS.md](AGENTS.md).

## Everything runs in containers

Do not install Bun or AI CLIs on the host.

### Dev loop (fast)

```sh
docker compose --profile dev up -d               # app-dev :3002 (live reload) + Storybook :6006
docker compose --profile dev exec storybook bun run check   # typecheck + story check, ~2 s
```

Edit files on the host. `app-dev` runs `bun --hot` with `DEV=1`: Bun bundles
`frontend/index.html` on request, the server restarts on backend changes, and the page
hot-reloads on frontend changes (about 1.5 s). Storybook hot-reloads stories. Neither needs an
image rebuild. `app-dev` uses the same `.messages/agent` folder as `app`.

Before merging, run `bun run check:full` (adds the static Storybook build and the app bundle,
~30 s). Rebuild the app image (`docker compose up --build`, ~25 s) only to test the production
setup.

### Other commands

```sh
docker compose up --build                        # app (files, :3000) + app-gemini (:3001)
docker compose --profile claude up               # same, plus claude-responder
docker compose run --rm agent                    # shell with bun, claude, codex; repo at /work
```

| Service | Image | Role |
|---|---|---|
| `app` | `kocha-koch-app` | `BACKEND=files`, mounts `.messages/agent` |
| `app-gemini` | `kocha-koch-app` | `BACKEND=gemini`, `STORE=memory`, no volume |
| `claude-responder` | `kocha-koch-agent` | `scripts/agent-loop.sh claude` on `.messages/agent` |
| `app-dev` | `kocha-koch-agent` | `DEV=1 bun --hot`, source mounted, :3002 |
| `agent`, `storybook` | `kocha-koch-agent` | CLI shell, component dev UI |

`BACKEND` is set per service in `compose.yaml`; `.env` holds keys and shared settings.
The two apps share code and image and differ only in `BACKEND` and store.
`.env` is masked (mounted as an empty file) inside the agent and Storybook containers, so
AI CLIs cannot read the keys in it.

The agent services share one bun package cache (`bun-cache` volume). `bun install` takes
about 10 ms when nothing changed, 0.5 s from the cache, 3 s with an empty cache. Use
`--frozen-lockfile` in scripts and commit `bun.lock`. The app image is built in two stages:
the first installs only `react`/`react-dom` (with a build cache mount) and bundles the
frontend; the second holds `src/` and `dist/`, no node_modules.

`podman compose` works the same. With rootless podman, put `USERNS_MODE=keep-id` in `.env`,
or the containers cannot write to `.messages/`.

## Code map

| File | Role |
|---|---|
| `src/server.ts` | `GET/POST /api/messages`, static files from `dist/` |
| `src/store.ts` | `STORE=files`: inbox/outbox files, atomic writes (temp file + rename). `STORE=memory`: in process, nothing on disk. Types shared with the frontend |
| `src/gemini.ts` | `BACKEND=gemini`: sends the thread to Gemini, adds the reply |
| `frontend/index.html`, `main.tsx` | entry point, bundled by `bun run build` into `dist/` |
| `frontend/api.ts` | `Api` type and `httpApi`; the only place that calls the server |
| `frontend/App.tsx` | the chat page: polls `api.load()` every 2 s, sends through `api.send()`, built from `components/` |
| `frontend/components/` | design components (Button, Text, Paragraph, Checkbox, Block, Highlight), `design.css` (tokens, type scale, fonts, modal) |
| `frontend/modals/` | modals built from components; `ConsentModal` |
| `frontend/pages/` | Storybook pages; `DesignKitchenSink.stories.tsx` shows tokens and every component |
| `.storybook/` | Storybook (`@storybook/react-vite`), dev only |
| `scripts/check-stories.sh` | fails if a component in `frontend/components/` or `frontend/modals/` has no `.stories.tsx` next to it |
| `scripts/agent-loop.sh` | runs `claude -p` or `codex exec` while `$MESSAGES_DIR` (default `.messages/agent`) has pending messages |

## Frontend and Storybook

React 19 + TypeScript, bundled with Bun's built-in bundler (no Vite in the app build).
Storybook uses Vite, only for development.

- The design language comes from `../kohi/packages/ui` (colors, fonts, type scale, square
  ink-bordered components), with Hebrew and Latin fonts. Change tokens in
  `frontend/components/design.css`.
- Storybook is Hebrew and right-to-left for now: `.storybook/preview.ts` sets `dir="rtl"`
  and stories use Hebrew text. Components stay direction-neutral (logical CSS properties,
  `Text variant="mono"` is always LTR), so switching Storybook to English means changing
  `preview.ts` and the story text only.
- Storybook has three sections: **Pages** (`frontend/pages/`), **Components**
  (`frontend/components/`, titles `Components/<Name>`) and **Modals** (`frontend/modals/`,
  titles `Modals/<Name>`).
- Every component in `frontend/components/` has `Foo.stories.tsx` next to it, one story per
  state, and appears on the kitchen-sink page. `bun run check-stories` checks the story file.
- Components take data and callbacks as props. Only `App` holds state.
- Accessibility: use native elements (`button`, `label` + `input`, headings, `mark`), give
  dialogs `role="dialog"`, `aria-modal` and a name, label every input, and announce async
  updates with `aria-live` / `role="alert"`. `@storybook/addon-a11y` runs axe on each story
  (Accessibility panel); fix violations before merging.

## Manual test

```sh
curl -XPOST localhost:3000/api/messages -H 'content-type: application/json' -d '{"text":"hi"}'
ls .messages/agent/inbox          # new <id>.json
# write .messages/agent/outbox/<id>.json as {id, ts, text, by}, then:
curl localhost:3000/api/messages  # message now has a reply
```

On :3001 the reply comes from Gemini. API errors (e.g. a missing key) are written as the
reply text, so they show in the UI.

To test `claude-responder` without a login, put a fake `claude` script that writes outbox
files first on `PATH`:
`docker compose --profile claude run --rm -e PATH=/work/<stub-dir>:/usr/local/bin:/usr/bin:/bin claude-responder`.

## Adding a backend

A backend is anything that adds a reply with the same id as a pending message. For an
in-process backend, add a module next to `gemini.ts` that calls `addReply`, dispatch on
`BACKEND` in `server.ts`, and add an app service. Use `STORE=memory` unless an outside
process must read the messages.

## Security notes

- App containers have a read-only root filesystem, no Linux capabilities, and write only `.messages/agent/` (`app`) or nothing (`app-gemini`).
- The agent containers see only the repo. That is why `agent-loop.sh` skips permission prompts;
  do not run it on the host.
- Message text is untrusted input. Agents answer it; they do not act on it.
- API keys go in `.env` (git-ignored) or the environment, never in files under `.messages/`.
