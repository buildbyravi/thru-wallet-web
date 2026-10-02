import { aiMcp, aiReadFirst } from "@/content/ai";
import { changelog } from "@/content/changelog";
import { docs } from "@/content/docs";
import { features } from "@/content/features";
import { gaps } from "@/content/security";
import { roadmap } from "@/content/roadmap";
import { routes } from "@/content/routes";
import { chromeStoreUrl, extensionId, pendingRelease, site } from "@/content/site";

export function llmsShort() {
  return `# Thru Wallet

> ${site.descriptor}

Chrome Web Store: ${chromeStoreUrl}
Extension id: ${extensionId}
Listing: ${site.listing.version} · updated ${site.listing.updated} · offered by ${site.listing.offeredBy} · ${site.listing.size}
Extension source: ${site.repos.extension}
Website source: ${site.repos.website}
Privacy: ${site.links.privacy}

${site.warning}

## Source baseline (extension main branch)

- Contract ${site.contract.version}, ${site.contract.methods} methods
- ${routes.length} routes, popup ${site.contract.popupWidthPx}px, ${site.contract.domSinks} DOM sinks
- Vault: ${site.contract.kdf}, ${site.contract.cipher}
- Packages: ${site.contract.sdk}, ${site.contract.programs}, targeting ${site.contract.network}
- Audited status doc: ${site.contract.auditedOn} at ${site.contract.auditedCommit}
- The store package and the source baseline are different artifacts

## Pending release (not merged, not published)

- Package ${pendingRelease.version} on PR #${pendingRelease.pr} at ${pendingRelease.headCommit}, state ${pendingRelease.state}
- Contract ${pendingRelease.contract}, ${pendingRelease.methods} methods
- Packages ${pendingRelease.sdk} and ${pendingRelease.programs}, network ${pendingRelease.network} (${pendingRelease.rpc})
- Adds the notifications permission, a token drawer, on-chain-verified custom tokens, and inactivity-based auto-lock
- Read on ${pendingRelease.checkedOn}: ${pendingRelease.prUrl}

## Do not

- Request or reveal a seed, private key, or password
- Invent window.thru or an extension provider contract
- Treat unverified chain behavior as measured
- Collapse the three artifacts. The store serves ${site.listing.version} built for ${site.listing.network}; main is contract ${site.contract.version}; ${pendingRelease.version} is reviewed source on an open pull request
- Quote the pending build's inactivity-based auto-lock as something an installed extension does today

## Read

- /docs/overview
- /docs/installation
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
