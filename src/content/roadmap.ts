export type RoadmapStatus = "open" | "blocked" | "done";

export interface RoadmapItem {
  step: string;
  title: string;
  status: RoadmapStatus;
  detail: string;
}

export const roadmap: RoadmapItem[] = [
  {
    step: "01",
    title: "Verify the package a real user can install",
    status: "open",
    detail:
      "1.4.1 is live on the Chrome Web Store as of 2026-10-04 and every row of docs/MANUAL_SMOKE_CHECKLIST.md is still unticked. Install the published package from the store — not a local dist/ — and run the 36 rows against it. Start with what is newest: duplicate detection while a transfer is still pending, desktop notification delivery and its Settings toggle, popup and side-panel mutual exclusion, and the dark-mode action grid, drawer ledger, and connection footer.",
  },
  {
    step: "02",
    title: "Merge the v16 chain with a package bump",
    status: "open",
    detail:
      "Pull requests #17 and #18 are stacked and mergeable, and they carry contract v16: tx.send and token.transfer are retired, 19 source files change, a storage-migrations suite is added, and docs/STATUS_AND_ROADMAP.md is finally rewritten to describe the code. What the chain does not do is bump the package number. Merging it as-is leaves main describing contract v16 under the same 1.4.1 string the store serves as contract v15. Bump the version in the same change.",
  },
  {
    step: "03",
    title: "Live v12 activation pass",
    status: "open",
    detail:
      "Create several HD accounts on betanet and exercise send just-in-time registration for an owned, absent recipient. Confirm the target signer and offline-versus-absent handling.",
  },
  {
    step: "04",
    title: "Token transfer and token lab live probe",
    status: "open",
    detail:
      "Measure the token-program fee and whether a sender-initialized token account can target a never-registered owner. The pending scripts/token-lab.mjs walks deploy, add, send, and receive — a live run is still the evidence, not the script's existence. Use a throwaway wallet. Do not guess the fee in the UI.",
  },
  {
    step: "05",
    title: "Betanet block time and explorer confirmation",
    status: "open",
    detail:
      "Betanet is documented at roughly six-second blocks, so a transfer should settle in about one block. Confirm block-time availability through the RPC, first-load latency, whether an authoritative fee exists outside the current detail call, and that the ?network=betanet explorer links resolve.",
  },
  {
    step: "06",
    title: "Custom network re-enable",
    status: "blocked",
    detail:
      "Keep activation disabled until HTTPS policy, narrow host permission, per-network capability records, and password re-auth land together. Localnet was removed from the shipped wallet for exactly this reason. Removing a legacy record is already allowed.",
  },
  {
    step: "07",
    title: "Provider contract watch",
    status: "blocked",
    detail:
      "Do not inject a browser provider until Thru publishes, and this project validates, an extension-compatible contract covering discovery, permission, approval, signing ownership, and submission.",
  },
];

export const completed = [
  "Legacy launchpad, DEX, and prediction surface deleted and guarded out of dist/.",
  "Route lifecycle tests mount all 14 routes in no-vault, locked, and unlocked states.",
  "Contract v7 quarantines custom networks at the background boundary.",
  "Contract v8 ships token transfer and real token balance reads. Live probe still open.",
  "Contract v12 adds owned-account registration and a storage-only history cache.",
  "Modal focus trapping and an explicit side-panel action, without replacing the toolbar popup.",
  "Released in v1.4.1: the 2026-09-26 chain reset tracked end to end — @thru 0.4.1 packages, managed-genesis program addresses, betanet RPC, and a CSP that allows nothing else.",
  "Released in v1.4.1: auto-lock measures real inactivity instead of restarting its own clock on every worker wake.",
  "Released in v1.4.1: contract v13 to v15, the token drawer, chain-verified custom tokens, desktop notifications, and duplicate detection across the whole pending window.",
  "PR #16 merged as cee006e with 20 suites and 1,641 assertions green, shipped as a tagged GitHub release, and published to the Chrome Web Store as 1.4.1 on 2026-10-04 — the listing copy, screenshots, and permission justifications went with it.",
] as const;
