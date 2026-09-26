export const site = {
  name: "Thru Wallet Extension",
  shortName: "Thru Wallet",
  eyebrow: "Chrome MV3 · Self-custody · Native Thru L1",
  tagline: "A focused browser wallet for the Thru native Layer 1.",
  summary:
    "Create or import a wallet, manage accounts, send native THRU, view history, use faucet flows on supported networks, and keep every signing action inside the extension's audited background boundary.",
  warning:
    "Alphanet/devnet readiness site. The extension is not advertised as production-ready until the remaining browser and live-chain checks close.",
  repoUrl: "https://github.com/buildbyravi/thru-wallet-ext",
  docsUrl: "https://github.com/buildbyravi/thru-wallet-ext/tree/main/docs",
  llmUrl: "/llms.txt",
  mcpUrl: "/docs/mcp-and-ai.md",
  sourceBaseline: "buildbyravi/thru-wallet-ext main · 2026-09-26 status docs",
} as const;

export const navItems = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "architecture", label: "Architecture" },
  { id: "security", label: "Security" },
  { id: "docs", label: "Docs" },
  { id: "updates", label: "Updates" },
  { id: "ai", label: "AI / MCP" },
] as const;

export const heroMetrics = [
  { label: "contract", value: "v12", note: "81 allowlisted methods" },
  { label: "routes", value: "14", note: "single popup route stack" },
  { label: "runtime", value: "MV3", note: "Chrome extension + side panel" },
  { label: "DOM sinks", value: "0", note: "guarded h() factory only" },
] as const;

export const featureGroups = [
  {
    title: "Wallet core",
    items: [
      "Create a seed-based wallet",
      "Import recovery phrase or private key",
      "Lock, unlock, reset, and password-gated secret export",
      "Manage multiple seed/private-key keyrings and accounts",
    ],
  },
  {
    title: "Daily use",
    items: [
      "Dashboard, receive QR, account detail, history, and settings",
      "Native THRU send with review and pending tracking",
      "Faucet claim where the active network supports it",
      "Toolbar popup plus explicit side panel mode",
    ],
  },
  {
    title: "Token work",
    items: [
      "Token balances use official @thru/programs bindings",
      "Token transfer is shipped in code behind signing auth",
      "Unknown and proven-zero balances are rendered differently",
      "Live token-program fee and unregistered-owner behavior remain open checks",
    ],
  },
  {
    title: "Future modules",
    items: [
      "Launchpad, DEX, prediction, portfolio, and passkey work stay isolated",
      "Optional features use src/features/<id>/ and explicit backend namespaces",
      "No fake quotes, charts, markets, or protocol behavior are fabricated",
      "dApp connector waits for a verified extension provider contract",
    ],
  },
] as const;

export const architectureFlow = [
  {
    title: "UI route stack",
    path: "src/ui/app/routes/*",
    detail: "Fourteen real routes share the same guarded DOM kit, router, modal, focus-trap, and popup/side-panel page.",
  },
  {
    title: "Bridge seam",
    path: "bridge.send(method, params)",
    detail: "The UI has one outbound Chrome message caller. BigInt values become strings before crossing the port.",
  },
  {
    title: "API router",
    path: "src/background/api-router.js",
    detail: "Every request is checked against the append-only manifest, auth tier, sender context, and JSON-serializable contract.",
  },
  {
    title: "Services",
    path: "src/background/services/*",
    detail: "Account, network, transaction, token, history, settings, registration, and vault orchestration live in the background.",
  },
  {
    title: "Sacred adapters",
    path: "src/lib/vault.js · src/lib/thru-client.js · src/lib/networks.js",
    detail: "Crypto/session/keyring, Thru RPC/transaction/program code, and network-program config are kept behind strict import boundaries.",
  },
] as const;

export const securityPrinciples = [
  {
    title: "Self-custody boundary",
    body: "The extension never asks an AI tool, web page, or remote service to hold the seed phrase, private key, or password. Signing stays in the background after the wallet auth policy passes.",
  },
  {
    title: "Manifest-first API",
    body: "Contract v12 declares the methods the UI can call. Unknown methods fail closed, and contract tests keep route callers and background handlers aligned.",
  },
  {
    title: "No unsafe DOM sinks",
    body: "The source guard keeps innerHTML and related sinks at zero. New UI is built with the kit DOM factory and tested through route lifecycle mounts.",
  },
  {
    title: "Honest unsupported states",
    body: "Unverified chain behavior, missing token accounts, custom endpoints, hosted-wallet provider assumptions, and future DeFi modules are represented as unsupported instead of guessed.",
  },
  {
    title: "Quarantined custom networks",
    body: "Saved legacy custom networks are listable and removable, but direct activation is refused until HTTPS, host permission, capability records, and re-auth requirements land together.",
  },
  {
    title: "Browser checks still matter",
    body: "Automated tests pass locally, but real Chrome layout, focus, side-panel behavior, QR canvas, clipboard prompts, and MV3 worker eviction remain manual smoke-check boundaries.",
  },
] as const;

export const docs = [
  {
    title: "Documentation index",
    path: "/docs/index.md",
    description: "Map of the website docs, extension docs, AI context files, and open slots for future pages.",
    tag: "start here",
  },
  {
    title: "Content guide",
    path: "/docs/content-guide.md",
    description: "Where to edit hero copy, feature cards, docs cards, changelog entries, and AI-readable context with minimal changes.",
    tag: "editing",
  },
  {
    title: "Changelog",
    path: "/docs/changelog.md",
    description: "Small, append-at-top release notes for website updates and extension baseline changes surfaced on the landing page.",
    tag: "updates",
  },
  {
    title: "MCP and AI policy",
    path: "/docs/mcp-and-ai.md",
    description: "Safe shape for read-only MCP, protected intent preparation, forbidden tools, and LLM context maintenance.",
    tag: "AI",
  },
  {
    title: "llms.txt",
    path: "/llms.txt",
    description: "Short machine-readable project context for AI agents. Keep it factual, compact, and free of secrets.",
    tag: "LLM",
  },
  {
    title: "Extension repository docs",
    path: site.docsUrl,
    description: "Canonical implementation docs in buildbyravi/thru-wallet-ext: status, build spec, manual smoke checklist, audits, and ledgers.",
    tag: "source",
  },
] as const;

export const openDocSlots = [
  {
    name: "New extension release note",
    edit: "Add one entry to public/docs/changelog.md and mirror the short headline in src/data/site.ts → updates.",
  },
  {
    name: "New AI capability or limit",
    edit: "Add one compact fact to public/llms.txt. Put longer reasoning in public/docs/mcp-and-ai.md.",
  },
  {
    name: "New MCP tool proposal",
    edit: "Append to the Allowed, Protected, or Forbidden table in public/docs/mcp-and-ai.md before any implementation.",
  },
  {
    name: "New public doc page",
    edit: "Create public/docs/<slug>.md and add one card to src/data/site.ts → docs.",
  },
] as const;

export const updates = [
  {
    date: "2026-09-26",
    title: "Website reset for Thru Wallet Extension",
    body: "Replaced the previous audit landing content with a product page, docs hub, changelog, and AI/MCP context surfaces.",
  },
  {
    date: "2026-09-26",
    title: "Extension baseline summarized",
    body: "The public copy now reflects the status-doc baseline: contract v12, 81 methods, 14 routes, route lifecycle tests, custom-network quarantine, and remaining browser/live-chain checks.",
  },
  {
    date: "Next",
    title: "Open updates slot",
    body: "Add the next shipped change here by editing one array entry in src/data/site.ts and one markdown entry in public/docs/changelog.md.",
  },
] as const;

export const roadmap = [
  {
    step: "01",
    title: "Run real Chrome smoke checks",
    status: "open",
    detail: "Verify popup and side panel layout, focus behavior, QR canvas, clipboard prompts, toolbar mode, and MV3 worker restart behavior.",
  },
  {
    step: "02",
    title: "Live v12 activation pass",
    status: "open",
    detail: "Exercise multi-account creation and owned-recipient just-in-time registration on a safe network-reachable machine.",
  },
  {
    step: "03",
    title: "Token transfer live probe",
    status: "open",
    detail: "Measure token-program fee and whether a sender-initialized token account can target a never-registered owner.",
  },
  {
    step: "04",
    title: "Custom network re-enable design",
    status: "blocked",
    detail: "Keep disabled until HTTPS policy, narrow host permission, per-network capability records, and password re-auth land together.",
  },
  {
    step: "05",
    title: "Provider contract watch",
    status: "blocked",
    detail: "Do not inject a browser provider until Thru publishes and the project validates an extension-compatible contract.",
  },
] as const;

export const aiMcp = {
  explorerMcp: "https://scan.thru.org/api/mcp",
  protocolLlm: "https://thru.org/docs/llm.txt",
  localRule:
    "A future local wallet MCP may read permitted non-secret state and prepare intents, but it must never receive secrets, sign directly, broadcast directly, or mutate security settings.",
  allowed: [
    "wallet_get_public_accounts",
    "wallet_get_balances",
    "wallet_get_assets",
    "wallet_get_activity",
    "wallet_get_networks",
    "wallet_get_capabilities",
  ],
  protected: [
    "wallet_prepare_native_send",
    "wallet_prepare_token_transfer",
    "wallet_prepare_swap only after real Thru-native swap support exists",
    "wallet_prepare_launchpad_create only after verified launchpad semantics exist",
  ],
  forbidden: [
    "mnemonic or private-key export",
    "password access",
    "direct signing or direct broadcast",
    "reset wallet or security-setting mutation",
    "raw decrypted vault access or arbitrary chrome.storage access",
  ],
} as const;

export const codeSamples = {
  install: `git clone https://github.com/buildbyravi/thru-wallet-ext.git
cd thru-wallet-ext
npm install
npm test
npm run build
# Chrome: load dist/ as an unpacked extension`,
  architecture: `src/ui/app/routes/*
  ↓ bridge.send(method, params)
src/background/api-router.js
  ↓ auth + contract validation + dispatch
src/background/services/*
  ↓ adapters
src/lib/vault.js
src/lib/thru-client.js
src/lib/networks.js`,
  aiContext: `Read first:
1. AGENTS.md
2. docs/DOCS_INDEX.md
3. docs/STATUS_AND_ROADMAP.md
4. CONTEXT.md
5. docs/MCP_AGENT_INTEGRATION.md
6. https://thru.org/docs/llm.txt

Do not request, store, print, or reveal wallet secrets.
Do not invent unsupported protocol behavior.
Use official Thru SDK/program surfaces when available.`,
} as const;

export function buildAiBrief(): string {
  return [
    "# Thru Wallet Extension website brief",
    "",
    site.summary,
    "",
    "Repository: " + site.repoUrl,
    "Status source: " + site.sourceBaseline,
    "Warning: " + site.warning,
    "",
    "## Metrics",
    ...heroMetrics.map((metric) => `- ${metric.label}: ${metric.value} — ${metric.note}`),
    "",
    "## AI and MCP",
    `- Explorer MCP: ${aiMcp.explorerMcp}`,
    `- Protocol LLM context: ${aiMcp.protocolLlm}`,
    `- Local rule: ${aiMcp.localRule}`,
    "",
    "## Edit surfaces",
    ...openDocSlots.map((slot) => `- ${slot.name}: ${slot.edit}`),
  ].join("\n");
}
