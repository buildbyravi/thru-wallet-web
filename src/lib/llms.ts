import { aiMcp, aiReadFirst } from "@/content/ai";
import { changelog } from "@/content/changelog";
import { docs } from "@/content/docs";
import { drift, sinceStore } from "@/content/drift";
import { features } from "@/content/features";
import { gaps } from "@/content/security";
import { roadmap } from "@/content/roadmap";
import { routes } from "@/content/routes";
import {
  auditedDoc,
  chromeStoreUrl,
  domains,
  extensionId,
  release,
  site,
  source,
  unverified,
} from "@/content/site";

export function llmsShort() {
  return `# Thru Wallet

> ${site.descriptor}

Chrome Web Store: ${chromeStoreUrl}
Extension id: ${extensionId}
Listing: ${site.listing.version} · updated ${site.listing.updated} · ${site.listing.size} · ${site.listing.permissions} permissions · ${site.listing.network} · ${site.listing.users}
Listing re-read: ${site.listing.verifiedOn} — unchanged since publication
Extension source: ${site.repos.extension}
Website source: ${site.repos.website}
Privacy: ${site.links.privacy}

${site.warning}

## Five artifacts, verified separately

- Chrome Web Store: package ${drift.packageVersion}, published ${drift.storeDate}, contract ${drift.storeContract}, ${drift.storeMethods} methods, ${drift.storeRoutes} routes, ${drift.storePackages}. What Chrome installs. No Domain screen.
- Source main at ${drift.sourceCommit} (${drift.sourceDate}): package still ${drift.packageVersion}, contract ${drift.sourceContract}, ${drift.sourceMethods} methods (${drift.sourceWalletCore} wallet-core + ${drift.sourceDefi} gated DeFi), ${drift.sourceRoutes} routes, ${drift.sourcePackages}. No tag after ${release.tag}.
- docs/STATUS_AND_ROADMAP.md: still opens with contract ${auditedDoc.version}, ${auditedDoc.methods} methods against a ${auditedDoc.date} baseline — behind main, ahead of the store.
- Verification: ${unverified.checked} of ${unverified.cells} runbook cells ticked (prior record ${unverified.prior.checked} of ${unverified.prior.rows} rows / ${unverified.prior.cells} cells as of ${unverified.prior.asOf}).
- Deferred surface: ${drift.sourceDefi} DeFi methods behind false flags, swap screen withdrawn ${drift.swapWithdrawnOn}, custom networks quarantined, no injected provider.

The store package was cut from the same commit as the source release (${drift.storeDate}). Contract v16 merged the same day, and main has been ${drift.contractVersions} contract versions ahead ever since — under one unchanged package number. Do not collapse them.

## Source facts (main, read ${site.contract.checkedOn})

- Contract ${source.contract}, ${source.methods} methods; 72 callable while locked, 51 unlocked, 12 password-gated, 9 signing-gated
- ${source.routes} routes, popup ${site.contract.popupWidthPx}px, ${site.contract.domSinks} DOM sinks
- Vault: ${site.contract.kdf}, ${site.contract.cipher}
- Packages ${source.sdk} and ${source.programs}; network ${source.network} (${source.rpc}) as the only connect-src
- Permissions: ${source.permissions.join(", ")}
- Local suite: ${source.tests} — deterministic, local, not a browser
- The 43-method DeFi surface exists behind build-time flags that are all false. No swap, launchpad or prediction screen ships
- AGENTS.md rule 15: the frontend never waits on a chain read before first paint

## Domains (.thru)

- Route ${domains.route}: one search field, background availability check, years stepper, quote from the on-chain registrar config, review sheet, signed registration
- Live provider: ${domains.provider}, root ${domains.root}, ${domains.feePerYear} per year (${domains.feePerYearHuman} at nine decimals)
- The official paid .thru registry is ${domains.officialRegistry}; the .id root ${domains.idRoot}, so .id is lookup only
- Backend registration verified on chain ${domains.firstLiveRegister}; the rendered flow and the charged network fee are not verified

## Not verified

- ${unverified.checked} of ${unverified.cells} checkbox cells ticked in ${unverified.doc} as of ${unverified.checkedOn} (${unverified.rows} lines with checks)
- No recorded browser run of the published package at all
- Token-program fee and the never-registered recipient owner case are unmeasured; no response reports a charged fee

## Since the store build

${sinceStore.map((item) => `- ${item.title} — ${item.detail}`).join("\n")}

## Do not

- Request or reveal a seed, private key, or password
- Invent window.thru or an extension provider contract
- Treat unverified chain behavior as measured, or a local suite as browser verification
- Collapse the artifacts: the store speaks ${drift.storeContract} with ${drift.storeMethods} methods, main speaks ${drift.sourceContract} with ${drift.sourceMethods}, and the status document says ${auditedDoc.version} with ${auditedDoc.methods}
- Describe a gated DeFi method, or a swap screen withdrawn on 2026-10-26, as a shipped feature
- Report the ${domains.feePerYear} registrar price as a network fee

## Read

- /docs/overview
- /docs/installation
- /docs/name-service
- /docs/security-model
- /docs/ai-and-mcp
- /llms-full.txt
- ${site.links.thruLlmTxt}
- ${site.links.explorerMcp}
`;
}

export function llmsFull() {
  const featureLines = features
    .map((feature) => `- [${feature.status}] ${feature.group}: ${feature.title} — ${feature.body}`)
    .join("\n");
  const routeLines = routes.map((route) => `- \`${route.path}\` — ${route.use}`).join("\n");
  const gapLines = gaps.map((gap) => `- ${gap}`).join("\n");
  const roadLines = roadmap
    .map((item) => `- ${item.step} [${item.status}] ${item.title} — ${item.detail}`)
    .join("\n");
  const changeLines = changelog
    .map((entry) => `### ${entry.version} · ${entry.date} · ${entry.title}\n\n${entry.summary}\n\n${entry.changes.map((change) => `- ${change}`).join("\n")}`)
    .join("\n\n");
  const docText = docs
    .map((doc) => `## Doc: ${doc.title} (/${doc.slug})\n\n${doc.markdown.trim()}`)
    .join("\n\n");

  return `${llmsShort()}
## Routes

${routeLines}

## Features

${featureLines}

## Gaps

${gapLines}

## Roadmap

${roadLines}

## MCP policy

Explorer MCP: ${aiMcp.explorerMcp}
Protocol: ${aiMcp.protocolLlm}
${aiMcp.localRule}

Allowed:
${aiMcp.allowed.map((item) => `- ${item}`).join("\n")}

Protected:
${aiMcp.protected.map((item) => `- ${item}`).join("\n")}

Forbidden:
${aiMcp.forbidden.map((item) => `- ${item}`).join("\n")}

Read first:
${aiReadFirst.map((item) => `- ${item}`).join("\n")}

## Changelog

${changeLines}

## Docs

${docText}
`;
}
