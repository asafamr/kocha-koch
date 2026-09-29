# kocha-koch

Chat frontend on a Bun server. Each message is written to `data/inbox/`. Replies come from
`data/outbox/`, written either by Claude Code / Codex (`BACKEND=files`) or by the server
through Gemini (`BACKEND=gemini`). Protocol details are in [AGENTS.md](AGENTS.md).

## Run

```sh
cp .env.example .env          # set BACKEND, and GEMINI_API_KEY for gemini
docker compose up --build     # http://127.0.0.1:3000
```

With `BACKEND=files`, answer messages from the agent container:

```sh
docker compose run --rm agent                              # shell with claude and codex
docker compose run --rm agent scripts/agent-loop.sh claude # auto-answer pending messages
docker compose run --rm agent scripts/agent-loop.sh codex
```

Log in once inside the container (`claude`, `codex login`) or pass `ANTHROPIC_API_KEY` /
`OPENAI_API_KEY`. Logins persist in the `agent-home` volume.

## Isolation

Both containers drop all Linux capabilities and set `no-new-privileges`. The app container
has a read-only root filesystem and writes only to `./data`. The agent container sees only
this repo, so AI CLIs can run without permission prompts without touching the host.
The server port binds to `127.0.0.1` only.

With rootless podman, set `USERNS_MODE=keep-id` in `.env` so the containers can write `./data`.

Development, Storybook and the code map: [DEVELOPING.md](DEVELOPING.md).
