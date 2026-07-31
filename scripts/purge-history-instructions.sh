#!/usr/bin/env bash
set -euo pipefail

cat <<'TXT'
# Purging history (DANGEROUS - REWRITES HISTORY)

# 1) Make a full backup tag and push:
#    git tag backup-before-media-purge
#    git push --tags

# 2) Install git-filter-repo (recommended):
#    pip install git-filter-repo

# 3) Run in a fresh clone (not your main working clone):
#    git filter-repo --path assets/player --path assets/music --invert-paths

# 4) Force-push rewritten history (coordinate with team):
#    git push --force --all
#    git push --force --tags

# 5) Inform contributors to reclone.

TXT

