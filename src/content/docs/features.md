A route-by-route account of what the extension does today, what's verified against a live alphanet, and what's explicitly not built yet. See the homepage feature grid for a shorter version of this list.

## Verified against a live alphanet

- **Create wallet** — a real 12-word BIP-39 mnemonic via `@thru/crypto`'s `MnemonicGenerator`, derived through `ThruHDWallet`.
- **Import** — from a 12-word phrase, or a raw 32-byte private key (hex); the address and public key are derived automatically via `@thru/sdk`'s `keys.fromPrivateKey()`.
- **Multiple accounts, one wallet** — "+ Account" derives the next BIP-44 index from the seed; "+ Private key" imports another independent key into the same wallet. Byte-mark identicons (4×4 deterministic grid) distinguish accounts — square containers for seed-derived accounts, round for imported keys.
- **Export** — re-checks your password even if the wallet is already unlocked, then reveals the recovery phrase (seed-derived) or the specific private key (imported accounts).
- **Balance** as a human-scale THRU amount (1 THRU = 1e9 base units), with raw base units kept visible underneath.
- **Account creation on-chain** via `thru.accounts.create({ publicKey })`.
- **Faucet claims**, on-chain, from inside the extension — plus a CLI command helper for anyone who'd rather run it themselves.
- **Native transfers**, on-chain, from inside the extension.
- **Transaction history**, decoded where possible rather than shown as a raw list of signatures.
- **Explorer links** (`scan.thru.org`) on transactions and addresses throughout.

## Implemented, not yet fully exposed

- **Multiple seed phrases in one vault** — `src/lib/vault.js` implements a full keyring model (`addSeedKeyring`, `addPrivateKeyKeyring`, `renameKeyring`, `removeKeyring`). Multiple phrases and imported keys are visible and manageable, grouped by source.
- **Contacts CRUD and account pin/hide/order** — the backend already supports `contacts.*` and `account.setOrder` / `setPinned` / `setHidden`, but dedicated screens are their own follow-up.

## Deliberately out of scope

- **No injected `window.thru`-style provider.** Thru's own SDKs use an embedded, passkey-based wallet model, not the injected-provider pattern this extension would need to speak to connect to dApps.
- **No custom network entry.** Contract compatibility for `network.upsertCustom` remains, but there is no UI caller — legacy saved custom networks are shown as inert with **Remove** as the only action, and any stale active selection self-heals to Alphanet.
- **No comparisons or benchmarking against other wallets.** Where other wallets are mentioned anywhere in this project's docs, it is strictly as a UX reference point for conventions like popup shape or account switchers.

## Security posture (see [Security model](/docs/security-model) for detail)

- PBKDF2 (600,000 iterations, SHA-256) + AES-256-GCM vault encryption.
- Decrypted vault data lives only in `chrome.storage.session` (memory-only, wiped on browser close).
- A fixed-period auto-lock alarm (default 15 minutes).
