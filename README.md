# kocha-koch

A free tool that turns your current CV into a one-page English CV tailored to one job. You
upload your CV, name the target role (and paste the job ad if you have it), and chat with kocha
in Hebrew. She rewrites the CV around the job without inventing facts, lets you pick a design,
exports a PDF that applicant-tracking systems can read, and lists the questions a recruiter is
likely to ask about it, with sources.

## About kocha

Kocha (קוֹחָה, [kocha.co.il](https://kocha.co.il)) is a Hebrew-first AI interview coach: she runs
a practice technical interview with you on camera, in Hebrew, about 15 minutes, for free. She is
a coach who practises with you, not an interviewer who grades you. This CV tool is her first
step: get the CV right, then practise the questions it will raise.

## Privacy: run it yourself

This project is open source. If you do not want your CV to pass through our server, run it on
your own machine and let your own AI coding agent, [Claude Code](https://claude.com/claude-code)
or [Codex](https://developers.openai.com/codex), play kocha. Your CV and the conversation stay in
`.messages/agent/` on your disk; they leave your machine only as part of what the AI tool you
choose sends to its provider.

You need Docker (or Podman) and a Claude or ChatGPT account (or an API key).

```sh
git clone https://github.com/asafamr/kocha-koch.git && cd kocha-koch
cp .env.example .env                  # rootless podman: set USERNS_MODE=keep-id
docker compose up --build -d app      # the app, at http://127.0.0.1:3000
```

Then start kocha with one of:

```sh
# Claude Code
docker compose run --rm agent claude                          # once: log in, then exit
docker compose run --rm agent scripts/agent-loop.sh claude    # answers every new message

# Codex
docker compose run --rm agent codex                           # once: log in, then exit
docker compose run --rm agent scripts/agent-loop.sh codex     # answers every new message
```

Open http://127.0.0.1:3000 and start with your CV. The agent reads `AGENTS.md` and the prompts
in `docs/prompts/`, writes each answer to `.messages/agent/outbox/`, and the page shows it.
`ANTHROPIC_API_KEY` or `OPENAI_API_KEY` in your shell work instead of a login. "Start over" in
the app moves the conversation to `.messages/agent/archive/`; delete that folder to remove it.

Prefer to drive it by hand? Run `claude` or `codex` in the repo yourself and ask it to answer
the pending messages as described in AGENTS.md.

## Two ways it runs

| URL | Answered by | Messages |
|---|---|---|
| http://127.0.0.1:3000 | Claude Code (or Codex) through files | `.messages/agent/` |
| http://127.0.0.1:3001 | Gemini, in the server | in memory only, lost on restart |

Protocol details are in [AGENTS.md](AGENTS.md). Gemini follows the same prompts
(`docs/prompts/kocha.md` and the files it lists) and reads the uploaded PDF. The :3001 app is set
up like Cloud Run: one container, messages in memory, listening on `PORT=8080`. It needs
`GEMINI_API_KEY` in `.env`. Costs and limits: [docs/gemini-costs.md](docs/gemini-costs.md).
Deploying it: [docs/deploy-cloud-run.md](docs/deploy-cloud-run.md).

To run everything at once, with Claude Code answering in the background:

```sh
docker compose run --rm agent claude  # once: log in to Claude Code, then exit
docker compose --profile claude up --build
```

Logins persist in the `agent-home` volume.

## Isolation

All containers drop all Linux capabilities and set `no-new-privileges`. The app containers
have a read-only root filesystem. `app` writes only `.messages/agent/`; `app-gemini` has no
volume and writes nothing to disk.
The agent containers see only this repo, so AI CLIs run without permission prompts without
touching the host. Ports bind to `127.0.0.1` only.

Development, Storybook and the code map: [DEVELOPING.md](DEVELOPING.md).
