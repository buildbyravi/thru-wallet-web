export type FeatureStatus = "STABLE" | "ALPHA" | "NEW" | "PLANNED";
export type FeatureGroup =
  | "Wallet Core"
  | "Daily Use"
  | "Name Service"
  | "Token Work"
  | "DeFi (gated)"
  | "Future Modules";

export interface Feature {
  title: string;
  body: string;
  status: FeatureStatus;
  group: FeatureGroup;
}

export const featureGroups: FeatureGroup[] = [
  "Wallet Core",
  "Daily Use",
  "Name Service",
  "Token Work",
  "DeFi (gated)",
  "Future Modules",
];

export const features: Feature[] = [
  {
    title: "Create and import wallets",
    body: "Generate a recovery phrase, import an existing phrase, or import a private key. Key material is created locally. The extension does not ask a page, agent, or remote service to hold it.",
    status: "STABLE",
    group: "Wallet Core",
  },
  {
    title: "Multiple accounts, one wallet",
    body: "Derive further HD accounts from a seed keyring. A private-key-only vault cannot derive new accounts — that limit is intentional, not a missing button.",
    status: "STABLE",
    group: "Wallet Core",
  },
  {
    title: "Multi-seed keyring vault",
    body: "Several seed and private-key keyrings can sit side by side. Labels, the active account, and keyring metadata stay in the background, not in the page.",
    status: "STABLE",
    group: "Wallet Core",
  },
  {
    title: "Password-encrypted local storage",
    body: "PBKDF2 with 600,000 SHA-256 iterations, then AES-256-GCM. Ciphertext lives in chrome.storage.local. Decrypted vault data lives only in chrome.storage.session and is wiped when the browser session ends.",
    status: "STABLE",
    group: "Wallet Core",
  },
  {
    title: "Configurable auto-lock",
    body: "Default 15 minutes, configurable from 0 to 240, and changing it is password-gated. Every API request stamps activity and background sync does not count, so the window measures idleness rather than its own heartbeat. Ctrl+L locks immediately. Shipped in the 1.4.1 package.",
    status: "STABLE",
    group: "Wallet Core",
  },
  {
    title: "Routes paint before the network answers",
    body: "Balances, token rows and history paint from network-scoped storage and are replaced when the chain replies. A dead RPC produces labelled stale data or an explicit unknown, never a spinner that owns the screen. This is AGENTS.md rule 15, dated 2026-10-26, and it is in the source only.",
    status: "NEW",
    group: "Wallet Core",
  },
  {
    title: "Security posture, computed not promised",
    body: "The dashboard's security checks are derived from state the background already owns: signing re-auth, auto-lock window, keyring origin, backup state. A value that cannot be read says unknown instead of grading itself.",
    status: "STABLE",
    group: "Wallet Core",
  },
  {
    title: "Balances in human-scale THRU",
    body: "1 THRU = 1e9 base units. The human amount is primary. Raw units stay visible underneath so a faucet credit of 10000 base units cannot be mistaken for 10000 THRU.",
    status: "STABLE",
    group: "Daily Use",
  },
  {
    title: "Account creation and faucet claims",
    body: "Create the on-chain account and claim from the faucet where the active network supports one. Betanet's faucet is a managed program whose vault credits 10,000 base units per claim.",
    status: "STABLE",
    group: "Daily Use",
  },
  {
    title: "A faucet that reads the policy first",
    body: "Contract v24 adds tx.getFaucetLimit: the claim screen reads the on-chain rate-limit policy and this account's own buckets, so a refusal is explained before a transaction is built. Rate-limited chain errors now surface as FAUCET_RATE_LIMITED instead of a generic failure. The cap is exactly 10,000 base units per transaction — 10,001 reverts — measured live on 2026-10-24. Source only.",
    status: "NEW",
    group: "Daily Use",
  },
  {
    title: "Native sends and decoded history",
    body: "Review precedes send, and the reviewed account and network are pinned in the background. History is one flat stream: a known time comes from the containing block, otherwise the row shows Block <slot> instead of an invented date. The feed refreshes every 30 seconds while it is open.",
    status: "STABLE",
    group: "Daily Use",
  },
  {
    title: "Repeat-transfer detection",
    body: "Contract v15's tx.checkDuplicate catches the same recipient and amount inside 30 seconds, or a transfer still in flight, before signing. The duplicate card covers the whole pending window and the send continues only with an explicit allowDuplicate the backend enforces. Shipped in 1.4.1.",
    status: "STABLE",
    group: "Daily Use",
  },
  {
    title: "Desktop notifications",
    body: "A native notification when a transaction confirms or fails, so a closed popup is not a blind spot. It is the fifth manifest permission, a Settings toggle, and the message carries no amount, address, or signature. In the store package since 2026-10-04; still no recorded browser run of an actual delivered notification.",
    status: "ALPHA",
    group: "Daily Use",
  },
  {
    title: "Popup and side panel, mutually exclusive",
    body: "The shared page is 400px in the toolbar popup. Side Panel Mode is an explicit Settings choice and calls chrome.sidePanel.open() from a user gesture. It never calls setPanelBehavior, so the toolbar icon still opens the popup unless the user asked otherwise.",
    status: "STABLE",
    group: "Daily Use",
  },
  {
    title: "Receive address and QR",
    body: "The receive route shows the address and a canvas QR. Explorer links point at scan.thru.org and carry ?network=betanet. Canvas paint, clipboard prompts, and the exact explorer path are still manual browser checks.",
    status: "ALPHA",
    group: "Daily Use",
  },
  {
    title: "Account pin, hide, and order",
    body: "Labels, hiding, pinning, and ordering are part of the shipped account routes. Contacts CRUD on top of the contacts.* backend is still a follow-up screen, not a promised address book.",
    status: "ALPHA",
    group: "Daily Use",
  },
  {
    title: "A Domain screen",
    body: "A fifteenth route, reached from a Domain tile beside Send and Receive. One search field, a debounced availability check in the background, and a status line that names the root it is actually asking about. Typing never waits on the chain.",
    status: "NEW",
    group: "Name Service",
  },
  {
    title: "Register a .thru name",
    body: "Type a label, pick 1 to 10 years, read a quote derived from the on-chain registrar config, confirm in a sheet, sign. On Betanet the deployed custom registrar is the live .thru route at 1,000 base units per year — 0.000001 THRU at nine decimals — and the official paid registry is not initialized. One registration through the real background router produced an on-chain result and a lease owned by the test account on 2026-10-27.",
    status: "NEW",
    group: "Name Service",
  },
  {
    title: "A primary name on the dashboard",
    body: "Link a name you provably own and the dashboard shows it. Linking verifies ownership with the always-on lookup read; it is a wallet-local, network-scoped record, not an on-chain claim, and it can be unlinked.",
    status: "NEW",
    group: "Name Service",
  },
  {
    title: ".id resolves; it does not mint",
    body: "The .id root exists on Betanet and name.lookup resolves beneath it. Its authority is a third-party key, so the chain refuses a foreign signer outright. The Domain screen therefore offers .thru registration only, and says why rather than showing a button that cannot work.",
    status: "ALPHA",
    group: "Name Service",
  },
  {
    title: "Renew, and the limits of My Domains",
    body: "Renewal is wired for official paid-registry leases, which do not exist on Betanet yet. Custom-registrar renewal is not wired, and the backend cannot enumerate every domain an account owns — My Domains shows the one name you linked after a fresh ownership check. The screen says both things.",
    status: "ALPHA",
    group: "Name Service",
  },
  {
    title: "Token balances, honestly",
    body: "token.getBalances reads official @thru/programs/token bindings. A missing token account is a proven zero. A failed read is unknown — never a fabricated 0. Decimals come from the mint when a balance exists.",
    status: "ALPHA",
    group: "Token Work",
  },
  {
    title: "Tokens that announce themselves",
    body: "token.discover scans cached history for incoming token mints, verifies each mint on chain, and registers only what the chain confirms. A mint that fails verification is not added, and a typed-in symbol is still not trusted. Called quietly from the dashboard in the source tree.",
    status: "NEW",
    group: "Token Work",
  },
  {
    title: "Token drawer from the balance box",
    body: "The whole balance box is the token entry: click it, press Enter, or use the token strip and a drawer slides up with the full list and a live search. The inline dashboard token ledger is gone rather than duplicated. In the store package.",
    status: "STABLE",
    group: "Token Work",
  },
  {
    title: "Custom tokens, verified on-chain",
    body: "token.readMint reads a pasted contract address from the chain and uses the mint's own symbol and decimals. Free-typed metadata is what once made an added token burn the wrong number of base units.",
    status: "STABLE",
    group: "Token Work",
  },
  {
    title: "Token transfer, live probe open",
    body: "token.transferChecked shipped in contract v8 with signing auth, and token account initialization rides as a preceding sender-signed transaction. Whether a never-registered owner can receive, and what the token program charges, are still unmeasured. The UI labels the token fee as unmeasured rather than quoting the native fee.",
    status: "ALPHA",
    group: "Token Work",
  },
  {
    title: "Contacts",
    body: "Backend contact methods exist. A full contacts screen is not the current product surface. Arbitrary contacts are never registered on-chain by the just-in-time registration path.",
    status: "PLANNED",
    group: "Token Work",
  },
  {
    title: "A DeFi backend, unreachable by design",
    body: "Contract v17 and v18 declare 43 methods: program discovery, market reads, risk, launchpad drafts, dex quotes, prepared intents, and one signing method that refuses while gated. Every DEFI_* flag is false in this build, with no URL or storage override. A real AMM swap was executed on Betanet on 2026-10-26 and the swap screen was withdrawn the same day; the dashboard tile is back to a roadmap toast.",
    status: "PLANNED",
    group: "DeFi (gated)",
  },
  {
    title: "Launchpad and prediction",
    body: "The legacy launchpad UI was deleted, not hidden. The launchpad.* backend namespace exists behind the same flags, draft-only and unreachable. Nothing of the kind is a screen you can open today.",
    status: "PLANNED",
    group: "DeFi (gated)",
  },
  {
    title: "Local wallet MCP companion",
    body: "A future companion may read permitted non-secret state and prepare intents. It must not receive a seed, password, or private key, and it must not sign or broadcast on its own.",
    status: "PLANNED",
    group: "Future Modules",
  },
  {
    title: "No injected dApp provider",
    body: "Thru's documented wallet is the hosted iframe, not an extension provider. This project will not invent window.thru or copy connect(), getSigningContext(), and signTransaction() into a browser injection.",
    status: "PLANNED",
    group: "Future Modules",
  },
  {
    title: "Custom networks stay quarantined",
    body: "Saved legacy custom networks stay listable and removable. Activation is refused at the background boundary and a stale selection self-heals to Betanet. Re-enabling needs HTTPS policy, a narrow host permission, verified per-network capability records, and password re-auth — together.",
    status: "PLANNED",
    group: "Future Modules",
  },
];
