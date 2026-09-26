Thru Wallet is an **experimental, unofficial, self-custody browser extension** for [Thru](https://thru.org)'s native Layer 1 alphanet. It is built with vanilla ES modules and esbuild, on top of the real `@thru/sdk` and `@thru/crypto` packages, plus `@thru/programs` for native Token Program support.

> **Not production-ready and not security-reviewed.** Use alphanet/devnet funds only until a security review and mainnet readiness are complete.

## Why this exists

Thru's own wallet architecture is built around an embedded, iframe-hosted wallet (`@thru/wallet`, `wallet.thru.org`) with passkey login — not an injected-provider, browser-extension model. There is no standard yet for third-party extensions to plug into dApps built with Thru's SDKs, so this project intentionally **does not** try to inject a `window.thru`-style provider or connect to dApps.

Instead it is scoped down to what is genuinely useful today: personal key management and basic account operations against alphanet, in a dedicated browser extension you control.

## Who this is for

- Developers testing against Thru's alphanet who want a real key-management surface instead of a script.
- Anyone evaluating Thru who wants to create an account, claim from the faucet, and send a transaction without leaving the browser.
- Contributors and AI coding agents working on the extension itself — see [AI agents, MCP & llms.txt](/docs/ai-and-mcp) and [Contributing to this site](/docs/contributing).

## Project shape

| Repository | Purpose |
| --- | --- |
| [`thru-wallet-ext`](https://github.com/buildbyravi/thru-wallet-ext) | The browser extension itself — vault, background service worker, popup/side-panel UI. |
| [`thru-wallet-web`](https://github.com/buildbyravi/thru-wallet-web) | This website: overview, docs, and changelog for the extension. |

Thru is **not EVM-compatible**. Where this documentation mentions other wallets, it is only as a UX reference point for browser-extension conventions (popup shape, account switchers, side panels) — this project does not benchmark or compare itself against any other wallet.

## Next steps

- [Install the extension](/docs/installation)
- [Read the feature reference](/docs/features)
- [Understand the security model](/docs/security-model)
