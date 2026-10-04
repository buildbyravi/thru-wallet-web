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
Thru Wallet is an experimental Chrome extension for personal key management and basic account operations on Thru's native Layer 1 betanet. It is unofficial, self-custody, and deliberately narrower than a general dApp wallet.

> Not production-ready. Not security-reviewed. Not affiliated with Unto Labs. Betanet testnet funds only.

## Install

The packaged extension is listed on the Chrome Web Store:

- Listing: [Thru Wallet](https://chromewebstore.google.com/detail/thru-wallet/ocahgpmgfeapjnceaknkikanjikhjgok)
- Extension id: \`ocahgpmgfeapjnceaknkikanjikhjgok\`
- Listing version: **1.4.1**, updated 2026-10-04, 272 KiB, five permissions — verified against the live page on 2026-10-04
- Same build as source release **v1.4.1**, merged as \`cee006e\` on 2026-10-03 and published to the store a day later
- Not verified: all 36 rows of \`docs/MANUAL_SMOKE_CHECKLIST.md\` are unticked — 95 individual checks, since most rows are run twice for popup and side panel
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

## Three artifacts, not one

| | Chrome Web Store | Source \`main\` | Audited status doc |
| --- | --- | --- | --- |
| Version | **1.4.1**, 2026-10-04 | **1.4.1**, released 2026-10-03 | describes \`4aa55ba\`, 2026-09-26 |
| Commit | built from \`cee006e\` | \`cee006e\` (PR #16 merged) | \`4aa55ba\` |
| Contract | v15, 83 methods | v15, 83 methods | claims v12, 81 methods |
| Packages | @thru 0.4.1 | @thru 0.4.1 | @thru 0.3.16 |
| Network | betanet RPC | betanet RPC, nothing else in CSP | alphanet RPC |
| Permissions | 5, adding \`notifications\` | 5, adding \`notifications\` | 4 |
| State | what Chrome installs today | what the source builds | **behind both** |

The first two columns finally agree. The betanet work merged on 2026-10-03 as [v1.4.1](https://github.com/buildbyravi/thru-wallet-ext/releases/tag/v1.4.1) and was published to the store on 2026-10-04 — package **1.4.0 had been submitted the day before and was never published**, which is why the release carries the 1.4.1 number. Submission, merge, and publication stayed three separate events, and this site only moved its listing facts when the public page moved.

What the agreement does not include is verification: **0 of 36** rows in \`docs/MANUAL_SMOKE_CHECKLIST.md\` are ticked — **95** individual checks counting popup and side panel separately. The package reached users one day after merge on 20 automated suites and no recorded manual run.

It also does not last. Contract **v16** is written on the stacked, mergeable chain [#17](https://github.com/buildbyravi/thru-wallet-ext/pull/17) → [#18](https://github.com/buildbyravi/thru-wallet-ext/pull/18): it retires \`tx.send\` and \`token.transfer\`, taking 83 methods down to 81, and rewrites the status document to match. The chain does not bump the package number, so merging it as-is would leave \`main\` describing contract v16 under the same **1.4.1** string the store serves as contract v15.

Shared by all three: 14 routes, one popup stack, a 400px popup, 0 DOM sinks with the ratchet closed, and a vault built on PBKDF2-SHA256 at 600,000 rounds then AES-256-GCM.

Say which artifact you mean. "Thru Wallet supports betanet" is true of the package Chrome installs today and of the source; "Thru Wallet is verified on betanet" is true of neither.

## The chain moved underneath the store build

The extension repository records a managed-genesis reset on 2026-09-26: the single-node alphanet is gone, betanet is Thru's final testnet before mainnet, and the old reverse-engineered program addresses no longer exist on-chain. The published 1.4.1 package points at the betanet RPC and nothing else: \`connect-src\` allows one origin. The alphanet-era 1.2.0 package left the install path on 2026-10-04. Building from \`main\` at \`cee006e\` gets you the same wallet the store serves.
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
2. Confirm the extension id \`ocahgpmgfeapjnceaknkikanjikhjgok\`, the developer website \`thruwallet.vercel.app\`, and version **1.4.1**.
3. Add it to Chrome. Pin it. The first run offers to create or import a wallet.
4. Read the [privacy policy](https://github.com/buildbyravi/thru-wallet-ext/blob/main/PRIVACY.md). The developer discloses that the item does not collect or use your data.

The listing is community software. It is not an Unto Labs product and it has not been audited.

> The packaged 1.4.1 build targets betanet, which replaced the reset alphanet on 2026-09-26. It is the same code as release v1.4.1, merged as \`cee006e\`. Build from source if you want to audit it or patch it; otherwise the store package is the same thing.

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
| Who | Anyone trying the wallet | Someone auditing, patching, or needing betanet now |
| Version | Listing 1.4.1, 2026-10-04 | The commit you built |
| Updates | Chrome updates the package | You rebuild dist/ |
| Contract | v15, as built from \`cee006e\` | v15 at \`main\` (\`cee006e\`) |
| Network | betanet RPC | betanet RPC |

If those two disagree, the source tree wins for source claims — including over \`docs/STATUS_AND_ROADMAP.md\`, which still describes contract v12. The listing wins for what Chrome will actually install today.
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
- **NEW** means it arrived in the 1.4.1 package on 2026-10-04. You can install it today, and no manual browser run is recorded against it yet.
- **PLANNED** means it is not a thing you can do in the extension today.

## Wallet core

Create or import a phrase or a private key. Derive more HD accounts from a seed keyring. Keep several keyrings. Encrypt the vault with PBKDF2 (600,000 SHA-256 iterations) and AES-256-GCM. Ciphertext is in \`chrome.storage.local\`. Decrypted material is only in \`chrome.storage.session\`.

Auto-lock defaults to 15 minutes and is configurable from 0 to 240, password-gated either way. In 1.2.0 it was a fixed-period alarm despite the label. 1.4.1 stamps \`lastActivityAt\` on every API request and locks on measured idleness, with background sync explicitly not counting as activity — and it adds an immediate lock button plus Ctrl+L.

## Daily use

Balances show human-scale THRU and the raw base units. 1 THRU = 1e9 base units. Account creation and faucet claim exist where the network supports them; contract v13 makes a faucet claim unlocked-only rather than signing-gated. Native send goes through review, and contract v15 catches a repeat transfer to the same recipient inside 30 seconds before it is signed. History is one flat stream: block time when known, otherwise \`Block <slot>\`, refreshed every 30 seconds. Optional desktop notifications announce confirm or fail.

The popup is 400px. The side panel is an explicit opt-in and does not steal the toolbar click.

## Token work

\`token.getBalances\` and \`token.transfer\` are implemented on official \`@thru/programs/token\` bindings. A missing token account is a proven zero. A failed read is unknown. The token-program fee is unmeasured, and the UI is supposed to say so rather than quote the native 1-base-unit fee.

The token list lives in a drawer opened from the balance box, and a custom token is added by contract address: \`token.readMint\` reads the mint from the chain and uses its own symbol and decimals, because typed metadata is what made an added token spend the wrong number of base units.

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

The manifest is the allowlist. Auth tiers include password and signing. \`tx.registerAccount\` is the narrow unlocked-only signing exception, and only for an exact vault-owned address. The pending v13 step adds a second, equally narrow one: a faucet claim is an incoming credit, so it is unlocked-only too.

## Networks

\`networks.js\` is the only place an RPC URL, explorer URL, or program address is allowed to live, and anything stored that is meaningful on one chain only is namespaced by network id. Betanet is the one enabled entry; localnet, testnet, and mainnet are declared and disabled so the storage-scoping machinery has something to exercise. A build check fails if the enabled list and the manifest's \`connect-src\` ever disagree.

## Sacred files

Do not casually edit \`src/lib/vault.js\`, \`src/lib/thru-client.js\`, or \`src/lib/networks.js\`. Derivation has golden tests. The betanet release had to touch \`thru-client.js\` for the 0.4.x package shapes and the betanet move — the rename of \`ALPHANET_RPC\` to \`BETANET_RPC\` is the one intentional export change, and the PDA vectors stayed pinned. Program addresses now come from the managed-genesis registry in \`@thru/programs\` rather than from reverse-engineered marker bytes, so a redeployment lands as a version bump instead of a pasted string.

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

Custom endpoints cannot become active, including by a direct bridge call or by stale storage. Re-enabling them requires HTTPS policy, host permission, a verified capability record, and password re-auth — together, not one at a time. Localnet was removed from the shipped wallet for the same reason: selecting it bound the extension to a localhost endpoint the user may not control.

## Permissions

1.4.1 requests five: \`storage\`, \`alarms\`, \`sidePanel\`, \`clipboardRead\`, and \`notifications\`. The fifth is new, it is a Settings toggle, and the notification body says only that a transfer confirmed or failed — no amount, address, or signature. The CSP remains \`default-src 'none'\` with \`script-src 'self'\` and a single \`connect-src\` origin.

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

1. Verify what shipped. 1.4.1 is live on the store and all 36 rows of \`docs/MANUAL_SMOKE_CHECKLIST.md\` are unticked. Install the published package, not a local \`dist/\`, and run them for both popup and side panel, including desktop notifications.
2. Merge the v16 chain with a version bump. #17 and #18 are mergeable and carry contract v16; landing them without a package bump puts two different contracts behind one version string.
3. Exercise v12 account activation and owned-recipient just-in-time registration on betanet.
4. Probe token transfer: fee, and a never-registered recipient owner. Run the token lab against a live chain.
5. Confirm betanet block-time availability, fee source, and the \`?network=betanet\` explorer routes.

## Blocked

Custom network activation waits on four controls at once: HTTPS with a localhost exception, narrow host permission, per-network capability records, and password re-auth.

An extension provider waits on a published Thru contract. The hosted iframe methods are not that contract.

## Already done

Launchpad quarantine, route lifecycle coverage, custom-network quarantine, token transfer code, and contract v12 registration plus history cache. Merged as v1.4.1 on 2026-10-03 and published to the store on 2026-10-04: the whole betanet adaptation — @thru 0.4.1 packages, managed-genesis addresses, contract v13 to v15, the token drawer, and inactivity-based auto-lock. Done does not mean live-certified: the manual checklist behind it is still 0 of 36.
`,
  },
  {
    slug: "changelog",
    title: "Changelog",
    description: "How to read listing versions, contract versions, and desk notes as different objects.",
    tag: "updates",
    markdown: `
This site keeps several clocks and refuses to merge them.

- **Listing version**, such as Chrome Web Store 1.4.1 on 2026-10-04. What Chrome installs.
- **Contract version**, such as v15 in the published build, v12 in a status document that has not caught up, or v16 on an open pull request. Three live numbers; say which.
- **Package version**, such as 1.4.1 — merged, tagged, and published, but not manually verified.
- **Submission state**, which is not a version at all: submitted, approved, or rejected.
- **Desk notes**, which are rows in Postgres and can be added without a code change.

The rendered history is on the [changelog](/changelog). Authored entries live in \`src/content/changelog.ts\`. Desk notes are not a release. They are a ledger.

When you add a release, say which artifact moved. A store update that does not bump the contract is still a release. A contract bump that is not in the listing is not yet what Chrome will install. A reviewed pull request is not a release at all — it is a promise with CI attached.
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
- Do not collapse the published package, the \`main\` tree, and the stale status document into one "current version" — the first two match today, the third does not.
- Do not quote \`docs/STATUS_AND_ROADMAP.md\` version numbers without checking \`src/shared/contract/manifest.js\`; on \`main\` at \`cee006e\` the doc still says v12 while the code exports 15.
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
| src/content/site.ts | Name, warning, store link, listing facts, contract facts, the store/release/status-doc tracks and the unverified block, nav |
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

\`/desk\` writes Postgres: field notes and smoke-check marks. The gate requires an explicit \`DESK_PASSWORD\`; there is no default password. Without both \`DATABASE_URL\` and \`DESK_PASSWORD\`, the desk remains read-only. The gate does not protect a wallet. It only slows casual edits to the ledger.

Do not put secrets in a desk note. Notes are rendered publicly on the changelog.

## Store link

The canonical install URL is exported as \`chromeStoreUrl\` from \`src/content/site.ts\`. Header, homepage, install page, footer, JSON-LD, llms files, and \`/api/catalog\` all read that constant. If the listing moves, change it once.

## Release tracks

\`site.ts\` exports five things that must not be edited as if they were one:

- \`site.listing\` — only ever what the live Chrome Web Store page says. Re-read the page before touching it and record the date in \`verifiedOn\`. A submission, a merge, and a GitHub release are all forbidden from writing here; on 2026-10-04 a changed public page did.
- \`storeStatus\` — the package in front of the store and the date it was published. \`state\` runs \`upload-pending\` → \`in-review\` → \`published\`, and reaching \`published\` is the only thing that licenses an edit to \`site.listing\`.
- \`site.contract\` — the code facts on the extension's \`main\` branch, with \`auditedCommit\` and \`auditedOn\` deliberately lagging while the status document does.
- \`release\` — the merged, tagged source release, with its PR number, merge commit, and tag.
- \`auditedDoc\` and \`unverified\` — what the repository still claims about itself, and what nobody has checked. Both exist so that "shipped" is never allowed to read as "verified".

\`releaseTracks\` renders the first three on the status page and the homepage. When two of them converge — as the store and the source did on 2026-10-04 — say so explicitly rather than deleting a track; the convergence is the news.
`,
  },
];

export function getDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}
