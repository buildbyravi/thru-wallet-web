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
    title: "Run real Chrome smoke checks",
    status: "open",
    detail:
      "Verify popup and side panel layout, focus, QR canvas, clipboard prompts, toolbar mode, mutual exclusion, and MV3 worker restart. The canonical runbook is docs/MANUAL_SMOKE_CHECKLIST.md.",
  },
  {
    step: "02",
    title: "Live v12 activation pass",
    status: "open",
    detail:
      "Create several HD accounts on a selected safe network and exercise send just-in-time registration for an owned, absent recipient. Confirm the target signer and offline-versus-absent handling.",
  },
  {
    step: "03",
    title: "Token transfer live probe",
    status: "open",
    detail:
      "Measure the token-program fee and whether a sender-initialized token account can target a never-registered owner. Use a throwaway wallet. Do not guess the fee in the UI.",
  },
  {
    step: "04",
    title: "History and explorer confirmation",
    status: "open",
    detail:
      "Confirm block-time availability, first-load latency, whether an authoritative fee exists outside the current RPC detail, and the explorer transaction route. /tx/ and /account/ are convention until confirmed.",
  },
  {
    step: "05",
    title: "Custom network re-enable",
    status: "blocked",
    detail:
      "Keep activation disabled until HTTPS policy, narrow host permission, per-network capability records, and password re-auth land together. Removing a legacy record is already allowed.",
  },
  {
    step: "06",
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
] as const;
