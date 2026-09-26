Thru Wallet is a Manifest V3 Chrome extension built with vanilla ES modules and esbuild — no framework in the extension bundle itself.

## Layers

```txt
src/ui/app/routes/*
  └─ bridge.send(method, params)

src/background/api-router.js
  └─ auth + contract validation + dispatch

src/background/services/*
  └─ adapters (native, token, network, balance, pending, history…)

src/lib/vault.js         # crypto / session / keyring layer
src/lib/thru-client.js   # Thru RPC / transaction / program layer
src/lib/networks.js      # network / program configuration
```

## Boundaries that are enforced, not just documented

- **The UI never imports background services, vault internals, or RPC internals directly.** Every action goes through `bridge.send(method, params)` and comes back as a message.
- **The background service worker owns auth and signing.** No signing capability exists in popup or side-panel code.
- **`src/shared/contract/manifest.js` is the API allowlist.** Every method the UI can call is explicit and versioned (contract version, e.g. v12).
- **Money is a `BigInt` internally** and stringified only when it crosses a `chrome.runtime` message boundary, to avoid floating-point precision bugs with on-chain amounts.
- **Network-specific data is scoped per network.** Balances, history, and pending records for Alphanet don't leak into another network's cache.

## Surfaces

- **Popup** — the default entry point from the toolbar icon; 14 routes: welcome, unlock, dashboard, accounts, account detail, add account, keyring, export, send, receive, faucet, history, settings, reset.
- **Side panel** — the same route stack, reachable from Settings → Window → Open side panel, opened only from a user gesture via `chrome.sidePanel.open()`. Popup and side panel are kept mutually exclusive so you never interact with a stale bundle in one while the other is open.

## Testing approach

- `test-route-lifecycle.mjs` mounts all 14 routes through the real router, guards, and bridge in three vault states (no vault / locked / unlocked), and asserts teardown, secret hygiene, modal focus trapping, and Settings guarantees.
- Deterministic slow/offline, concurrency, race, contract, and lifecycle tests cover the send path specifically, since it touches the most services.
- Anything only a real browser can prove (narrow vs. wide layout, real focus, the side panel itself, keyboard/zoom/reduced-motion) is covered by a manual smoke-test runbook rather than an automated shim.

## Not implemented by design

There is intentionally no injected `window.thru`-style provider and no dApp-connection surface — see [Overview](/docs/overview) for why.
