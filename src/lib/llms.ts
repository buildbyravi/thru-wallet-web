import { aiMcp, aiReadFirst } from "@/content/ai";
import { changelog } from "@/content/changelog";
import { docs } from "@/content/docs";
import { features } from "@/content/features";
import { gaps } from "@/content/security";
import { roadmap } from "@/content/roadmap";
import { routes } from "@/content/routes";
import { auditedDoc, chromeStoreUrl, extensionId, release, site, storeStatus } from "@/content/site";

export function llmsShort() {
  return `# Thru Wallet

> ${site.descriptor}

Chrome Web Store: ${chromeStoreUrl}
Extension id: ${extensionId}
Listing: ${site.listing.version} · updated ${site.listing.updated} · offered by ${site.listing.offeredBy} · ${site.listing.size}
Store pipeline: ${storeStatus.version} ${storeStatus.sentenceLabel} (${storeStatus.supersededSubmission} was submitted and never published) — the listing page still serves ${site.listing.version}
Extension source: ${site.repos.extension}
Website source: ${site.repos.website}
Privacy: ${site.links.privacy}

${site.warning}

## Source release (extension main branch)

- Tag ${release.tag}, released ${release.publishedOn}, merge commit ${release.mergeCommit} from PR #${release.pr}
- Contract ${release.contract}, ${release.methods} methods
- ${routes.length} routes, popup ${site.contract.popupWidthPx}px, ${site.contract.domSinks} DOM sinks
- Vault: ${site.contract.kdf}, ${site.contract.cipher}
- Packages ${release.sdk} and ${release.programs}, network ${release.network} (${release.rpc})
- Permissions: ${release.permissions.join(", ")}
- Suite at release: ${release.tests}
- ${release.note}

## Audited status document (behind the code)

- docs/STATUS_AND_ROADMAP.md still says contract ${auditedDoc.version}, ${auditedDoc.methods} methods, audited ${auditedDoc.date} at ${auditedDoc.commit}
- The code at main exports contract ${release.contract} with ${release.methods} methods. Prefer src/ over the document

## Do not

- Request or reveal a seed, private key, or password
- Invent window.thru or an extension provider contract
- Treat unverified chain behavior as measured
- Collapse the artifacts. The store serves ${site.listing.version} built for ${site.listing.network}; main is release ${release.tag} with contract ${release.contract}; the status document still says ${auditedDoc.version}
- Report a tagged release as something users have installed, or the status document as current
- Quote the released build's inactivity-based auto-lock as something an installed extension does today

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
