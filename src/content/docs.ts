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
    description: "What Thru Wallet is, what it refuses to be, and which build you are actually installing.",
    tag: "start here",
    markdown: `
Thru Wallet is an experimental Chrome extension for personal key management and basic account operations on Thru's native Layer 1 betanet. It is unofficial, self-custody, and deliberately narrower than a general dApp wallet.

> Not production-ready. Not security-reviewed. Not affiliated with Unto Labs. Betanet testnet funds only.

## Install

The packaged extension is listed on the Chrome Web Store:

- Listing: [Thru Wallet](https://chromewebstore.google.com/detail/thru-wallet/ocahgpmgfeapjnceaknkikanjikhjgok)
- Extension id: \`ocahgpmgfeapjnceaknkikanjikhjgok\`
- Listing version: **1.4.1**, updated 2026-10-04, 272 KiB, five permissions, five screenshots, three users — re-read on the live page on 2026-10-27 and unchanged
- Store package contract: **v15**, 83 methods, @thru 0.4.1, 14 routes
- Source, main at \`1b9d096\` (2026-10-27): package **still 1.4.1**, contract **v28**, 144 methods, @thru 0.4.2, 15 routes
- Not verified: one cell of 100 in \`docs/MANUAL_SMOKE_CHECKLIST.md\` is ticked
- Source: [buildbyravi/thru-wallet-ext](https://github.com/buildbyravi/thru-wallet-ext)
- This site: [buildbyravi/thru-wallet-web](https://github.com/buildbyravi/thru-wallet-web)

Use the store unless you are auditing or rebuilding. The full steps live on the [install page](/install) and in [Installation](/docs/installation).

## What it is for

- Create, import, lock, and unlock a local vault.
- Hold multiple keyrings and accounts.
- Read a THRU balance with raw units still visible, from cache first and the chain second.
- Create an on-chain account, claim a faucet that now reads its own policy, and send native THRU after review.
- Show a receive address and QR, plus decoded history when the shape is known.
- Read token balances, discover incoming tokens, and prepare token transfers on official program bindings.
- Register a **.thru** name from the Domain screen, and link one you own to the dashboard.

## What it is not

Thru's own wallet architecture is an embedded, iframe-hosted wallet. There is no published standard yet for third-party extensions to plug into dApps built with Thru's SDKs. This project does **not** inject \`window.thru\`. Rabby, MetaMask, Phantom, and Keplr are UX references only. Thru is not EVM.

The 43-method DeFi surface exists in the contract and is unreachable: every \`DEFI_*\` flag is false. There is no swap tile, no launchpad, and no prediction market. A swap screen did ship on 2026-10-26 and was withdrawn the same day.

## Three artifacts, one version string

| | Chrome Web Store | Source \`main\` | Status document |
| --- | --- | --- | --- |
| Version | **1.4.1**, 2026-10-04 | **1.4.1**, commit \`1b9d096\`, 2026-10-27 | baseline 2026-10-03 |
| Contract | v15, 83 methods | **v28, 144 methods** | claims v18, 124 methods |
| Routes | 14 | **15 — /name added** | says 14 |
| Packages | @thru 0.4.1 | @thru 0.4.2 | says 0.4.1 |
| Verification | never opened in a recorded browser run | 36 local suites, 1 of 100 smoke cells | older than both |

The first two columns agree on exactly one thing: the package version. They have been 13 contract versions apart since contract v16 merged on 2026-10-04, hours after the 1.4.1 package was cut, and nobody bumped the number afterwards. A build from \`main\` and an install from the store both call themselves 1.4.1 while speaking v28 and v15.

That is not a documentation bug. It is a release gap, and this site reports it as one.

Say which artifact you mean. "Thru Wallet registers .thru names" is true of the source and false of the package Chrome installs. "Thru Wallet is verified on betanet" is true of neither.
`,
  },
  {
    slug: "installation",
    title: "Installation",
    description: "Chrome Web Store first. Unpacked source when you need to audit the build — and know which contract you got.",
    tag: "setup",
    markdown: `
Two paths, and they no longer produce the same wallet.

## Chrome Web Store

1. Open the listing: [Thru Wallet on the Chrome Web Store](https://chromewebstore.google.com/detail/thru-wallet/ocahgpmgfeapjnceaknkikanjikhjgok).
2. Confirm the extension id \`ocahgpmgfeapjnceaknkikanjikhjgok\`, the developer website \`thruwallet.vercel.app\`, and version **1.4.1**.
3. Add it to Chrome. Pin it. The first run offers to create or import a wallet.
4. Read the [privacy policy](https://github.com/buildbyravi/thru-wallet-ext/blob/main/PRIVACY.md). The developer discloses that the item does not collect or use your data.

The listing is community software. It is not an Unto Labs product and it has not been audited.

> The packaged 1.4.1 build targets betanet and speaks **contract v15**. It has no Domain screen, no faucet policy reads, no token discovery, and no 0.4.2 packages. Everything this site documents as source-only is genuinely absent from it.

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

\`npm test\` is deterministic and local: 36 suites, 2,082 checks on 2026-10-27. It does not close the browser smoke checklist, and it does not make a chain fact measured.

## After it is installed

- Reload the **extension**, not only the popup, when the service worker may be stale. Chrome caches it. Reopening the popup can run new UI against old background code.
- Select \`dist/\` again after every \`npm run build\`.
- Do not import a phrase you also use anywhere with real value.
- Custom networks cannot be activated. If a legacy row appears, Remove is the only action.
- Register a .thru name on a throwaway account first. The registrar is a live program and the registration is irreversible.

## Listing versus source

| | Store | Unpacked \`main\` |
| --- | --- | --- |
| Contract | v15, 83 methods | v28, 144 methods |
| Routes | 14 | 15, including /name |
| Packages | @thru 0.4.1 | @thru 0.4.2 |
| Domain screen | absent | present |
| Version string | 1.4.1 | **also 1.4.1** |
| Updates | Chrome updates the package | You rebuild dist/ |

If those disagree, the source tree wins for source claims — including over \`docs/STATUS_AND_ROADMAP.md\`, which still describes contract v18. The listing wins for what Chrome will actually install today.
`,
  },
  {
    slug: "features",
    title: "Features",
    description: "What the extension actually does, grouped, with status that matches the source rather than the listing.",
    tag: "reference",
    markdown: `
Status words on this site are narrow.

- **STABLE** means the route and the background path exist, and the project treats them as the product.
- **ALPHA** means the code is real, but a browser check or a live-chain measurement is still open.
- **NEW** means it is in the source tree and **not** in the 1.4.1 package the store serves. You can build it; you cannot install it.
- **PLANNED** means it is not a thing you can do in the extension today.

## Wallet core

Create or import a phrase or a private key. Derive more HD accounts from a seed keyring. Keep several keyrings. Encrypt the vault with PBKDF2 (600,000 SHA-256 iterations) and AES-256-GCM, ciphertext in \`chrome.storage.local\`, decrypted material only in \`chrome.storage.session\`.

Auto-lock defaults to 15 minutes, is configurable from 0 to 240, and is password-gated either way. The 2026-10-26 performance directive went further than the timer: every route now paints from network-scoped cache first and hydrates when the chain replies, so a dead RPC produces labelled stale data instead of a spinner. That rule — the frontend never waits on RPC before first paint — is \`AGENTS.md\` rule 15, and contract v27 added the cached reads that let routes obey it.

## Daily use

Balances show human-scale THRU and the raw base units. 1 THRU = 1e9 base units. Account creation exists where the network supports it. The faucet now reads the on-chain rate-limit policy and this account's own buckets before building a transaction; the cap is exactly 10,000 base units per claim, and a rate-limited chain error is relabelled rather than passed through raw.

Native send goes through review, and contract v15 catches a repeat transfer to the same recipient inside 30 seconds before it is signed. History is one flat stream: block time when known, otherwise \`Block <slot>\`, refreshed every 30 seconds. Optional desktop notifications announce confirm or fail.

The popup is 400px. The side panel is an explicit opt-in and does not steal the toolbar click.

## Name service

The Domain screen is a real fifteenth route. One search field, a background availability check, a years stepper, a quote from the on-chain registrar config, a review sheet, a password prompt, a signed registration. On Betanet the deployed custom registrar is the live \`.thru\` route at 1,000 base units per year; the official paid registry is not initialized, and \`.id\` resolves but refuses a foreign signer.

Read [the name-service page](/docs/name-service) for what is verified and what is not.

## Token work

\`token.getBalances\` and \`token.transferChecked\` are implemented on official \`@thru/programs/token\` bindings. A missing token account is a proven zero. A failed read is unknown. The token-program fee is unmeasured, and the UI says so rather than quoting the native 1-base-unit fee.

The token list lives in a drawer opened from the balance box, a custom token is added by contract address with \`token.readMint\` supplying the chain's own symbol and decimals, and \`token.discover\` quietly adds incoming mints found in cached history after verifying each one on chain.

## Not shipping

Launchpad, DEX, prediction, and any DeFi screen. The backend namespace exists — 43 methods — with every flag false. There is no injected provider. Custom networks stay quarantined.
`,
  },
  {
    slug: "name-service",
    title: "The name service",
    description: "What the Domain screen does, which facts are on-chain, and which parts are still unverified.",
    tag: "reference",
    markdown: `
The Domain screen registers **.thru** names and links one you already own. It is source-only: the 1.4.1 package in the store has no such route.

## What the screen does

- One search field. Typing triggers a debounced availability check in the background; the field never blocks on the chain.
- The suffix comes from the chain. \`.thru\` is offered when a registrar exists; \`.id\` is resolution data.
- Registration is a paid lease of 1 to 10 years. The quote is \`fee per year × years\`, read from the on-chain registrar config each time — never a constant in the UI.
- Review, then sign. Contract v28 carries the reviewed network, account, price and expiry into the signing request, and account switching is locked while a registration is pending.
- After a confirmed registration the wallet offers to link the name as your primary. Linking verifies ownership and signs nothing.

## Two .thru providers

- **Custom registrar (live).** \`contracts/thru-custom-registrar\`, our own ThruVM program, deployed at \`ta2vDCBzzptN2qVZgz6PXsCp5cNB7Nef4yeQ3W-OqzZcfF\` and initialized with root \`thru\`, 1,000 base units per year and a treasury. The screen prefers it and derives every displayed fact from the parsed config.
- **Official paid registry (absent on Betanet).** The reads and the purchase/renew/claim-expired methods are implemented from first-party formats. The registry is not initialized on Betanet, so those paths answer unsupported there.

If neither provider is readable, the screen says why and renders nothing clickable.

## Fees, honestly

- The header fee on a registration is \`0n\`. The registrar charges its own configured price — 1,000 base units per year on Betanet, which is 0.000001 THRU at nine decimals — into the config treasury.
- The **charged network fee is not reported** by any current response, and no live registration has captured one. Do not present the registrar's price as a network cost.
- Amounts are BigInt until they cross the bridge, then strings. Registrar totals group matching assets only; two names are two transactions, not an atomic batch.

## .id is not a mint route

The \`.id\` root exists on Betanet and \`name.lookup\` resolves beneath it. Its authority is a third-party key, and the chain refuses a foreign signer with an error rather than a silent failure. The wallet now verifies authority before broadcast and does not offer a registration it knows will be refused.

## What is verified, and what is not

**VERIFIED, read-only, 2026-10-26:** the official paid registry is absent; the custom registrar is present, root-matched, and quotes 1,000 base units per year; the \`.id\` root exists; a fresh label was unregistered under both routes.

**VERIFIED, write, 2026-10-27:** one unique \`.thru\` registration through the real background API router returned an on-chain execution result, and a follow-up read confirmed the test account as lease owner. This proves the backend write path. It does not prove the rendered screen, and it did not capture a charged fee.

**UNVERIFIED:** every pixel of the popup flow, the password prompt, the confirmation, a live renewal, custom lease renewal/claim (not wired), enumeration of owned names (unsupported), and any browser run at all.

**TESTED locally:** formatting, validation, eligibility, reviewed account/network/price/expiry facts, unknown submission outcomes, and account-switch locking, in the name suites and the route lifecycle run.
`,
  },
  {
    slug: "architecture",
    title: "Architecture",
    description: "UI routes, the single bridge, the API router, services, feature modules, and sacred adapters.",
    tag: "reference",
    markdown: `
The extension is one direction of calls, with the background holding authority.

\`\`\`text
src/ui/app/routes/*
  -> bridge.send(method, params)
src/background/api-router.js
  -> auth + contract + dispatch
src/background/services/*
src/background/features/dex        # flag-gated, unreachable
  -> adapters
src/lib/vault.js
src/lib/thru-client.js
src/lib/networks.js
\`\`\`

## UI route stack

Fifteen routes share the kit, the router, the modal, and the focus trap: welcome, unlock, dashboard, accounts, account, add-account, keyring, export, send, receive, faucet, history, **name**, settings, reset. The route lifecycle test mounts all fifteen in no-vault, locked, and unlocked states — 1,041 checks.

## Bridge

The UI does not call \`chrome.runtime.sendMessage\` except through the bridge. BigInt values are stringified before the port. The router names the method and field path if a payload cannot be serialized.

## API router

The manifest is the allowlist: 144 methods at v28 — 72 callable while locked, 51 unlocked-only, 12 password-gated, 9 signing-gated. \`tx.registerAccount\` remains the narrow unlocked-only registration exception, \`tx.claimFaucet\` stays unlocked because an incoming credit is not a spend, and \`name.register\` is signing-gated since v23 because it broadcasts an irreversible write.

## Services and cached reads

Account, network, transaction, token, history, settings, name, registration, and vault orchestration live in the background. Contract v27 added storage-only counterparts for the read-heavy surfaces — \`token.getCachedBalances\` beside \`token.getBalances\` — so every route has something to paint before the chain answers. Fetches that fail are not cached, so a cache row is always a complete verified read.

## Feature modules

DeFi lives in \`src/background/features/dex\` and \`src/background/services/defi\`, behind \`DEFI_*\` build-time constants that are all false. There is no query-parameter override and no storage override; the quarantine test proves that surface stays inert. The custom registrar is a separate Rust program in \`contracts/thru-custom-registrar\` with its own client ABI and byte-pin tests, deployed at a single verified address and read for every runtime fact.

## Networks

\`networks.js\` is the only place an RPC URL, explorer URL, or program address is allowed to live, and anything stored that is meaningful on one chain only is namespaced by network id. Betanet is the one enabled entry; localnet, testnet, and mainnet are declared and disabled so the storage-scoping machinery has something to exercise. A build check fails if the enabled list and the manifest's \`connect-src\` ever disagree.

## Sacred files

Do not casually edit \`src/lib/vault.js\`, \`src/lib/thru-client.js\`, or \`src/lib/networks.js\`. Derivation has golden tests. Program addresses come from the managed-genesis registry in \`@thru/programs 0.4.2\` rather than reverse-engineered marker bytes, and the SDK's account-table sort is proven by a sentinel test rather than assumed.

## Website

This site is not the extension. Product copy lives in \`src/content/\`. The Postgres desk stores field notes and smoke-check marks. It does not store secrets, and it is not a wallet backend.
`,
  },
  {
    slug: "security-model",
    title: "Security model",
    description: "Custody boundary, contract auth, DOM ratchet, build-time gates, and the checks that are still open.",
    tag: "security",
    markdown: `
> This extension has not had a security review. The notes below are design constraints, not a certification.

## Custody

Seeds, private keys, and passwords stay inside the extension. Export re-checks the password even when the wallet is unlocked. Agents, pages, and this website are outside the boundary.

Encrypted vault bytes may persist. Decrypted vault data belongs only in the session store, which is wiped when the browser session ends.

## Signing

Signing requires an unlocked wallet. Password re-authentication for ordinary signing is **off by default**. Turning that preference on goes through a password-gated settings path. Generic \`settings.set\` rejects security-sensitive keys.

Nine methods are signing-gated at v28. Contract v28 binds the reviewed network, account, price and expiry to a name signing request and locks account switching while it is pending, so a reviewed quote cannot be swapped underneath a signature.

Do not extend the v12 registration exception to send, faucet, token transfer, export, or contacts.

## DOM

\`innerHTML\` and related sinks are ratcheted at zero. New interface code uses the kit DOM factory. Lifecycle tests mount all 15 routes in three vault states and look for a seeded mnemonic, private key, or password in text, attributes, dataset values, input values, and the URL.

## Networks

Custom endpoints cannot become active, including by a direct bridge call or by stale storage. Re-enabling them requires HTTPS policy, host permission, a verified capability record, and password re-auth — together, not one at a time. Localnet is declared but not offered for the same reason: selecting it bound the extension to a localhost endpoint the user may not control.

## Build-time gates

Every \`DEFI_*\` flag is a source constant. No message, URL, or stored value can turn a swap on; turning one on is a reviewed commit. The launchpad quarantine test proves the override surface is inert, and the DeFi M0 suite proves each gated handler honours its flag.

## Permissions and CSP

The 1.4.1 package and main both request five permissions: \`storage\`, \`alarms\`, \`sidePanel\`, \`clipboardRead\`, and \`notifications\`. The notification body says only that a transfer confirmed or failed — no amount, address, or signature. The CSP remains \`default-src 'none'\` with \`script-src 'self'\` and a single \`connect-src\` origin, the betanet RPC.

## What tests do not prove

Layout, real focus, canvas QR, the side panel, clipboard prompts, notification delivery, and service-worker eviction are browser facts. One of 100 smoke cells is ticked. See the [status page](/status).
`,
  },
  {
    slug: "roadmap",
    title: "Roadmap",
    description: "The release gap, the open browser checks, and the work that is blocked on purpose.",
    tag: "planning",
    markdown: `
Remaining work is independent. Custom networks and a dApp provider stay blocked until their preconditions exist. Do not "helpfully" implement either early.

## Open

1. **Publish the source.** Main is 13 contract versions past the store package and still calls itself 1.4.1. Bump the package and the tag in the same change that cuts the release, then submit. Two artifacts sharing one version string is the defect this site exists to make visible.
2. **Verify what shipped, then verify main.** One of 100 smoke cells is ticked and it belongs to a partial popup send on 2026-10-04. Install the published package, run the runbook, then repeat against a main build — whose Domain screen has never been opened in Chrome.
3. **Drive the domain flow by hand.** A backend registration is on chain as of 2026-10-27. Search, quote, review sheet, password prompt, confirmation, primary link, and a mid-flow account switch attempt are all unverified.
4. **Measure what a transaction costs.** The token-program fee is unknown, no response reports a charged fee, and the registrar's 1,000-base-unit quote is not a network cost. Capture native, token and registration fees.
5. **Confirm betanet block time and the explorer route.** Six-second blocks are documented, not re-measured, and the \`?network=betanet\` links are still a manual check.

## Blocked

Custom network activation waits on four controls at once: HTTPS with a localhost exception, narrow host permission, per-network capability records, and password re-auth.

An extension provider waits on a published Thru contract. The hosted iframe methods are not that contract.

The DeFi surface waits on an owner decision, not on code. The backend is written, gated, and tested; the swap screen was withdrawn on 2026-10-26 after one day.

## Already done

The v16 retirement of the unbound send paths; the 43-method gated DeFi surface; name reads, primary names, and the paid-lease registrar; free and paid .thru registration with reviewed signing facts; faucet policy reads with a measured 10,000 base-unit cap; token discovery and storage-only cached balances; @thru 0.4.2; and 36 local suites green on 2026-10-27. Done does not mean released, and released does not mean verified.
`,
  },
  {
    slug: "changelog",
    title: "Changelog",
    description: "How to read listing versions, contract versions, package versions, and desk notes as different objects.",
    tag: "updates",
    markdown: `
This site keeps several clocks and refuses to merge them.

- **Listing version**, such as Chrome Web Store 1.4.1 on 2026-10-04. What Chrome installs.
- **Package version**, also 1.4.1 — and unchanged on main since 2026-10-03, which is why the release gap is invisible from the outside.
- **Contract version**, such as v15 in the published build, **v28 on main**, or a status document that still says v18. Three live numbers; say which.
- **Submission state**, which is not a version at all: submitted, approved, or rejected.
- **Desk notes**, which are rows in Postgres and can be added without a code change.

The rendered history is on the [changelog](/changelog). Authored entries live in \`src/content/changelog.ts\`. Desk notes are not a release. They are a ledger.

When you add a release, say which artifact moved. A contract bump that is not in the listing is not yet what Chrome will install — and between 2026-10-04 and 2026-10-27 there were thirteen of those in a row. A store update that does not bump the contract is still a release. A reviewed pull request is not a release at all — it is a promise with CI attached.
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
- Name registration preparation only after a person has reviewed the quote — the price and expiry are part of the signature at contract v28.
- Swap and launchpad preparation only after those programs are verified **and** an owner decision ships them. The flags are off today.

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
    description: "How an agent should read this site and the extension repository without overstating either.",
    tag: "AI",
    markdown: `
Read in this order when working on the extension:

1. \`AGENTS.md\`
2. \`docs/DOCS_INDEX.md\`
3. \`docs/STATUS_AND_ROADMAP.md\`
4. \`docs/DECISIONS.md\`
5. \`docs/BACKEND_GAPS.md\`
6. \`CONTEXT.md\`
7. [https://thru.org/docs/llm.txt](https://thru.org/docs/llm.txt)

For this website, start with [\`/llms.txt\`](/llms.txt) and [\`/llms-full.txt\`](/llms-full.txt).

## Rules that do not soften

- Do not request, store, print, or reveal a mnemonic, private key, or password.
- Do not invent protocol behavior, token fees, explorer routes, name prices, or a \`window.thru\` provider.
- Do not collapse the artifacts. The store serves 1.4.1 / contract v15 / 14 routes; main is 1.4.1 / contract v28 / 15 routes; the status document claims v18 with 124 methods. All three are live descriptions of this project.
- Do not quote \`docs/STATUS_AND_ROADMAP.md\` version numbers without checking \`src/shared/contract/manifest.js\`; on main at \`1b9d096\` the doc says v18 and 124 while the code exports 28 and 144.
- Do not treat a gated method as a feature. 43 DeFi methods exist and none is reachable.
- Do not mark a smoke check passed because a Node test passed, and do not mark a name flow verified because a backend probe reached the chain.
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
    description: "Where hero copy, features, docs, and desk notes are edited — and which numbers must never be guessed.",
    tag: "editing",
    markdown: `
Authored product copy is TypeScript, so a change is reviewable.

| File | What it feeds |
| --- | --- |
| src/content/site.ts | Name, warning, store link, listing facts, source contract facts, the store/source/doc tracks and the unverified block, nav |
| src/content/drift.ts | The gap between the store build and main: version numbers, the v16 → v28 timeline, and the capability list |
| src/content/features.ts | Feature groups and status badges |
| src/content/routes.ts | The 15-route table |
| src/content/security.ts | Principles, gaps, signing notes |
| src/content/architecture.ts | The layered flow, boundaries, and contract breaks |
| src/content/ai.ts | MCP policy tables and pasteable context |
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

The content layer exports things that must not be edited as if they were one:

- \`site.listing\` — only ever what the live Chrome Web Store page says. Re-read the page before touching it and record the date in \`verifiedOn\`. A submission, a merge, and a GitHub release are all forbidden from writing here; on 2026-10-27 a re-read confirmed nothing had changed since 2026-10-04.
- \`storeStatus\` — the package in front of the store and the date it was published. It also carries the distance: 13 contract versions and 23 days.
- \`release\` — the last merged, tagged source release (v1.4.1, cee006e). There has been no later tag.
- \`source\` and \`site.contract\` — the code facts on main at \`1b9d096\`: contract v28, 144 methods, 15 routes, @thru 0.4.2, 36 local suites.
- \`auditedDoc\` and \`unverified\` — what the repository still claims about itself, and what nobody has ticked. Both exist so that "shipped" is never allowed to read as "verified".

\`releaseTracks\` renders three of them on the status page and the homepage. When the store and the source converge — as they did on 2026-10-04 — say so; when they diverge — as they did on 2026-10-04 and every day since — say that too. Deleting a track is not allowed. The gap is the finding.
`,
  },
];

export function getDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}
