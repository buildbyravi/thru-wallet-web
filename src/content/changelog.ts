export type ChangeTag = "RELEASE" | "FIX" | "DOCS" | "SECURITY";

export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  tag: ChangeTag;
  summary: string;
  changes: string[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "site",
    date: "2026-10-27",
    title: "Thirteen contract versions ahead, one version string",
    tag: "DOCS",
    summary:
      "The store listing was re-read and has not moved. Main has. The same 1.4.1 now describes an 83-method package and a 144-method tree, and the repository's own summaries describe neither.",
    changes: [
      "Listing re-read on 2026-10-27: version 1.4.1, updated 2026-10-04, 272 KiB, five screenshots, three users, and the October description. It has not been touched since publication.",
      "main at 1b9d096 exports CONTRACT_VERSION 28 with 144 methods — 101 wallet-core plus the 43-method DeFi surface — on @thru/sdk and @thru/programs 0.4.2, with 15 routes. package.json and src/manifest.json still say 1.4.1, and no tag after v1.4.1 exists.",
      "docs/STATUS_AND_ROADMAP.md still opens with contract v18 and 124 methods against a 2026-10-03 baseline, though it gained a 2026-10-27 Domain section. llms.txt in the same repository still says 14 routes and 0.4.1.",
      "docs/MANUAL_SMOKE_CHECKLIST.md re-counted: 100 checkbox cells across 64 lines, exactly one ticked — the popup /send cell from the 2026-10-04 partial run.",
      "The source was run locally on 2026-10-27: 36 suites green (2,082 checks, route lifecycle 1,041 over 15 routes) and a clean dist/ build. Deterministic and local; it certifies no browser.",
    ],
  },
  {
    version: "v28",
    date: "2026-10-27",
    title: "Domains: .thru only, and the reviewed facts ride with the signature",
    tag: "RELEASE",
    summary:
      "The Domain screen stops offering routes that cannot work and starts binding what the user reviewed to the transaction that is signed. It is source-only: the store package has never heard of domains.",
    changes: [
      "/name now offers one .thru registration path, selected from live registrar facts: the deployed custom registrar first, the official paid registry only when it is the available .thru route. .id stays lookup and resolution data.",
      "The signing request carries the reviewed network, account, price and expiry, and account switching is locked while a registration is pending. A reviewed quote cannot be swapped underneath a signature.",
      "One live .thru registration through the real background API router returned an on-chain execution result on 2026-10-27, and a follow-up Betanet read confirmed the test account as lease owner. The rendered sheet and the charged network fee remain unverified.",
      "The quote is 1,000 base units per year — 0.000001 THRU at nine decimals — read from the registrar's on-chain config, never hardcoded. The header fee is 0n; the program charges its own configured price to a treasury.",
      "The .id root resolves but is closed: its authority is a third-party key, and the chain refuses a foreign signer outright, so no mint call-to-action is rendered for it.",
    ],
  },
  {
    version: "v26 → v27",
    date: "2026-10-26",
    title: "Token discovery, cached-first painting, and a swap screen withdrawn inside a day",
    tag: "RELEASE",
    summary:
      "Two additive reads landed, and the DeFi swap slice shipped with its flags on before the owner withdrew the screen the same afternoon. The flags are off again; the backend stays.",
    changes: [
      "token.discover scans cached history for incoming token mints, verifies each mint on chain, and registers only chain-verified records. The dashboard calls it quietly after paint.",
      "token.getCachedBalances returns a storage-only snapshot of the last chain-verified token rows for an address on the active network, so no route has to wait on an RPC.",
      "AGENTS.md gains rule 15: the frontend never waits on a chain read before its first paint. Cached state or an explicit unknown, then hydrate. A route that shows only a spinner is treated as a defect.",
      "A real AMM swap executed on Betanet on 2026-10-26 and the capability was graduated to enabled; hours later the swap screen was un-shipped and every DEFI_* flag returned to false. The 43-method contract surface did not change either way.",
    ],
  },
  {
    version: "v25",
    date: "2026-10-25",
    title: "The custom .thru registrar joins the Domain screen",
    tag: "RELEASE",
    summary:
      "Rather than wait for an official paid registry that Betanet does not have, the repository carries its own registrar program — deployed, initialized, and proven with a live registration before the UI was allowed to offer it.",
    changes: [
      "The thru-custom-registrar deployed at ta2vDCBzzptN2qVZgz6PXsCp5cNB7Nef4yeQ3W-OqzZcfF, initialized its 144-byte config, and completed an end-to-end registration with vmError 0 on 2026-10-25.",
      "Two pure reads expose it: name.getCustomRegistrar and name.checkCustomLease. Root, fee and treasury are derived from the parsed on-chain config; an absent or unparseable config simply removes the provider.",
      "name.register gains optional via and years, routing to the custom registrar when via is 'custom'. An absent via keeps the previous behavior byte-identical.",
      "The SDK's 0.4.2 account list is byte-sorted, so the registrar ABI carries account-table indices in the instruction data and the program cross-checks treasury, root and target pubkeys. Discovery of that sort is why the ABI was revised before shipping.",
      "Custom lease renewal and claim are not wired, and the screen says so instead of offering a button. The official paid registry remains uninitialized on Betanet.",
    ],
  },
  {
    version: "v23 → v24",
    date: "2026-10-24",
    title: "Registration signs; the faucet learns its own limit",
    tag: "SECURITY",
    summary:
      "A name registration became a real broadcast with signing auth, and the faucet stopped discovering the rate limit by reverting into it.",
    changes: [
      "name.register leaves the gated surface and becomes a self-signed on-chain write: auth moves from unlocked to signing, fee 0n, first-party wire format. The root authority is pre-verified, so a closed root refuses before broadcast instead of failing on chain.",
      "tx.getFaucetLimit reads the on-chain rate-limit policy and the active account's own buckets. Unknown states are explicit — supported: false, keyReadable: false, null windows for slot-clocked rules — never invented numbers.",
      "Rate-limited vmErrors from tx.claimFaucet are relabelled FAUCET_RATE_LIMITED rather than surfacing as a generic chain failure.",
      "The cap is exactly 10,000 base units per transaction, measured live on 2026-10-24: 10,001 reverts with vmError −765, while repeated claims accumulate normally.",
    ],
  },
  {
    version: "0.4.2",
    date: "2026-10-23",
    title: "A Domain screen appears, and the packages move to 0.4.2",
    tag: "RELEASE",
    summary:
      "The wallet gained a fifteenth route and a dependency bump that changed how account tables are ordered on the wire. Both had to land before anything could register a name.",
    changes: [
      "/name mounts from a Domain tile in a services grid below the unchanged six-tile action grid, and is driven by one search field with a background availability check.",
      "@thru/sdk and @thru/programs move 0.4.1 → 0.4.2. The installed SDK byte-sorts account lists, proven by an in-process sort sentinel rather than assumed, which is why instruction data carries indices.",
      "The root suffix comes from the chain rather than a string constant: .thru is preferred when a registrar exists, .id is whatever lookup resolves.",
      "Contract v19 through v22 landed earlier in the month: name reads, the gated intent pipeline, primary-name records, and the paid-lease registrar surface.",
    ],
  },
  {
    version: "v17 → v19",
    date: "2026-10-08",
    title: "Forty-three DeFi methods, and name reads that answer the chain",
    tag: "RELEASE",
    summary:
      "One drop declared the whole DeFi surface behind flags that are false, and made the name service a read-live, write-gated module. None of it is a screen you can reach.",
    changes: [
      "v17 and v18 append 29 read/local methods and 14 prepare/execute methods: program discovery, market reads and a watchlist, risk assessment, launchpad drafts, dex pools, intents, and desktop.open. Only intent.submit signs, and it refuses FEATURE_DISABLED.",
      "v19 makes name.lookup, name.checkAvailability and name.getCanonicalRoot always-on truth asks while name.initRoot and name.setRecord stay gated. The canonical-root read is what lets the UI offer a root that actually exists on the running network.",
      "Every DEFI_* flag is a build-time constant with no URL and no storage override, and the launchpad quarantine test keeps the override surface inert.",
      "The same month's G-series work explores the live AMM and registry surfaces in scripts and evidence files. Exploration is not a screen.",
    ],
  },
  {
    version: "v20 → v22",
    date: "2026-10-10",
    title: "A real intent pipeline, a primary name, and paid .thru leases",
    tag: "RELEASE",
    summary:
      "The gated intent methods gained an implementation, the wallet gained a 'my name' record, and the official paid .thru registrar became a read-plus-write surface. All of it is still source only.",
    changes: [
      "v20 backs the intent methods with a network-scoped store and a bindingHash-pinned submit; resume and stopWaiting still answer NOT_READY for the later chain-wait slice, and DEFI_INTENT remains false.",
      "v21 adds the wallet-local, network-scoped primary-name record. Linking verifies on-chain ownership through the always-on lookup; nothing signs.",
      "v22 adds the official paid-lease registry reads plus purchase, renew and claim-expired, built from first-party formats with a 0n header fee — the registrar prices in its own payment token.",
      "None of it is reachable: the flags stay off and the only DeFi screen that ever shipped was withdrawn on 2026-10-26.",
    ],
  },
  {
    version: "v16",
    date: "2026-10-04",
    title: "Two signing paths retired, hours after the package was published",
    tag: "SECURITY",
    summary:
      "The unbound tx.send and token.transfer were removed once every shipped caller used a checked method. The store package, built before this merge, still contains them.",
    changes: [
      "83 methods become 81 — the first time this count has gone down. The v5 signing break set the precedent: removal after zero shipped callers is a versioned change, not a silent one.",
      "The checked methods bind the reviewed source account and network at the background boundary, and a signing guard blocks network switching from operation entry through submission.",
      "Merged as part of the 2026-10-04 audit chain, after 1.4.1 was built. So the package Chrome installs speaks contract v15 and main speaks v16 from the same day forward.",
      "No later tag was cut and the package version was never bumped, which is how the two artifacts ended up sharing one version string.",
    ],
  },
  {
    version: "1.4.1",
    date: "2026-10-04",
    title: "Live on the Chrome Web Store",
    tag: "RELEASE",
    summary:
      "Package 1.4.1 was approved and published. For the first time since this site started tracking it, the store build and the source tree are the same build.",
    changes: [
      "Listing now reads 1.4.1, updated 2026-10-04, 272 KiB, with five screenshots and a linked developer website at thruwallet.vercel.app. It replaced 1.2.0 from 2026-09-23, which was 209 KiB.",
      "The description was replaced along with the package: betanet rather than alphanet, plus the token drawer, verified custom tokens by contract address, live 30-second activity auto-sync, desktop notifications, and Ctrl+L.",
      "The Offered by PWNX0 row is no longer shown on the listing page, so this site no longer asserts a publisher name.",
      "Auto-lock is the one claim that used to be wrong in both directions: the listing had always advertised an inactivity lock while 1.2.0 ran a fixed-period alarm. 1.4.1 is the first package where the behavior and the sentence match.",
      "Published one day after the source release — merged 2026-10-03 as cee006e, tagged v1.4.1, approved 2026-10-04. Submission, merge, and publication stayed three separate events to the end.",
      "Unchanged: docs/STATUS_AND_ROADMAP.md still claims contract v12 with 81 methods, and all 36 rows of docs/MANUAL_SMOKE_CHECKLIST.md are still unticked.",
    ],
  },
  {
    version: "1.4.1",
    date: "2026-10-03",
    title: "Merged and released — the betanet build is tagged v1.4.1",
    tag: "RELEASE",
    summary:
      "PR #16 merged into main as cee006e and shipped as GitHub release v1.4.1. The source is betanet now; the store package is not.",
    changes: [
      "Merged at 13:56 UTC and tagged thirteen seconds later, carrying Design System v2, betanet, @thru 0.4.1, the token drawer, chain-verified custom tokens, desktop notifications, and the send hardening pass.",
      "Numbered 1.4.1 rather than 1.4.0 because 1.4.0 was submitted to the store and never published, so no released version is skipped.",
      "Contract v15 with 83 declared methods is what main exports. This site reads its source facts from cee006e.",
      "Gate at merge: 20 suites and 1,641 assertions green, plus the CI build-and-test job.",
      "Still not installable from the store. The listing serves 1.2.0 until someone uploads the 1.4.1 package and a reviewer approves it.",
      "docs/STATUS_AND_ROADMAP.md was not touched by the merge and still claims contract v12 with 81 methods at 4aa55ba.",
    ],
  },
  {
    version: "1.4.0",
    date: "2026-10-03",
    title: "Submitted to the Chrome Web Store — never published",
    tag: "RELEASE",
    summary:
      "The betanet package is with Chrome's reviewers. Submitted is not published: the listing keeps serving 1.2.0 until a reviewer approves, and the public page is the only thing this site treats as proof.",
    changes: [
      "Package 1.4.0 submitted with the rewritten betanet description and the fifth permission, notifications, justified in the dashboard.",
      "The live listing page re-read on 2026-10-03 still reports 1.2.0, 2026-09-23, 209 KiB — unchanged, as expected during review.",
      "Source side: PR #16 is in final review at 9086b22, with @thru/sdk and @thru/programs synced to 0.4.1.",
      "This site tracks submission and merge as two separate events, because a rejection moves one without the other.",
    ],
  },
  {
    version: "site",
    date: "2026-10-02",
    title: "Three clocks: store build, source baseline, pending 1.4.0",
    tag: "DOCS",
    summary:
      "The extension's betanet work is reviewed and CI-green on an open pull request, so this site now tracks it as a third, clearly separate object instead of folding it into either shipped artifact.",
    changes: [
      "Pending release block records PR #16 at 1338380: package 1.4.0, contract v15, 83 methods, @thru 0.4.0, betanet RPC.",
      "Chrome Web Store facts re-verified against the live listing on 2026-10-02 and left at 1.2.0 / 2026-09-23 / 209 KiB.",
      "Alphanet wording replaced with betanet where the project's target chain is meant, and kept where the shipped package is meant.",
      "Auto-lock copy corrected: the pending build measures real inactivity, so the old 'the source says fixed-period alarm' gap is retired on merge, not before.",
    ],
  },
  {
    version: "1.4.0",
    date: "2026-10-02",
    title: "Betanet migration, token drawer, desktop notifications — pending",
    tag: "RELEASE",
    summary:
      "Package 1.4.0 exists as reviewed source on an open pull request. It is not merged to main and it is not what Chrome installs today.",
    changes: [
      "Betanet is the default and only enabled network: rpc.betanet.thru.org, explorer links carry ?network=betanet, and the CSP connect-src allows nothing else.",
      "Program addresses come from @thru/programs 0.4.0 managed-genesis registry instead of the reverse-engineered marker-byte addresses the 2026-09-26 chain reset deleted.",
      "The balance box is the token entry: click it and a sliding drawer lists tokens, searches, and adds a custom token by contract address after the chain supplies symbol and decimals.",
      "Optional desktop notifications on transaction confirm or fail, which is the fifth manifest permission and a Settings toggle.",
      "Auto-lock now measures real inactivity, the faucet no longer demands a signing password, and a repeat transfer inside 30 seconds is detected before it is signed.",
      "Localnet is gone from the shipped wallet and the manifest homepage points at thruwallet.vercel.app.",
      "Packages tracked the chain twice: 0.3.16 to 0.4.0 for the managed-genesis reset, then a 0.4.1 sync at 9086b22.",
    ],
  },
  {
    version: "v13 → v15",
    date: "2026-10-02",
    title: "Contract moves to v15, 83 methods",
    tag: "SECURITY",
    summary:
      "Three contract steps ride with the pending package: one deliberate behavior break and two additive reads. Append-only discipline holds for everything else.",
    changes: [
      "v13 modifies tx.claimFaucet: auth drops from signing to unlocked and the vestigial password param leaves the declaration. Old callers that still send one are ignored, not rejected.",
      "v14 appends token.readMint so a pasted contract address is verified on-chain before a custom token joins the ledger.",
      "v15 appends tx.checkDuplicate for repeat transfers inside 30 seconds or still in flight, plus an optional allowDuplicate on the send methods.",
      "Method count moves 81 → 83. The UI-to-background agreement is still enforced in both directions by test-contract.mjs.",
    ],
  },
  {
    version: "site",
    date: "2026-09-26",
    title: "Dossier site, with the store as the install path",
    tag: "RELEASE",
    summary:
      "This website now leads with the Chrome Web Store listing and keeps source install, docs, and the v12 status baseline in the same dossier.",
    changes: [
      "Chrome Web Store link on the header, homepage, install page, footer, llms.txt, and catalog API.",
      "Listing facts recorded beside the source baseline so the two versions are not collapsed into one.",
      "Docs hub, architecture flow, security principles, agent policy, and a Postgres-backed desk ledger.",
    ],
  },
  {
    version: "v12",
    date: "2026-09-26",
    title: "Status baseline: contract v12, 81 methods",
    tag: "DOCS",
    summary:
      "The extension status document, audited at commit 4aa55ba, is the source baseline this site describes. It is newer than the packaged listing.",
    changes: [
      "tx.registerAccount for an exact vault-owned address, unlocked-only, no value transfer.",
      "tx.getCachedHistory for cache-first History paint, scoped by network and address.",
      "Send review waits for just-in-time activation and shows the matched recipient label as display-only.",
      "Signing password re-auth remains opt-in. The default is session signing while unlocked.",
    ],
  },
  {
    version: "1.2.0",
    date: "2026-09-23",
    title: "Chrome Web Store listing",
    tag: "RELEASE",
    summary:
      "Thru Wallet is listed as an experimental self-custody wallet for Thru alphanet. Version 1.2.0, 209 KiB, offered by PWNX0.",
    changes: [
      "Store id ocahgpmgfeapjnceaknkikanjikhjgok.",
      "Disclosed privacy posture: data is not collected. Policy lives in the extension repository.",
      "Listing copy mentions a 15-minute lock. The source describes that timer as a fixed-period alarm, not inactivity detection.",
      "The listing is explicit: not affiliated with Unto Labs, and not for real financial value.",
    ],
  },
  {
    version: "v8",
    date: "2026-09-18",
    title: "Token transfer shipped in code",
    tag: "SECURITY",
    summary:
      "Token methods sit on official @thru/programs/token bindings. Live fee and recipient-owner questions stayed open on purpose.",
    changes: [
      "token.transfer uses signing auth and mint units, never THRU units.",
      "A missing recipient token account can be initialized by the sender first.",
      "Failed balance reads stay unknown. They are not rendered as zero.",
    ],
  },
  {
    version: "v7",
    date: "2026-09-18",
    title: "Custom networks quarantined",
    tag: "SECURITY",
    summary:
      "Settings no longer offers Add custom network. The background also refuses activation, including direct API calls and stale storage.",
    changes: [
      "network.setActive accepts enabled built-ins only.",
      "A custom id returns CUSTOM_NETWORK_DISABLED.",
      "Legacy rows remain visible so they can be removed.",
    ],
  },
  {
    version: "v6",
    date: "2026-09-18",
    title: "Reset and auto-lock hardened",
    tag: "SECURITY",
    summary: "Destructive and security-timer changes are enforced in the background, not only by the form that triggered them.",
    changes: [
      "Reset requires confirmation and an unlocked-wallet password check.",
      "Auto-lock changes are password-gated.",
      "Generic settings writes reject security-sensitive keys.",
    ],
  },
];
