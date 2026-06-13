# Repository guidance for Gemini CLI

## Workflow failure handling

- Start with the failing GitHub Actions logs and the workflow file that triggered them.
- Explain the root cause before proposing a fix.
- Prefer the smallest production-safe workflow change that resolves the failure.

## Repository-specific rules

- The default branch for this repository is `gh-pages`; do not assume `main`.
- Keep workflow changes focused and avoid unrelated automation churn.
- For website or workflow changes that touch the Node build pipeline, validate with `npm ci` and `npm run build`.

## Automation behavior

- Use only supported Gemini models. The repository fallback model is `gemini-2.5-flash`.
- If a requested Gemini model is unsupported, fall back to the repository default and explain the fallback in the workflow logs.
- If a request is not already on a pull request branch, do not assume that creating or pushing a new branch will be allowed; report the blocker clearly instead of forcing an unsafe workflow.
