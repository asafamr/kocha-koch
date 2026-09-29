#!/usr/bin/env bash
# Answer pending inbox messages with an AI CLI. Run inside the agent container:
#   docker compose run --rm agent scripts/agent-loop.sh [claude|codex]
# Permission prompts are skipped because the container is the sandbox.
set -euo pipefail
cli="${1:-claude}"
prompt="Answer every pending message in data/inbox as described in AGENTS.md, then stop."

pending() {
  for f in data/inbox/*.json; do
    [ -e "$f" ] && [ ! -e "data/outbox/$(basename "$f")" ] && return 0
  done
  return 1
}

while true; do
  if pending; then
    case "$cli" in
      claude) claude -p "$prompt" --dangerously-skip-permissions ;;
      codex)  codex exec --dangerously-bypass-approvals-and-sandbox "$prompt" ;;
      *) echo "unknown cli: $cli" >&2; exit 1 ;;
    esac
  fi
  sleep "${POLL_SECONDS:-5}"
done
