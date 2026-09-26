Thru Wallet is not (yet) published to the Chrome Web Store. Install it unpacked from source.

## 1. Get the source

```bash
git clone https://github.com/buildbyravi/thru-wallet-ext.git
cd thru-wallet-ext
npm install
```

## 2. Build the extension

The project builds with `esbuild` via `build.mjs`.

```bash
npm run build
```

This produces a `dist/` directory containing the manifest, background service worker, and popup bundle.

## 3. Load it unpacked in Chrome

1. Open `chrome://extensions`.
2. Enable **Developer mode** (top right).
3. Click **Load unpacked** and select the `dist/` directory.
4. Pin the extension so it's visible in the toolbar.

> **Reload-extension trap:** if you already have the popup open when you reload the extension in `chrome://extensions`, that open popup keeps running the *old* bundle. Close the popup first, reload the extension, then reopen it.

## 4. Create or import a wallet

- **Create wallet** generates a real 12-word BIP-39 mnemonic and derives your first account (BIP-44 coin type 9999, SLIP-0010 Ed25519).
- **Import** accepts either a 12-word recovery phrase or a raw 32-byte private key (hex). The address and public key are derived automatically.

Set an unlock password when prompted — it encrypts the vault at rest (see [Security model](/docs/security-model)). There is no password recovery: losing both the password and the recovery phrase means losing access to funds.

## 5. Get alphanet funds

Open the **Faucet** screen inside the wallet to claim alphanet funds on-chain, or use the CLI helper shown on that screen if you'd rather run the claim yourself.

## Popup vs. side panel

The wallet opens as a popup by default. To use it as a persistent side panel instead: **Settings → Window → Open side panel**. The two surfaces are mutually exclusive — opening one closes the other so you're never looking at a stale bundle in two places at once.

## Requirements

- A Chromium-based browser (Chrome, Brave, Edge) that supports Manifest V3 and the `chrome.sidePanel` API.
- Node.js to build from source (see the repository's `package.json` for the exact version used in CI).
