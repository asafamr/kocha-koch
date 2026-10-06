# kocha-koch

Builds a one-page CV tailored to a job. The user uploads a CV, names the target role and chats
with kocha (Hebrew UI, English CV). React frontend on a Bun server. Each message is written to an
inbox folder and the reply, which can carry a new CV and tips, is read from an outbox folder.
Two instances run side by side:

| URL | Answered by | Messages |
|---|---|---|
| http://127.0.0.1:3000 | Claude Code (or Codex) through files | `.messages/agent/` |
| http://127.0.0.1:3001 | Gemini, in the server | in memory only, lost on restart |

Protocol details are in [AGENTS.md](AGENTS.md). Gemini follows the same prompts
(`docs/prompts/kocha.md` and the files it lists) and reads the uploaded PDF. The :3001 app is set
up like Cloud Run: one container, messages in memory, listening on `PORT=8080`. It needs
`GEMINI_API_KEY` in `.env`.

## Run

```sh
cp .env.example .env                  # set GEMINI_API_KEY; USERNS_MODE=keep-id on rootless podman
docker compose run --rm agent claude  # once: log in to Claude Code, then exit
docker compose --profile claude up --build
```

This starts both apps and `claude-responder`, which runs Claude Code whenever
`.messages/agent/inbox` has a message without a reply. Without `--profile claude`, only
the two apps start and you can answer from `docker compose run --rm agent`.
To answer with Codex instead: `docker compose run --rm agent scripts/agent-loop.sh codex`.

Logins persist in the `agent-home` volume. `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` from
your shell also work.

## Isolation

All containers drop all Linux capabilities and set `no-new-privileges`. The app containers
have a read-only root filesystem. `app` writes only `.messages/agent/`; `app-gemini` has no
volume and writes nothing to disk.
The agent containers see only this repo, so AI CLIs run without permission prompts without
touching the host. Ports bind to `127.0.0.1` only.

Development, Storybook and the code map: [DEVELOPING.md](DEVELOPING.md).
