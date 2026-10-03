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
    "wallet_prepare_swap — only after real Thru-native swap support exists",
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
  "AGENTS.md — rules, commands, traps, reporting.",
  "docs/DOCS_INDEX.md — documentation map.",
  "docs/PROJECT_LEDGER.md — past, present, and future identifiers.",
  "docs/STATUS_AND_ROADMAP.md — audited baseline and open checks. Verify its version numbers against src/shared/contract/manifest.js before quoting them.",
  "extension.md — the Chrome Web Store listing copy, its permission justifications, and the listing changelog.",
  "CONTEXT.md — file-by-file repository map.",
  "docs/MCP_AGENT_INTEGRATION.md — safe companion plan.",
  "https://thru.org/docs/llm.txt — official protocol entry point.",
  "/llms.txt on this site — short website context, including the store link.",
] as const;

export const aiContext = `Read first:
1. AGENTS.md
2. docs/DOCS_INDEX.md
3. docs/STATUS_AND_ROADMAP.md
4. CONTEXT.md
5. docs/MCP_AGENT_INTEGRATION.md
6. https://thru.org/docs/llm.txt

Do not request, store, print, or reveal wallet secrets.
Do not invent unsupported protocol behavior.
Use official Thru SDK and program surfaces when available.
Prefer the Chrome Web Store listing for a packaged install, and the extension repository for source.
Three artifacts exist at once: the published store package (1.2.0, alphanet), the released source at main (v1.4.1, betanet, contract v15), and a status document that still claims v12. Name the one you mean.`;
