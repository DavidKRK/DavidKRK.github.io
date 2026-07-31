# Media migration to Git LFS (non-destructive)

This PR prepares tools and instructions to migrate large media files out of normal Git storage.

Goals:
- Track future large audio files with Git LFS
- Provide a safe, documented migration path for existing files (history rewrite is optional and destructive)

What this PR includes:
- A helper script to enable Git LFS tracking and move files in the working tree into LFS for future commits (non-destructive).
- A suggested command sequence and a separate script (commented) to purge history using `git filter-repo` or BFG (requires coordination).

Quick steps (safe, non-destructive):
1. Install Git LFS locally: `git lfs install`
2. Ensure .gitattributes contains patterns for audio (this repository includes .gitattributes in a separate PR).
3. Run the helper script to convert current working files into LFS-managed files (this rewrites the files in the working tree but not history):
   `scripts/migrate-to-lfs.sh`
4. Commit and push. This will store future versions in LFS, but old history will still contain binaries.

History purge (optional, destructive):
- Use `git filter-repo` or `bfg` to remove large blobs from history. This rewrites the repo history and requires all contributors to re-clone.

See scripts/migrate-to-lfs.sh for automation.
