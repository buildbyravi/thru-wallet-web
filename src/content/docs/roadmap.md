A living snapshot of what's shipped, what's implemented-but-not-exposed, and what's next. For the dated history of how it got here, see the [Changelog](/changelog).

## Shipped and verified

- Wallet creation, import, multi-account, export, balance display, on-chain account creation, faucet claims, native sends, decoded transaction history, and explorer links — all exercised against a live alphanet.
- Password-encrypted vault (PBKDF2 + AES-256-GCM), memory-only session storage, and a configurable auto-lock alarm.
- Popup and side-panel surfaces, mutually exclusive, covering all 14 routes.
- Legacy custom-network activation permanently refused at the background boundary, with self-healing to Alphanet.
- Legacy launchpad/DEX/prediction surface fully quarantined — no launchpad page ships in the built extension.

## Known gaps / near-term follow-ups

- **Contacts CRUD UI and account pin/hide/order UI.** The backend (`contacts.*`, `account.setOrder` / `setPinned` / `setHidden`, `settings.set`) already exists; these need their own dedicated screens.
- **Token portfolio / token transfer.** Gated on further live Thru Token Program validation: account enumeration, decimals, mint metadata, balances, transfer, and history decoding.
- **Charged-fee visibility.** The official `get_transaction` docs currently list no fee field on alphanet; this stays an open item rather than a guessed number.

## Exploratory, not shipped

- **Price/oracle reads.** The alphanet Oracle program has been confirmed live and CSP-clean to read (`@thru/programs`' `./oracle` exports), but no runtime code from that spike has shipped — it's recorded as a design input only.
- **Local wallet MCP companion.** Planning-only. See [AI agents, MCP & llms.txt](/docs/ai-and-mcp) for the safety model this would have to follow if it's ever built.

## Explicitly not planned

- An injected `window.thru`-style dApp provider (see [Overview](/docs/overview)).
- Support for networks other than Thru alphanet/devnet at this time.
- Any comparison, benchmarking, or feature-parity claims against other wallets.

## How this page stays current

This file lives at `src/content/docs/roadmap.md`. When a roadmap item ships, move its bullet up to "Shipped and verified" and add a matching entry to [`src/content/changelog.ts`](/docs/contributing) in the same change.
