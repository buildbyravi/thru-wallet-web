import { drift } from "@/content/drift";

export const chromeStoreUrl =
  "https://chromewebstore.google.com/detail/thru-wallet/ocahgpmgfeapjnceaknkikanjikhjgok";

export const extensionId = "ocahgpmgfeapjnceaknkikanjikhjgok";

// This site is the canonical home for the policy; the repository link is no longer used for it.
export const siteUrl = "https://thruwallet.vercel.app";
export const privacyUrl = `${siteUrl}/privacy`;

// The 144 methods, split by what the auth policy demands before a call is allowed. These four
// numbers used to be literals inside llms.ts, where a contract change would have left them
// silently wrong. `assertMethodSplit()` below keeps the parts and the total honest at build time.
const methodSplit = {
  callableWhenLocked: 72,
  callableUnlocked: 51,
  passwordGated: 12,
  signingGated: 9,
} as const;

function assertMethodSplit() {
  const parts = Object.values(methodSplit).reduce((sum, value) => sum + value, 0);
  if (parts !== drift.sourceMethods) {
    throw new Error(
      `site.contract method split sums to ${parts}, but drift.sourceMethods is ${drift.sourceMethods}. ` +
        "Update methodSplit in src/content/site.ts when the contract changes.",
    );
  }
}

assertMethodSplit();

export const site = {
  name: "Thru Wallet",
  shortName: "Thru",
  descriptor: "An experimental, self-custody browser extension for Thru's native Layer 1 betanet.",
  summary:
    "Thru Wallet is an unofficial, high-performance browser extension for personal key management, transfers, and .thru name registration on the Thru betanet — built on the real @thru/sdk and @thru/programs packages.",
  disclaimer:
    "Community-built, open-source software for the Thru betanet testnet. Not affiliated with or endorsed by Unto Labs. Not audited. Do not use with real financial value.",
  baselineCommit: drift.sourceCommit,
  routesCount: drift.sourceRoutes,
  status: "ALPHA" as const,
  warning:
    "Not production-ready and not security-reviewed. Use betanet testnet funds only. This is community software, not affiliated with or endorsed by Unto Labs. Do not use it with real financial value.",
  repos: {
    extension: "https://github.com/buildbyravi/thru-wallet-ext",
    website: "https://github.com/buildbyravi/thru-wallet-web",
  },
  links: {
    chromeStore: chromeStoreUrl,
    privacy: "/privacy",
    explorer: "https://scan.thru.org",
    thruDocs: "https://thru.org/docs",
    thruLlmTxt: "https://thru.org/docs/llm.txt",
    explorerMcp: "https://scan.thru.org/api/mcp",
    embeddedWallet: "https://thru.org/docs/wallet/embedded-wallet-integration/",
    statusDoc:
      "https://github.com/buildbyravi/thru-wallet-ext/blob/main/docs/STATUS_AND_ROADMAP.md",
    smokeDoc:
      "https://github.com/buildbyravi/thru-wallet-ext/blob/main/docs/MANUAL_SMOKE_CHECKLIST.md",
    decisions: "https://github.com/buildbyravi/thru-wallet-ext/blob/main/docs/DECISIONS.md",
    backendGaps: "https://github.com/buildbyravi/thru-wallet-ext/blob/main/docs/BACKEND_GAPS.md",
    contractManifest:
      "https://github.com/buildbyravi/thru-wallet-ext/blob/main/src/shared/contract/manifest.js",
    license: "https://github.com/buildbyravi/thru-wallet-ext/blob/main/LICENSE",
    releasedPr: "https://github.com/buildbyravi/thru-wallet-ext/pull/16",
    latestMerge: "https://github.com/buildbyravi/thru-wallet-ext/pull/20",
    release: "https://github.com/buildbyravi/thru-wallet-ext/releases/tag/v1.4.1",
    telegramChannel: "https://t.me/walletext",
    telegramGroup: "https://t.me/+dA8TwsOECcIxZWZl",
  },
  // Re-read against the live Chrome Web Store page on 2026-10-27. Only a changed public page may
  // write to this block. Everything below is what that page showed: still 1.4.1, still the
  // October 4 update, and still the October 4 description — no mention of domains, token
  // discovery or 0.4.2, because none of those are in this package.
  listing: {
    version: "1.4.1",
    updated: "2026-10-04",
    previousVersion: "1.2.0",
    previousUpdated: "2026-09-23",
    previousNetwork: "alphanet",
    developerSite: "https://thruwallet.vercel.app/",
    size: "272 KiB",
    languages: "English",
    blurb: "High-performance self-custody wallet and key manager for Thru.",
    network: "betanet",
    verifiedOn: "2026-10-27",
    permissions: 5,
    screenshots: 5,
    users: "3 users",
    rating: "no ratings",
    dataCollection: "declares no data collected",
  },
  // What that listing contains, read from the package it was built from. The gap between this
  // block and `site.contract` below is the entire point of this site.
  storeBuild: {
    contract: drift.storeContract,
    methods: drift.storeMethods,
    routes: drift.storeRoutes,
    sdk: drift.storePackages,
    commit: "cee006e",
    publishedOn: drift.storeDate,
  },
  // The extension's `main` branch on 2026-10-27 at 1b9d096. These are CODE facts, read from
  // src/. `auditedCommit`/`auditedOn` deliberately still point at 4aa55ba: the repository's own
  // status document has not been rewritten to describe v28, and this site refuses to launder
  // that. The package number has not moved either — it is still 1.4.1.
  contract: {
    version: drift.sourceContract,
    methods: drift.sourceMethods,
    walletCore: drift.sourceWalletCore,
    defi: drift.sourceDefi,
    name: 17,
    popupWidthPx: 400,
    domSinks: 0,
    sdk: "@thru/sdk@0.4.2",
    programs: "@thru/programs@0.4.2",
    kdf: "PBKDF2-SHA256 · 600,000",
    cipher: "AES-256-GCM",
    ...methodSplit,
    unit: "THRU is displayed at nine decimals",
    auditedCommit: "4aa55ba",
    auditedOn: "2026-09-26",
    network: "betanet",
    package: drift.packageVersion,
    commit: drift.sourceCommit,
    mergedOn: drift.sourceDate,
    checkedOn: "2026-10-27",
  },
  network: "Betanet testnet only",
  nav: [
    { href: "/", label: "Overview" },
    { href: "/install", label: "Install" },
    { href: "/features", label: "Features" },
    { href: "/architecture", label: "Architecture" },
    { href: "/security", label: "Security" },
    { href: "/status", label: "Status" },
    { href: "/changelog", label: "Changelog" },
    { href: "/docs", label: "Docs" },
    { href: "/agents", label: "Agents" },
  ],
} as const;

// The store caught up on 2026-10-04 and then stopped. The package published that day is still
// the only installable one: same version string, same update date, same description, same 3
// users on the listing. It is 13 contract versions and 23 days behind main.
export const storeStatus = {
  state: "published" as "upload-pending" | "in-review" | "published",
  stateLabel: "Published 2026-10-04",
  sentenceLabel: "live on the Chrome Web Store",
  version: "1.4.1",
  supersededSubmission: "1.4.0",
  publishedOn: "2026-10-04",
  submittedOn: "2026-10-03",
  daysBehindSource: drift.days,
  contractVersionsBehind: drift.contractVersions,
  verifiedOn: "2026-10-27",
  note:
    "The listing was re-read on 2026-10-27 and has not moved: version 1.4.1, updated 2026-10-04, 272 KiB, five screenshots, three users, and the same description that shipped with the betanet package. Nothing in the last three weeks of source work — the Domain screen, token discovery, the 0.4.2 packages, any of contract v16 through v28 — is in the package Chrome installs.",
} as const;

// The last source release. PR #16 merged as `cee006e` and shipped as tag v1.4.1 on 2026-10-03.
// No later tag exists, which is why the store and main still answer to the same version string.
export const release = {
  state: "published" as "open" | "merged" | "released" | "published",
  version: "1.4.1",
  tag: "v1.4.1",
  url: "https://github.com/buildbyravi/thru-wallet-ext/releases/tag/v1.4.1",
  publishedOn: "2026-10-03",
  mergeCommit: "cee006e",
  pr: 16,
  prUrl: "https://github.com/buildbyravi/thru-wallet-ext/pull/16",
  headline: "Design System v2, betanet + @thru 0.4.1, token drawer, send hardening",
  contract: drift.storeContract,
  methods: drift.storeMethods,
  sdk: "@thru/sdk@0.4.1",
  programs: "@thru/programs@0.4.1",
  network: "betanet",
  rpc: "https://rpc.betanet.thru.org",
  blockSeconds: 6,
  permissions: ["storage", "alarms", "sidePanel", "clipboardRead", "notifications"],
  routes: drift.storeRoutes,
  tests: "20 suites · 1,641 assertions at release",
  checkedOn: "2026-10-27",
  note:
    "Read from the extension repository at cee006e: package 1.4.1, contract v15 with 83 methods, @thru packages at 0.4.1, and a CSP whose only connect-src is the betanet RPC. Merged 2026-10-03, tagged the same minute, published to the store the next day. No tag has been cut since.",
  stillLatestTag: true,
} as const;

// Main as of 1b9d096. The package version did not move with the code; this is the block that
// says so with numbers rather than adjectives.
export const source = {
  commit: drift.sourceCommit,
  mergedOn: drift.sourceDate,
  package: drift.packageVersion,
  latestTag: drift.latestTag,
  contract: drift.sourceContract,
  methods: drift.sourceMethods,
  walletCore: drift.sourceWalletCore,
  defi: drift.sourceDefi,
  routes: drift.sourceRoutes,
  sdk: "@thru/sdk@0.4.2",
  programs: "@thru/programs@0.4.2",
  network: "betanet",
  rpc: "https://rpc.betanet.thru.org",
  permissions: ["storage", "alarms", "sidePanel", "clipboardRead", "notifications"],
  tests: "36 suites · 2,082 checks",
  checkedOn: "2026-10-27",
  note:
    "Ran locally on 2026-10-27: npm test green across 36 suites (route lifecycle 1,041 checks over 15 routes, contract 157, launchpad quarantine 66, DeFi M0 99, name service 67, DOM 130, and 2,082 `ok` lines in total), and npm run build produced dist/ without warnings. All of that is deterministic and local. It says nothing about a browser.",
} as const;

// The repository's own status document, re-read on 2026-10-27. It gained a Domain section on
// 2026-10-27 but still opens with the 2026-10-09 baseline: contract v18, 124 methods.
export const auditedDoc = {
  version: "v18",
  methods: 124,
  commit: "7883219",
  date: "2026-10-03",
  state: "ten versions behind",
  checkedOn: "2026-10-27",
  note:
    "docs/STATUS_AND_ROADMAP.md still opens with \"Contract v18, 124 methods\" against a baseline reviewed on 2026-10-03, while src/shared/contract/manifest.js exports CONTRACT_VERSION 28 with 144 methods. The document did get a 2026-10-27 Domain section — real evidence, correctly scoped — but the headline identifiers were not refreshed with it. llms.txt in the same repository still says 14 routes and @thru 0.4.1. This site quotes src/ for code facts and the document only for what the document says.",
} as const;

// What nobody has done yet. Re-read on 2026-10-27: the runbook now holds 100 checkbox cells
// across 64 lines, and exactly one is ticked — the `/send` popup cell from the 2026-10-04
// partial run. The recording block at the end of the file still says "routes: 14/14" while the
// wallet has 15 routes, which is its own small evidence of drift.
export const unverified = {
  rows: 64,
  cells: 100,
  checked: 1,
  doc: "docs/MANUAL_SMOKE_CHECKLIST.md",
  checkedOn: "2026-10-27",
  note:
    "One ticked cell out of one hundred. The single pass is a popup-only native betanet send to the tester's own account on 2026-10-04, recorded honestly as a partial run with the charged fee uncaptured. Everything since — the Domain screen and its signed registration, token discovery, cached-first painting, notification delivery, the side panel at any width — has never been opened in a browser by anyone who recorded it.",
} as const;

// Three artifacts. The store build and the source tree were last the same build on 2026-10-04; the
// status document has never described either during that window. This block replaces the retired
// "incoming chain" track — those PRs merged, the chain landed, and nobody bumped the package.
export const releaseTracks = [
  {
    key: "store",
    label: "Chrome Web Store",
    value: site.listing.version,
    pill: storeStatus.stateLabel,
    meta: `Contract ${drift.storeContract} · ${drift.storeMethods} methods · ${drift.storePackages} · ${drift.storeRoutes} routes`,
    detail:
      "What Chrome installs today. Published 2026-10-04 and untouched since: the listing still carries the October description and the October screenshots, and it reports three users. Thirteen contract versions of work are not in it.",
    href: chromeStoreUrl,
    hrefLabel: "Open the listing",
  },
  {
    key: "source",
    label: "Source · main",
    value: drift.sourceContract,
    pill: `${drift.sourceCommit} · package still ${drift.packageVersion}`,
    meta: `${drift.sourceMethods} methods · ${drift.sourcePackages} · ${drift.sourceRoutes} routes · ${drift.days} days after the store build`,
    detail:
      "The tree itself: a Domain screen, token auto-discovery, cached-first painting, and contract v16 through v28. The package manifest never moved past 1.4.1 and no tag was cut, so a build from main calls itself the same version as the store build.",
    href: `https://github.com/buildbyravi/thru-wallet-ext/commit/${drift.sourceCommit}`,
    hrefLabel: `Commit ${drift.sourceCommit}`,
  },
  {
    key: "audited",
    label: "Audited status doc",
    value: auditedDoc.version,
    pill: auditedDoc.state,
    meta: `${auditedDoc.methods} methods · baseline ${auditedDoc.date} · ${auditedDoc.commit}`,
    detail:
      "The repository's own summary, which now describes a contract ten versions old while claiming a baseline from 2026-10-03. It is not the shipped build and it is not main. It is a third clock, and it is the slowest.",
    href: site.links.statusDoc,
    hrefLabel: "STATUS_AND_ROADMAP.md",
  },
] as const;

export const heroMetrics = [
  {
    label: "Store build",
    value: site.listing.version,
    note: `Contract ${drift.storeContract} · published ${site.listing.updated}`,
  },
  {
    label: "Source contract",
    value: drift.sourceContract,
    note: `${drift.sourceMethods} methods · ${drift.sourceRoutes} routes · unreleased`,
  },
  {
    label: "Smoke cells ticked",
    value: `${unverified.checked} of ${unverified.cells}`,
    note: "One popup send, 2026-10-04, charged fee unknown",
  },
  {
    label: "Vault",
    value: "600k",
    note: "PBKDF2 rounds, then AES-GCM",
  },
] as const;

// The one new product surface a person can name. Numbers are chain facts from the extension's
// own evidence files, not from the store description, which has never heard of domains.
export const domains = {
  route: "/name",
  provider: "custom registrar",
  root: "thru",
  registrarProgram: "ta2vDCBzzptN2qVZgz6PXsCp5cNB7Nef4yeQ3W-OqzZcfF",
  feePerYear: "0.000001 THRU",
  feePerYearHuman: "per year, at nine decimals",
  deployedOn: "2026-10-25",
  firstLiveRegister: "2026-10-27",
  readProbe: "2026-10-26",
  officialRegistry: "not initialized on Betanet",
  idRoot: "resolves, authority is third-party",
  note:
    "The Domain screen offers .thru only: the deployed custom registrar first, the official paid registry when it is the available .thru route. It does not mint beneath .id, whose root authority is another key and which the chain refuses foreign signers for. Registration is a signed broadcast with a 0n header fee; the registrar charges its own configured 0.000001 THRU per year into a treasury. One live registration through the real background API router produced an on-chain execution result and a lease owned by the test account on 2026-10-27; the rendered review sheet was not exercised, and the charged network fee was not captured.",
} as const;
