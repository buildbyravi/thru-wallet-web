# Changelog

Keep newest entries first. Mirror only the short public headline in `src/data/site.ts` if it should appear on the landing page.

## 2026-09-26 — Website reset for Thru Wallet Extension

- Replaced the previous audit landing content.
- Rebuilt the landing page around the Thru Wallet Extension product: overview, features, architecture, security posture, docs, updates, roadmap, and AI/MCP context.
- Added static docs under `/docs/` and machine-readable context at `/llms.txt`.
- Added open documentation slots so future release notes, MCP tool proposals, and AI-readable facts can be added with minimal edits.

## 2026-09-26 — Extension baseline summarized

Public copy now reflects the extension status documentation available on 2026-09-26:

- Contract v12 and 81 allowlisted methods.
- Fourteen popup routes in one route stack.
- Chrome MV3 runtime with explicit side-panel mode.
- Structural guards for layering, CSP, routes, contract, DOM, lifecycle, history, registration, network cache, and quarantined legacy surfaces.
- Custom networks remain quarantined until all re-enable preconditions land together.
- Token transfer support is shipped in code, while token-program fee and unregistered-owner behavior still need live-chain verification.
- Real browser smoke checks remain open for layout, focus, QR canvas, clipboard prompts, toolbar mode, and MV3 worker restart behavior.

## Next entry template

```md
## YYYY-MM-DD — Short title

- What changed.
- What remains open or unsupported.
- Which source repository commit, release, or status doc this entry summarizes.
```
