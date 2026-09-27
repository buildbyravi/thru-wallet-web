export type FeatureStatus = "STABLE" | "ALPHA" | "PLANNED";
export type FeatureGroup = "Wallet Core" | "Daily Use" | "Token Work" | "Future Modules";

export interface Feature {
  title: string;
  body: string;
  status: FeatureStatus;
  group: FeatureGroup;
}

export const featureGroups: FeatureGroup[] = [
  "Wallet Core",
  "Daily Use",
  "Token Work",
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
    body: "Default is 15 minutes. The extension's own notes are precise: this is a fixed-period alarm, not an inactivity timer, even where a settings label or the store listing says otherwise. Changing the timer is password-gated.",
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
    body: "Create the on-chain account and claim from the faucet where the active network supports one. Historical alphanet observations treated faucet amounts as raw base units. Treat those constants as well-sourced, not newly certified.",
    status: "STABLE",
    group: "Daily Use",
  },
  {
    title: "Native sends and decoded history",
    body: "Review precedes send. History is one flat stream: a known time comes from the containing block, otherwise the row shows Block <slot> instead of an invented date. No per-card fee line is shipped.",
    status: "STABLE",
    group: "Daily Use",
  },
  {
    title: "Popup and side panel, mutually exclusive",
    body: "The shared page is 400px in the toolbar popup. Side Panel Mode is an explicit Settings choice and calls chrome.sidePanel.open() from a user gesture. It never calls setPanelBehavior, so the toolbar icon still opens the popup.",
    status: "STABLE",
    group: "Daily Use",
  },
  {
    title: "Receive address and QR",
    body: "The receive route shows the address and a canvas QR. Explorer links point at scan.thru.org. Canvas paint, clipboard prompts, and the exact explorer path are still manual browser checks.",
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
    title: "Token balances, honestly",
    body: "token.getBalances reads official @thru/programs/token bindings. A missing token account is a proven zero. A failed read is unknown — never a fabricated 0. Decimals come from the mint when a balance exists.",
    status: "ALPHA",
    group: "Token Work",
  },
  {
    title: "Token transfer, live probe open",
    body: "token.transfer shipped in contract v8 with signing auth. A missing recipient token account can be initialized by the sender in a preceding transaction. Whether a never-registered owner can receive, and the token-program fee, are still unmeasured.",
    status: "ALPHA",
    group: "Token Work",
  },
  {
    title: "Contacts",
    body: "Backend contact methods exist. A full contacts screen is not the current product surface. Arbitrary contacts are never registered on-chain by the v12 just-in-time path.",
    status: "PLANNED",
    group: "Token Work",
  },
  {
    title: "Local wallet MCP companion",
    body: "A future companion may read permitted non-secret state and prepare intents. It must not receive a seed, password, or private key, and it must not sign or broadcast on its own.",
    status: "PLANNED",
    group: "Future Modules",
  },
  {
    title: "Isolated launchpad, DEX, prediction",
    body: "The legacy surface was deleted, not hidden. A return is only allowed as a new feature module with verified program semantics, guarded DOM, and its own tests. Nothing of that kind ships today.",
    status: "PLANNED",
    group: "Future Modules",
  },
  {
    title: "No injected dApp provider",
    body: "Thru's documented wallet is the hosted iframe, not an extension provider. This project will not invent window.thru or copy connect(), getSigningContext(), and signTransaction() into a browser injection.",
    status: "PLANNED",
    group: "Future Modules",
  },
];
