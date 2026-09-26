# Website content guide

This site is intentionally easy to update. Most visible content lives in one file:

```txt
src/data/site.ts
```

Static docs served by the deployed site live here:

```txt
public/docs/
public/llms.txt
```

## Common edits

### Update the hero or metrics

Edit `site` or `heroMetrics` in `src/data/site.ts`.

Keep the warning visible until the extension source docs close the real-browser and live-chain verification items.

### Add a feature card

Edit `featureGroups` in `src/data/site.ts`.

Rules:

- Describe shipped or explicitly planned behavior only.
- If a feature is blocked or unverified, say so directly.
- Do not imply production readiness before the source repo does.

### Add a doc card

1. Create a Markdown file in `public/docs/<slug>.md`.
2. Add one object to `docs` in `src/data/site.ts`.
3. Optionally add the page to `/docs/index.md`.

### Add a changelog entry

1. Add a new top entry to `public/docs/changelog.md`.
2. Add a short public headline to `updates` in `src/data/site.ts` if it should appear on the landing page.
3. Keep newest entries first.

### Update AI-readable context

Edit `public/llms.txt`.

Keep it short enough to paste into an agent context. Put long explanations in `/docs/mcp-and-ai.md` and link to them.

### Update MCP guidance

Edit `public/docs/mcp-and-ai.md`.

When adding a tool idea, classify it as one of:

- allowed read-only,
- protected intent preparation,
- forbidden.

The extension must remain the only signing surface.

## Do not add

- Mnemonic, private key, password, seed, recovery phrase, or vault examples.
- Fake token balances, DEX quotes, chart data, launchpad state, prediction markets, or protocol semantics.
- Claims that the extension has a dApp provider until the source repository validates an extension-compatible contract.
- Links to local-only development hosts.

## Quick checklist before publishing

```bash
npm run build
```

Then verify:

- `/` loads.
- `/llms.txt` loads.
- `/docs/index.md`, `/docs/changelog.md`, and `/docs/mcp-and-ai.md` load.
- The GitHub link points to `https://github.com/buildbyravi/thru-wallet-ext`.
