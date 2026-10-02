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
    title: "Land and publish the betanet build",
    status: "open",
    detail:
      "Package 1.4.0 is reviewed and CI-green on PR #16 at 1338380, but the extension's main branch is still contract v12 on @thru 0.3.16, and the Chrome Web Store still serves the 1.2.0 alphanet package with alphanet listing copy. Merging, submitting, and mirroring the store text in extension.md is one unit of work, not three.",
  },
  {
    step: "02",
    title: "Run real Chrome smoke checks",
    status: "open",
    detail:
      "Verify popup and side panel layout, focus, QR canvas, clipboard prompts, toolbar mode, mutual exclusion, desktop notification delivery, and MV3 worker restart. The canonical runbook is docs/MANUAL_SMOKE_CHECKLIST.md.",
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
  "Pending: the 2026-09-26 chain reset tracked end to end — @thru 0.4.0 packages, managed-genesis program addresses, betanet RPC, and a CSP that allows nothing else.",
  "Pending: auto-lock measures real inactivity instead of restarting its own clock on every worker wake.",
] as const;
