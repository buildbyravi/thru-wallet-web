// ---------------------------------------------------------------------------
// Homepage feature grid. Add a new feature by pushing another object — no
// other file needs to change.
// ---------------------------------------------------------------------------

export type FeatureStatus = "STABLE" | "ALPHA" | "PLANNED";

export interface Feature {
  title: string;
  body: string;
  status: FeatureStatus;
}

export const features: Feature[] = [
  {
    title: "Create & import wallets",
    body: "A real 12-word BIP-39 mnemonic via @thru/crypto's MnemonicGenerator, derived with ThruHDWallet (BIP-44 coin type 9999, SLIP-0010 Ed25519). Import from a phrase or a raw 32-byte private key.",
    status: "STABLE",
  },
  {
    title: "Multiple accounts, one wallet",
    body: "\u201c+ Account\u201d derives the next BIP-44 index from the seed; \u201c+ Private key\u201d imports another independent key into the same wallet. Byte-mark identicons distinguish accounts at a glance.",
    status: "STABLE",
  },
  {
    title: "Multi-seed keyring vault",
    body: "src/lib/vault.js implements a full keyring model \u2014 add, rename, and remove seed or private-key keyrings, with multiple phrases grouped by source inside one vault.",
    status: "STABLE",
  },
  {
    title: "Password-encrypted local storage",
    body: "PBKDF2 (600,000 iterations, SHA-256) + AES-256-GCM. The encrypted vault lives in chrome.storage.local; decrypted vault data lives only in chrome.storage.session \u2014 memory-only, wiped on browser close.",
    status: "STABLE",
  },
  {
    title: "Configurable auto-lock",
    body: "A fixed-period alarm locks the wallet on a timer (default 15 minutes). Export always re-checks your password, even if the wallet is already unlocked.",
    status: "STABLE",
  },
  {
    title: "Balances in human-scale THRU",
    body: "Balances render as human-scale THRU (1 THRU = 1e9 base units) with the raw base units kept visible underneath for anyone who wants to verify the math.",
    status: "STABLE",
  },
  {
    title: "On-chain account creation & faucet claims",
    body: "Create the on-chain account via thru.accounts.create({ publicKey }) and claim from the faucet, on-chain, from inside the extension \u2014 plus a CLI command helper for anyone who'd rather run it themselves.",
    status: "STABLE",
  },
  {
    title: "Native sends & decoded history",
    body: "Send native transfers on-chain from inside the extension, with transaction history decoded where possible instead of a raw list of signatures, and explorer links on transactions and addresses throughout.",
    status: "STABLE",
  },
  {
    title: "Side panel & popup, mutually exclusive",
    body: "The wallet is reachable as a classic popup or as a Chrome side panel from Settings \u2192 Window \u2192 Open side panel, with the two surfaces kept from ever running at the same time.",
    status: "STABLE",
  },
  {
    title: "Contacts CRUD & account pin/hide/order",
    body: "The keyring/account/contacts backend already supports labels, pinning, hiding, and ordering. Dedicated screens for managing them are scoped as their own follow-up.",
    status: "PLANNED",
  },
  {
    title: "Token portfolio & token transfer",
    body: "Native Token Program launchpad support is being built out: account enumeration, decimals, mint metadata, balances, transfer, and history decoding against a live alphanet.",
    status: "PLANNED",
  },
  {
    title: "Local wallet MCP companion",
    body: "A narrow, permissioned local MCP server that lets an AI agent inspect non-secret wallet state and prepare (never sign) transaction intents for human review. Design-only today \u2014 see the AI & MCP doc.",
    status: "PLANNED",
  },
];
