#!/usr/bin/env bash
# Fail if a component in frontend/components/ or frontend/modals/ has no Storybook story next to it.
set -euo pipefail
missing=0
for f in frontend/components/*.tsx frontend/modals/*.tsx; do
  case "$f" in *.stories.tsx) continue ;; esac
  story="${f%.tsx}.stories.tsx"
  if [ ! -e "$story" ]; then
    echo "missing story: $story" >&2
    missing=1
  fi
done
exit $missing
