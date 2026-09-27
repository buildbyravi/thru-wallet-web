export interface Doc {
  slug: string;
  title: string;
  description: string;
  tag: string;
  markdown: string;
}

export const docs: Doc[] = [
  {
    slug: "overview",
    title: "Overview",
    description: "What Thru Wallet is, what it refuses to be, and where to install it.",
    tag: "start here",
    markdown: `
Thru Wallet is an experimental Chrome extension for personal key management and basic account operations on Thru's native Layer 1 alphanet. It is unofficial, self-custody, and deliberately narrower than a general dApp wallet.

> Not production-ready. Not security-reviewed. Not affiliated with Unto Labs. Alphanet and devnet funds only.

## Install

The packaged extension is listed on the Chrome Web Store:

- Listing: [Thru Wallet](https://chromewebstore.google.com/detail/thru-wallet/ocahgpmgfeapjnceaknkikanjikhjgok)
- Extension id: \`ocahgpmgfeapjnceaknkikanjikhjgok\`
- Listing version: **1.2.0**, updated 2026-09-23, 209 KiB, offered by PWNX0
- Source: [buildbyravi/thru-wallet-ext](https://github.com/buildbyravi/thru-wallet-ext)
- This site: [buildbyravi/thru-wallet-web](https://github.com/buildbyravi/thru-wallet-web)

Use the store unless you are auditing or rebuilding. The full steps live on the [install page](/install) and in [Installation](/docs/installation).

## What it is for

- Create, import, lock, and unlock a local vault.
- Hold multiple keyrings and accounts.
- Read a THRU balance with raw units still visible.
- Create an on-chain account, claim a faucet where the network supports one, and send native THRU after review.
- Show a receive address and QR, plus decoded history when the shape is known.
- Read token balances and prepare token transfers on official program bindings, with live questions still open.

## What it is not

Thru's own wallet architecture is an embedded, iframe-hosted wallet. There is no published standard yet for third-party extensions to plug into dApps built with Thru's SDKs. This project does **not** inject \`window.thru\`. Rabby, MetaMask, Phantom, and Keplr are UX references only. Thru is not EVM.

## Baseline this site describes

The extension status document audited on 2026-09-26 at commit \`4aa55ba\` is the source baseline:

| Fact | Value |
| --- | --- |
| Contract | v12, 81 methods |
| Routes | 14, one popup stack |
| Vault | PBKDF2-SHA256, 600,000 rounds, AES-256-GCM |
| DOM sinks | 0, ratchet closed |
| Popup width | 400px |
| Packages | @thru/sdk and @thru/programs, exact-pinned 0.3.16 |

The store package and that source baseline are not the same artifact. Say which one you mean.
`,
  },
  {
    slug: "installation",
    title: "Installation",
    description: "Chrome Web Store first. Unpacked source install when you need to audit the build.",
    tag: "setup",
    markdown: `
Two paths. Most people should take the first.

## Chrome Web Store

1. Open the listing: [Thru Wallet on the Chrome Web Store](https://chromewebstore.google.com/detail/thru-wallet/ocahgpmgfeapjnceaknkikanjikhjgok).
2. Confirm the extension id \`ocahgpmgfeapjnceaknkikanjikhjgok\`, publisher **PWNX0**, and version **1.2.0**.
3. Add it to Chrome. Pin it. The first run offers to create or import a wallet.
4. Read the [privacy policy](https://github.com/buildbyravi/thru-wallet-ext/blob/main/PRIVACY.md). The developer discloses that the item does not collect or use your data.

The listing is community software for alphanet. It is not an Unto Labs product and it has not been audited.

## Load unpacked

For a checkout you can read:

\`\`\`bash
git clone https://github.com/buildbyravi/thru-wallet-ext.git
cd thru-wallet-ext
npm install
npm test
npm run build
\`\`\`

Then:

1. Open \`chrome://extensions\`.
2. Enable **Developer mode**.
3. Choose **Load unpacked**.
4. Select the \`dist/\` folder, not the repository root.
5. Pin the extension.

\`npm test\` is deterministic and local. It does not close the browser smoke checklist or the live-chain probes.

## After it is installed

- Reload the **extension**, not only the popup, when the service worker may be stale. Chrome caches it. Reopening the popup can run new UI against old background code.
- Select \`dist/\` again after every \`npm run build\`.
- Do not import a phrase you also use anywhere with real value.
- Custom networks cannot be activated. If a legacy row appears, Remove is the only action.

## Listing versus source

| | Store | Unpacked |
| --- | --- | --- |
| Who | Anyone trying alphanet | Someone auditing or patching |
| Version | Listing 1.2.0, 2026-09-23 | The commit you built |
| Updates | Chrome updates the package | You rebuild dist/ |
| Contract | Whatever that package contains | Status baseline is v12 if you are on the audited tree |

If those two disagree, the repository status document wins for source claims. The listing wins for what Chrome will actually install today.
`,
  },
  {
    slug: "features",
    title: "Features",
    description: "What the extension actually does, grouped, with status that matches the source.",
    tag: "reference",
    markdown: `
Status words on this site are narrow.

- **STABLE** means the route and the background path exist, and the project treats them as the product.
- **ALPHA** means the code is real, but a browser check or a live-chain measurement is still open.
- **PLANNED** means it is not a thing you can do in the extension today.

## Wallet core

Create or import a phrase or a private key. Derive more HD accounts from a seed keyring. Keep several keyrings. Encrypt the vault with PBKDF2 (600,000 SHA-256 iterations) and AES-256-GCM. Ciphertext is in \`chrome.storage.local\`. Decrypted material is only in \`chrome.storage.session\`.

Auto-lock defaults to 15 minutes. It is a fixed-period alarm, not an inactivity detector, despite some labels.

## Daily use

Balances show human-scale THRU and the raw base units. 1 THRU = 1e9 base units. Account creation and faucet claim exist where the network supports them. Native send goes through review. History is one flat stream: block time when known, otherwise \`Block <slot>\`.

The popup is 400px. The side panel is an explicit opt-in and does not steal the toolbar click.

## Token work

\`token.getBalances\` and \`token.transfer\` are implemented on official \`@thru/programs/token\` bindings. A missing token account is a proven zero. A failed read is unknown. The token-program fee is unmeasured, and the UI is supposed to say so rather than quote the native 1-base-unit fee.

Contacts CRUD is not a shipped screen. Account pin, hide, and order exist on the account routes.

## Not shipping

Launchpad, DEX, and prediction UI were deleted. A future version of any of them has to be a separate feature module. There is no injected provider.
`,
  },
  {
    slug: "architecture",
    title: "Architecture",
    description: "UI routes, the single bridge, the API router, services, and sacred adapters.",
    tag: "reference",
    markdown: `
The extension is one direction of calls, with the background holding authority.

\`\`\`text
src/ui/app/routes/*
  -> bridge.send(method, params)
src/background/api-router.js
  -> auth + contract + dispatch
src/background/services/*
  -> adapters
src/lib/vault.js
src/lib/thru-client.js
src/lib/networks.js
\`\`\`

## UI route stack

Fourteen routes share the kit, the router, the modal, and the focus trap: welcome, unlock, dashboard, accounts, account, add-account, keyring, export, send, receive, faucet, history, settings, reset.

## Bridge

The UI does not call \`chrome.runtime.sendMessage\` except through the bridge. BigInt values are stringified before the port. The router names the method and field path if a payload cannot be serialized.

## API router

The manifest is the allowlist. Auth tiers include password and signing. \`tx.registerAccount\` is the narrow unlocked-only signing exception, and only for an exact vault-owned address.

## Sacred files

Do not casually edit \`src/lib/vault.js\`, \`src/lib/thru-client.js\`, or \`src/lib/networks.js\`. Derivation has golden tests. Program addresses that were reverse-engineered should be doubted first if a transaction fails with a low-level format error.

## Website

This site is not the extension. Product copy lives in \`src/content/\`. The Postgres desk stores field notes and smoke-check marks. It does not store secrets, and it is not a wallet backend.
`,
  },
  {
    slug: "security-model",
    title: "Security model",
    description: "Custody boundary, contract auth, DOM ratchet, and the checks that are still open.",
    tag: "security",
    markdown: `
> This extension has not had a security review. The notes below are design constraints, not a certification.

## Custody

Seeds, private keys, and passwords stay inside the extension. Export re-checks the password even when the wallet is unlocked. Agents, pages, and this website are outside the boundary.

Encrypted vault bytes may persist. Decrypted vault data belongs only in the session store, which is wiped when the browser session ends.

## Signing

Signing requires an unlocked wallet. Password re-authentication for ordinary signing is **off by default**. Turning that preference on goes through a password-gated settings path. Generic \`settings.set\` rejects security-sensitive keys.

Do not extend the v12 registration exception to send, faucet, token transfer, export, or contacts.

## DOM

\`innerHTML\` and related sinks are ratcheted at zero. New interface code uses the kit DOM factory. Lifecycle tests look for a seeded mnemonic, private key, or password in text, attributes, dataset values, input values, and the URL.

## Networks

Custom endpoints cannot become active, including by a direct bridge call or by stale storage. Re-enabling them requires HTTPS policy, host permission, a verified capability record, and password re-auth — together, not one at a time.

## What tests do not prove

Layout, real focus, canvas QR, the side panel, clipboard prompts, and service-worker eviction are browser facts. See the [status page](/status).
`,
  },
  {
    slug: "roadmap",
    title: "Roadmap",
    description: "Open browser and chain checks, and the work that is blocked on purpose.",
    tag: "planning",
    markdown: `
Remaining work is independent. Custom networks and a dApp provider stay blocked until their preconditions exist. Do not "helpfully" implement either early.

## Open

1. Run the Chrome smoke checklist for both popup and side panel.
2. Exercise v12 account activation and owned-recipient just-in-time registration on a safe network.
3. Probe token transfer: fee, and a never-registered recipient owner.
4. Confirm history block-time, fee availability, and explorer routes.

## Blocked

Custom network activation waits on four controls at once: HTTPS with a localhost exception, narrow host permission, per-network capability records, and password re-auth.

An extension provider waits on a published Thru contract. The hosted iframe methods are not that contract.

## Already done

Launchpad quarantine, route lifecycle coverage, custom-network quarantine, token transfer code, and contract v12 registration plus history cache. Done does not mean live-certified.
`,
  },
  {
    slug: "changelog",
    title: "Changelog",
    description: "How to read listing versions, contract versions, and desk notes as different objects.",
    tag: "updates",
    markdown: `
This site keeps three clocks.

- **Listing version**, such as Chrome Web Store 1.2.0 on 2026-09-23.
- **Contract version**, such as v12 on the audited source tree.
- **Desk notes**, which are rows in Postgres and can be added without a code change.

The rendered history is on the [changelog](/changelog). Authored entries live in \`src/content/changelog.ts\`. Desk notes are not a release. They are a ledger.

When you add a release, say which artifact moved. A store update that does not bump the contract is still a release. A contract bump that is not in the listing is not yet what Chrome will install.
`,
  },
  {
    slug: "ai-and-mcp",
    title: "AI agents and MCP",
    description: "Allowed reads, protected intents, and tools that must not exist.",
    tag: "AI",
    markdown: `
Prefer the official read-only explorer MCP for live chain queries: [scan.thru.org/api/mcp](https://scan.thru.org/api/mcp). Protocol context starts at [thru.org/docs/llm.txt](https://thru.org/docs/llm.txt).

A local wallet companion is a plan, not a shipped server.

## Allowed reads

These are non-secret and still privacy-sensitive. A companion needs an explicit per-session permission.

- \`wallet_get_public_accounts\`
- \`wallet_get_balances\`
- \`wallet_get_assets\`
- \`wallet_get_activity\`
- \`wallet_get_networks\`
- \`wallet_get_capabilities\`

## Protected intents

Preparation only. The human reviews in the extension. The background signs after auth policy.

- \`wallet_prepare_native_send\`
- \`wallet_prepare_token_transfer\`
- Swap and launchpad preparation only after those programs are real and verified.

## Forbidden

- Mnemonic or private-key export
- Password access
- Direct signing or direct broadcast
- Reset, or mutation of security settings
- Raw decrypted vault access, or arbitrary \`chrome.storage\` access

Account addresses and balances are not secrets, but they are not public telemetry either. This website does not ask for them.
`,
  },
  {
    slug: "mcp-and-ai",
    title: "MCP and AI policy",
    description: "How an agent should read this site and the extension repository without overstepping.",
    tag: "AI",
    markdown: `
Read in this order when working on the extension:

1. \`AGENTS.md\`
2. \`docs/DOCS_INDEX.md\`
3. \`docs/STATUS_AND_ROADMAP.md\`
4. \`CONTEXT.md\`
5. \`docs/MCP_AGENT_INTEGRATION.md\`
6. [https://thru.org/docs/llm.txt](https://thru.org/docs/llm.txt)

For this website, start with [\`/llms.txt\`](/llms.txt) and [\`/llms-full.txt\`](/llms-full.txt).

## Rules that do not soften

- Do not request, store, print, or reveal a mnemonic, private key, or password.
- Do not invent protocol behavior, token fees, explorer routes, or a \`window.thru\` provider.
- Do not treat the store listing's inactivity-lock sentence as more precise than the source.
- Do not mark a smoke check passed because a Node test passed.
- Use official SDK and program surfaces when they exist. The pinned packages are the implementation authority for a checkout.

## This site's machine surfaces

| Surface | Use |
| --- | --- |
| /llms.txt | Short context and the store link |
| /llms-full.txt | Docs, routes, policy, changelog |
| /api/catalog | Listing, contract facts, desk counts |
| /api/doc?slug= | One document as JSON |
| /api/changelog | Authored history |
| /api/field | Desk notes |
| /api/health | Database reachability |
`,
  },
  {
    slug: "content-guide",
    title: "Content guide",
    description: "Where hero copy, features, docs, and desk notes are edited.",
    tag: "editing",
    markdown: `
Authored product copy is TypeScript, so a change is reviewable.

| File | What it feeds |
| --- | --- |
| src/content/site.ts | Name, warning, store link, listing facts, contract facts, nav |
| src/content/features.ts | Feature groups and status badges |
| src/content/routes.ts | The 14-route table |
| src/content/security.ts | Principles, gaps, signing notes |
| src/content/architecture.ts | Five-layer flow and contract breaks |
| src/content/ai.ts | MCP policy tables |
| src/content/roadmap.ts | Numbered open and blocked steps |
| src/content/changelog.ts | Authored release history |
| src/content/docs.ts | Docs hub markdown |
| src/content/smoke.ts | Smoke checklist seed and open doc slots |

## Desk

\`/desk\` writes Postgres: field notes and smoke-check marks. The gate password is \`DESK_PASSWORD\`. The sandbox default is \`alphanet-desk\`. The gate does not protect a wallet. It only slows casual edits to the ledger.

Do not put secrets in a desk note. Notes are rendered publicly on the changelog.

## Store link

The canonical install URL is exported as \`chromeStoreUrl\` from \`src/content/site.ts\`. Header, homepage, install page, footer, JSON-LD, llms files, and \`/api/catalog\` all read that constant. If the listing moves, change it once.
`,
  },
];

export function getDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}
