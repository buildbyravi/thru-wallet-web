// The extension's privacy policy, published on this site rather than linked out to the
// repository. The text mirrors PRIVACY.md in buildbyravi/thru-wallet-ext (last updated
// August 2026); this site is the canonical place to read it, and /privacy is the URL the
// header, footer, install page, agents files and catalog API all point at.

export const privacy = {
  lastUpdated: "August 2026",
  updatedOn: "2026-10-27",
  intro:
    "Thru Wallet is a self-custody Chrome extension for Thru's betanet, a non-EVM RISC-V Layer 1. It is built to respect privacy and to operate under strict zero-telemetry principles: no analytics, no tracking, no remote code, and no server of ours in the path.",
  scope:
    "This policy covers the extension. This website sets no analytics or third-party scripts either — it reads its own static content, plus a catalog database for the field notes and checklist marks you can see on the status and changelog pages.",
  sections: [
    {
      heading: "What data stays on your device",
      body: "All sensitive cryptographic material and application settings remain exclusively on your local device, inside the extension's isolated browser storage.",
      bullets: [
        "Encrypted seed phrase and private keys: your BIP-39 recovery phrase, derived Ed25519 seed keys, and any individually imported private keys.",
        "Public keys and account metadata: derived public keys, account labels, and account indices.",
        "Extension preferences: local settings, interface state, and auto-lock preferences.",
        "Key derivation parameters: the cryptographic salt and PBKDF2 iteration counter required to decrypt the vault.",
      ],
    },
    {
      heading: "What leaves your device",
      body: "The extension communicates only with the Thru betanet RPC endpoint, and only to perform blockchain operations:",
      bullets: [
        "Public addresses: your account address is sent to the RPC node over HTTP JSON-RPC to read account state, balance, and transaction nonces.",
        "Signed transactions: fully pre-signed payloads — native transfers, token transfers, account activation, name registrations — are broadcast to the RPC node for inclusion.",
      ],
      endpoint: "https://rpc.betanet.thru.org",
      note:
        "Requests go directly from your browser to the RPC node. The developer operates no proxy, relay, or backend server, and the extension's content security policy allows exactly that one origin.",
    },
    {
      heading: "What is never collected",
      body: "Thru Wallet is a strict zero-collection piece of software. The extension does not:",
      bullets: [
        "Collect analytics or telemetry: no usage statistics, click tracking, performance metrics, or error reporting.",
        "Track users: no IP logging, no identifiers, no advertising IDs, no behavioural profiling.",
        "Load third-party scripts: no Google Analytics, Mixpanel, Segment, Sentry, or any external tracking library.",
        "Run remote code: every line of JavaScript ships inside the package. No remote script tags, no external injection, no eval.",
        "Transmit keys: your master password, recovery phrase, and private keys never leave local memory and are never sent over the network.",
      ],
    },
    {
      heading: "Encryption and memory lifecycle",
      body: "Keys are protected with modern Web Crypto primitives (crypto.subtle) rather than a bespoke construction:",
      bullets: [
        "Key derivation: PBKDF2 with HMAC-SHA-256 at 600,000 iterations and a cryptographically random salt.",
        "Encryption: AES-256-GCM authenticated encryption, with a fresh 12-byte initialisation vector for every operation.",
        "At rest: the encrypted vault is stored in chrome.storage.local. Nothing is uploaded.",
        "In memory: an unlocked session lives only in chrome.storage.session, which the browser clears on shutdown or extension reload, and which the auto-lock window clears after your configured period of inactivity.",
      ],
    },
    {
      heading: "Third-party requests",
      body: "When you open an explorer link from the interface — a transaction, an address, a name — the extension opens scan.thru.org in a new browser tab. That site is governed by its own policy. No other third party is contacted.",
      bullets: [],
    },
    {
      heading: "Contact, source, and audits",
      body: "Thru Wallet is open-source software provided as-is. Bug reports, privacy questions and security disclosures belong in the repository's issue tracker. The extension has not had an external security audit, and nothing on this site should be read as an audit claim.",
      bullets: [],
    },
  ],
} as const;
