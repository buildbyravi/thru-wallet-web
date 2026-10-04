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
