This page describes the current implementation as accurately as the project's own docs describe it. It is not a substitute for an independent security audit, and the extension itself says so: **not production-ready, not security-reviewed, alphanet/devnet funds only.**

## Vault encryption at rest

- Your password is stretched with **PBKDF2, 600,000 iterations, SHA-256**.
- The derived key encrypts the vault with **AES-256-GCM**.
- The encrypted vault is stored in `chrome.storage.local`.

## Decrypted vault lifetime

- Decrypted vault data lives only in `chrome.storage.session` — a memory-only storage area that is wiped when the browser closes.
- It is never written to `chrome.storage.local` or disk in decrypted form.

## Auto-lock

- The wallet auto-locks on a configurable timer, **default 15 minutes**.
- This is implemented as a **fixed-period alarm**, not inactivity detection — worth knowing if the settings copy ever implies otherwise. Treat the timer as "locks N minutes after your last unlock/reset," not "locks N minutes after you stop touching it."

## Exporting secrets

- **Export** always re-checks your password, even if the wallet session is already unlocked.
- A seed-derived account can export just that account's private key, instead of forcing you to export the whole seed phrase.

## Signing

- Signing methods require `auth: 'signing'` by default — meaning password re-authentication is required — with a password-gated opt-out for session-only signing if you explicitly choose it in Settings.
- The background service worker is the only surface that ever holds signing capability. The popup/side-panel UI never signs directly.

## What this project does not claim

- It does not claim to be production-ready.
- It does not claim to have completed an external security review.
- It does not claim mainnet readiness.
- It does not claim feature or security parity with any other wallet — this documentation makes no comparisons to other wallets.

## Reporting a security issue

Please report suspected vulnerabilities privately through the security policy in the [`thru-wallet-ext`](https://github.com/buildbyravi/thru-wallet-ext) repository rather than opening a public issue.
