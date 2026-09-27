import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { McpTables } from "@/components/McpTables";
import { PageHeader } from "@/components/Section";
import { aiContext, aiMcp, aiReadFirst } from "@/content/ai";
import { chromeStoreUrl, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Agents",
  description: "How AI agents should read Thru Wallet context without requesting secrets or inventing a provider.",
};

export default function AgentsPage() {
  return (
    <main className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 sm:py-16">
      <PageHeader
        kicker="Agents"
        title="Context without custody."
        lede={aiMcp.localRule}
      />
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <a className="rounded-2xl border border-rule p-4 hover:border-ink" href="/llms.txt">
          <p className="mono text-sm">/llms.txt</p>
          <p className="mt-2 text-sm text-warm">Short file. Includes the Chrome Web Store link.</p>
        </a>
        <a className="rounded-2xl border border-rule p-4 hover:border-ink" href="/llms-full.txt">
          <p className="mono text-sm">/llms-full.txt</p>
          <p className="mt-2 text-sm text-warm">Docs, routes, policy, and changelog in one text file.</p>
        </a>
        <a className="rounded-2xl border border-rule p-4 hover:border-ink" href="/api/catalog">
          <p className="mono text-sm">/api/catalog</p>
          <p className="mt-2 text-sm text-warm">Listing, contract facts, and desk counts as JSON.</p>
        </a>
      </div>
      <section className="mt-12">
        <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Policy</h2>
        <div className="mt-5">
          <McpTables />
        </div>
      </section>
      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Read first</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-warm">
            {aiReadFirst.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-warm">
            Official protocol entry:{" "}
            <a className="text-link" href={site.links.thruLlmTxt}>
              thru.org/docs/llm.txt
            </a>
            . Explorer MCP:{" "}
            <a className="text-link" href={aiMcp.explorerMcp}>
              scan.thru.org/api/mcp
            </a>
            . Packaged install:{" "}
            <a className="text-link" href={chromeStoreUrl}>
              Chrome Web Store
            </a>
            .
          </p>
          <p className="mt-3">
            <Link className="text-link" href="/docs/mcp-and-ai">
              Full reading policy
            </Link>
          </p>
        </div>
        <CodeBlock code={aiContext} label="Pasteable context" />
      </section>
    </main>
  );
}
