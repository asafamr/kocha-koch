#!/usr/bin/env bash
# Fail if a component (frontend/components/, frontend/modals/, CV styles frontend/cv/Cv*) has no story next to it.
set -euo pipefail
missing=0
for f in frontend/components/*.tsx frontend/modals/*.tsx frontend/cv/Cv*.tsx; do
  case "$f" in *.stories.tsx) continue ;; esac
  story="${f%.tsx}.stories.tsx"
  if [ ! -e "$story" ]; then
    echo "missing story: $story" >&2
    missing=1
  fi
done
exit $missing
