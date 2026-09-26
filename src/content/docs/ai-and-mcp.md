This page is for two audiences at once: AI coding agents / LLMs that want machine-readable context about this project, and anyone designing how an AI agent or Model Context Protocol (MCP) client should be allowed to touch a wallet.

## Read this project as an LLM

Two machine-readable endpoints are generated straight from this site's content — they update automatically whenever a doc, feature, or changelog entry is added:

- **[`/llms.txt`](/llms.txt)** — a short, [llms.txt](https://llmstxt.org)-format index: what this project is, and links to every doc page.
- **[`/llms-full.txt`](/llms-full.txt)** — the full text of every doc page and the full changelog, concatenated into one file, for agents that want the whole corpus in a single fetch.

For the Thru protocol itself (not this extension), start at Thru's own LLM context file:

```txt
https://thru.org/docs/llm.txt
```

## Core safety rule for any AI/MCP integration

Prefer the **official, read-only Thru Explorer MCP** for live chain queries:

```txt
https://scan.thru.org/api/mcp
```

It is appropriate for account lookup, transaction inspection, recent blocks/transactions, search, and on-chain ABI lookup. It is read-only and should be preferred over scraping explorer pages or asking an agent to guess from stale docs.

A **local wallet MCP**, if it is ever added, must be a separate local companion process — not code inside the extension's background service worker — and must follow this flow:

```txt
AI/MCP prepares intent → extension shows human review → user approves/authenticates → background signs/submits
```

Never:

```txt
AI/MCP receives password/private key/mnemonic → AI signs/broadcasts
```

## Trust boundaries

```txt
Local MCP companion process
  ├─ can call privacy-sensitive read-only APIs only after explicit per-session user permission
  ├─ can request preparation of an intent
  └─ cannot sign, export secrets, or change security settings

Extension background service worker
  ├─ owns auth policy
  ├─ owns encrypted vault interaction
  ├─ owns signing and submit
  └─ validates every contract method

Extension UI (popup / side panel)
  ├─ reviews prepared intent
  ├─ surfaces warnings / unsupported states
  ├─ collects the password if the signing policy requires it
  └─ approves or rejects
```

## Tool classes, if a local wallet MCP is ever implemented

**Privacy-sensitive read tools** (non-secret, but reveal identity/holdings/habits — require explicit per-session permission):

| Tool idea | Returns |
| --- | --- |
| `wallet_get_public_accounts` | addresses, labels, refs, keyring metadata |
| `wallet_get_balances` | cached/fresh balances |
| `wallet_get_assets` | visible tokens/assets |
| `wallet_get_activity` | transactions/pending records |
| `wallet_get_networks` | active/selectable networks |
| `wallet_get_capabilities` | supported/unsupported feature flags |

**Protected preparation tools** (may create a pending intent, must never sign or broadcast): `wallet_prepare_native_send`, `wallet_prepare_swap`, `wallet_prepare_token_transfer`.

**Forbidden, always:** mnemonic export, private-key export, password access, direct signing, direct broadcast, disabling signing re-authentication, changing security settings, wallet reset, raw decrypted-vault access, arbitrary `chrome.storage` read/write.

## Open section — extend this page

This block is the intentionally open field for new AI/MCP surface area. When a local wallet MCP, a new agent-facing tool, or a new automated integration ships, document it here (and add a matching [changelog](/changelog) entry) rather than starting a new page.

<!-- OPEN:AI-MCP-EXTENSIONS -->

_No additional AI/MCP integrations are shipped yet. This section is reserved for them. Suggested format for a new entry:_

```txt
### <tool-or-integration-name> — <status: proposed | alpha | shipped>
What it does:
Auth level required (unlocked / signing / none):
Data it can read or actions it can prepare:
Link to the implementation or design doc:
```

<!-- /OPEN:AI-MCP-EXTENSIONS -->

See [Contributing to this site](/docs/contributing) for exactly which files to touch.
