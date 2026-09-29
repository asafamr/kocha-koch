#!/usr/bin/env bash
# Fail if a React component in frontend/ has no Storybook story next to it.
set -euo pipefail
missing=0
for f in $(find frontend -name '*.tsx' ! -name '*.stories.tsx' ! -name main.tsx); do
  story="${f%.tsx}.stories.tsx"
  if [ ! -e "$story" ]; then
    echo "missing story: $story" >&2
    missing=1
  fi
done
exit $missing
