export const aiMcp = {
  explorerMcp: "https://scan.thru.org/api/mcp",
  protocolLlm: "https://thru.org/docs/llm.txt",
  localRule:
    "A future local wallet MCP may read permitted non-secret state and prepare intents. It must never receive secrets, sign directly, broadcast directly, or mutate security settings.",
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
    "wallet_prepare_name_register — only after a person has reviewed the quote in the extension",
    "wallet_prepare_swap — the backend exists, the screen does not, and every flag is off",
    "wallet_prepare_launchpad_create — only after verified launchpad semantics exist",
  ],
  forbidden: [
    "Mnemonic or private-key export",
    "Password access",
    "Direct signing or direct broadcast",
    "Reset wallet or security-setting mutation",
    "Raw decrypted vault access or arbitrary chrome.storage access",
  ],
} as const;

export const aiReadFirst = [
  "AGENTS.md — rules, commands, traps, reporting. Rule 15: the frontend never waits on RPC before first paint.",
  "docs/DOCS_INDEX.md — documentation map.",
  "docs/PROJECT_LEDGER.md — past, present, and future identifiers. Dated 2026-10-04; verify its numbers.",
  "docs/STATUS_AND_ROADMAP.md — audited baseline and open checks. It says v18 and 124 methods against a v28/144 tree, so check src/shared/contract/manifest.js before quoting it.",
  "docs/DECISIONS.md — durable decisions, including D-016 (the custom registrar) and D-003 (signing re-auth is opt-in).",
  "docs/BACKEND_GAPS.md — the exact supported/unsupported boundary per feature, including the domain registrar.",
  "extension.md — the Chrome Web Store listing copy, its permission justifications, and the listing changelog.",
  "CONTEXT.md — file-by-file repository map.",
  "https://thru.org/docs/llm.txt — official protocol entry point.",
  "/llms.txt on this site — short website context, including the store link.",
] as const;

export const aiContext = `Read first:
1. AGENTS.md
2. docs/DOCS_INDEX.md
3. docs/STATUS_AND_ROADMAP.md
4. docs/DECISIONS.md
5. docs/BACKEND_GAPS.md
6. CONTEXT.md
7. https://thru.org/docs/llm.txt

Do not request, store, print, or reveal wallet secrets.
Do not invent unsupported protocol behavior.
Use official Thru SDK and program surfaces when available.
Prefer the Chrome Web Store listing for a packaged install, and the extension repository for source.

Five artifacts, five dates, one version string:
- Chrome Web Store: 1.4.1, updated 2026-10-04, contract v15, 83 methods, @thru 0.4.1, 14 routes, three users. Re-read on 2026-10-27; unchanged.
- main at 1b9d096 (2026-10-27): package still 1.4.1, contract v28, 144 methods (101 wallet-core + 43 gated DeFi), @thru 0.4.2, 15 routes including /name. No tag after v1.4.1.
- docs/STATUS_AND_ROADMAP.md: still opens with contract v18 and 124 methods against a 2026-10-03 baseline.
- Verification: 1 of 100 runbook cells ticked; the prior record was 0 of 36 rows (95 cells) as of 2026-10-04.
- Deferred surface: 43 DeFi methods behind false flags, a swap screen withdrawn on 2026-10-26, quarantined custom networks, no dApp provider.

Verification: 1 of 100 manual smoke cells is ticked, from a popup-only partial run on 2026-10-04. A backend .thru registration is on chain (2026-10-27); its rendered review flow is not verified. 36 suites and 2,082 local checks pass on main. Do not describe a local suite or a backend probe as browser verification, and do not describe the store package as current.`;
