# MCP and AI companion policy

This website publishes AI-readable context for the Thru Wallet Extension without expanding the wallet's trust boundary.

## Core rule

```txt
AI/MCP prepares or explains intent → extension UI shows human review → user approves/authenticates → extension background signs/submits
```

Never invert the flow:

```txt
AI/MCP receives password/private key/mnemonic → AI signs/broadcasts
```

## Preferred external context

- Read-only Thru Explorer MCP: `https://scan.thru.org/api/mcp`
- Official protocol docs entry point for agents: `https://thru.org/docs/llm.txt`
- Extension source repository: `https://github.com/buildbyravi/thru-wallet-ext`

Prefer official read-only Thru sources over scraping explorer pages or asking an agent to infer chain behavior from stale docs.

## Allowed future local wallet MCP tool classes

These return non-secret but privacy-sensitive wallet state. They require explicit per-session user permission and should be scoped to the selected wallet, network, and account set.

| Tool idea | Data returned | Notes |
| --- | --- | --- |
| `wallet_get_public_accounts` | addresses, labels, refs, keyring metadata | No private keys, no mnemonic. |
| `wallet_get_balances` | cached/fresh native and token balances | Unknown and proven-zero states must stay distinct. |
| `wallet_get_assets` | visible assets and support status | Unsupported token balances must say unsupported. |
| `wallet_get_activity` | transactions and pending records | Privacy-sensitive. |
| `wallet_get_networks` | active/selectable networks | Do not expose disabled custom endpoints as usable. |
| `wallet_get_capabilities` | supported/unsupported feature flags | Useful to stop agents fabricating behavior. |

## Protected intent preparation tools

These may create a pending review intent, but must not sign or broadcast.

| Tool idea | Output |
| --- | --- |
| `wallet_prepare_native_send` | native transfer intent for extension review |
| `wallet_prepare_token_transfer` | token transfer intent after live token-program checks are closed |
| `wallet_prepare_swap` | swap quote/intent only after real Thru-native swap support exists |
| `wallet_prepare_launchpad_create` | launch intent only after launchpad semantics are verified |

## Forbidden tools

Never expose these through MCP or any AI bridge:

- mnemonic export
- private-key export
- password access
- direct signing
- direct broadcast
- reset wallet
- disabling or changing security settings
- raw decrypted vault access
- arbitrary `chrome.storage` read/write
- fake DEX quotes, charts, launchpad state, prediction markets, or protocol semantics

## Extension integration boundary

A future local wallet MCP, if implemented, should be a separate local companion process rather than code inside the Chrome extension service worker.

Preferred future flow:

1. User grants the companion explicit per-session permission for selected privacy-sensitive reads.
2. Companion asks the extension for permitted non-secret state.
3. Companion proposes a transaction intent.
4. Extension records the intent as pending review.
5. Extension opens a popup, side-panel, or tab review surface.
6. User approves or rejects.
7. Background signs only after the extension's declared auth policy passes.

## LLM context maintenance

The deployed `llms.txt` file should stay compact and factual. Use it for:

- current product identity,
- canonical repo links,
- hard safety rules,
- supported and unsupported features,
- docs to read first.

Use this file for longer MCP policy and rationale.
