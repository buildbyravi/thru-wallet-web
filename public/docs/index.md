# Thru Wallet Extension website docs

This docs folder belongs to the website for `buildbyravi/thru-wallet-ext`. Files in `public/` are served by the static site, so links such as `/docs/changelog.md` and `/llms.txt` work after deploy.

## Public docs

| File | Purpose |
| --- | --- |
| [`/docs/content-guide.md`](./content-guide.md) | How to update landing-page content with minimal edits. |
| [`/docs/changelog.md`](./changelog.md) | Website and extension-baseline release notes. Keep newest entry first. |
| [`/docs/mcp-and-ai.md`](./mcp-and-ai.md) | Safe AI/MCP companion policy for the extension website. |
| [`/llms.txt`](../llms.txt) | Short AI-readable context for crawlers and coding agents. |

## Canonical implementation docs

The implementation source of truth remains the extension repository:

- Extension repo: <https://github.com/buildbyravi/thru-wallet-ext>
- Docs folder: <https://github.com/buildbyravi/thru-wallet-ext/tree/main/docs>
- Recommended starting points: `AGENTS.md`, `docs/DOCS_INDEX.md`, `docs/STATUS_AND_ROADMAP.md`, `CONTEXT.md`, and `docs/MCP_AGENT_INTEGRATION.md`.

## Open slots for future docs

Add a new Markdown file in this folder when the topic is public and website-facing. Then add one card to `src/data/site.ts` under `docs`.

Suggested future pages:

- `browser-smoke-checks.md` — public summary of the manual Chrome checklist once it is run.
- `release-process.md` — how extension release notes move from source repo to website.
- `provider-boundary.md` — public explanation of why the extension does not inject a browser provider yet.
- `token-support.md` — live token-program verification results once measured.
