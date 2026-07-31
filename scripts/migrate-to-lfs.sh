#!/usr/bin/env bash
set -euo pipefail

echo "This script prepares the repository to use Git LFS for audio/media files (non-destructive)."

if ! command -v git-lfs >/dev/null 2>&1; then
  echo "git-lfs not found. Install it first: https://git-lfs.github.com/"
  exit 1
fi

# Ensure lfs is installed for this user
git lfs install --local

# Ensure .gitattributes exists
if [ ! -f ".gitattributes" ]; then
  echo "No .gitattributes found. Creating one with common audio patterns."
  cat > .gitattributes <<'G'
assets/**/*.mp3 filter=lfs diff=lfs merge=lfs -text
assets/**/*.ogg filter=lfs diff=lfs merge=lfs -text
assets/**/*.webm filter=lfs diff=lfs merge=lfs -text
G
  git add .gitattributes
fi

# Track patterns (idempotent)
git lfs track "assets/**/*.mp3" || true
git lfs track "assets/**/*.ogg" || true
git lfs track "assets/**/*.webm" || true

echo "Git LFS tracking rules updated. To move current files into LFS for future commits:"
echo "  1) git add .gitattributes"
echo "  2) git add --ignore-errors <your large files or use: git add assets/**/*.mp3 assets/**/*.ogg assets/**/*.webm>"
echo "  3) git commit -m 'chore: move media files to Git LFS'"

echo "Note: This will not remove large files from the repository history. To purge history, follow the instructions in MEDIA_MIGRATION.md (git-filter-repo or BFG)."

exit 0
