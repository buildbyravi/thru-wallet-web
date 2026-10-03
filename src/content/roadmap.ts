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
    title: "Upload 1.4.1 to the Chrome Web Store",
    status: "open",
    detail:
      "The source half is done: PR #16 merged as cee006e and shipped as tag v1.4.1 on 2026-10-03. The store half is not. 1.4.0 was submitted and never published, 1.4.1 has not been uploaded, and the listing copy, five permission justifications, and store tiles are staged in extension.md and store-assets/ waiting for it. Run the manual smoke checklist before the upload, not after.",
  },
  {
    step: "02",
    title: "Run real Chrome smoke checks on v1.4.1",
    status: "open",
    detail:
      "Verify popup and side panel layout, focus, QR canvas, clipboard prompts, toolbar mode, mutual exclusion, desktop notification delivery, and MV3 worker restart. Give the newest changes the most attention: duplicate detection while a transfer is still pending, and the dark-mode action grid, drawer ledger, and connection footer. The canonical runbook is docs/MANUAL_SMOKE_CHECKLIST.md.",
  },
  {
    step: "03",
    title: "Rewrite the status document",
    status: "open",
    detail:
      "docs/STATUS_AND_ROADMAP.md still opens with contract v12 and 81 methods at 4aa55ba, three contract steps behind the code it claims to summarize. It is the file this site and every agent is told to read first.",
  },
  {
    step: "04",
    title: "Live v12 activation pass",
    status: "open",
    detail:
      "Create several HD accounts on betanet and exercise send just-in-time registration for an owned, absent recipient. Confirm the target signer and offline-versus-absent handling.",
  },
  {
    step: "05",
    title: "Token transfer and token lab live probe",
    status: "open",
    detail:
      "Measure the token-program fee and whether a sender-initialized token account can target a never-registered owner. The pending scripts/token-lab.mjs walks deploy, add, send, and receive — a live run is still the evidence, not the script's existence. Use a throwaway wallet. Do not guess the fee in the UI.",
  },
  {
    step: "06",
    title: "Betanet block time and explorer confirmation",
    status: "open",
    detail:
      "Betanet is documented at roughly six-second blocks, so a transfer should settle in about one block. Confirm block-time availability through the RPC, first-load latency, whether an authoritative fee exists outside the current detail call, and that the ?network=betanet explorer links resolve.",
  },
  {
    step: "07",
    title: "Custom network re-enable",
    status: "blocked",
    detail:
      "Keep activation disabled until HTTPS policy, narrow host permission, per-network capability records, and password re-auth land together. Localnet was removed from the shipped wallet for exactly this reason. Removing a legacy record is already allowed.",
  },
  {
    step: "08",
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
  "PR #16 merged as cee006e with 20 suites and 1,641 assertions green, and shipped as a tagged GitHub release.",
] as const;
