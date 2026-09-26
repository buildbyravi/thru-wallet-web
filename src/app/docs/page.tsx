import Link from "next/link";
import type { Metadata } from "next";
import { docsManifest } from "@/content/docs-manifest";
import { docCategories } from "@/lib/docs";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Docs \u2014 ${site.name}`,
  description: "Documentation for the Thru Wallet browser extension.",
};

export default function DocsIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="label text-accent-dark">Docs</div>
      <h1 className="mt-3 max-w-[24ch] text-[clamp(32px,5vw,56px)] font-[350] leading-[1.05] tracking-[-0.025em]">
        Everything about running the extension.
      </h1>
      <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-warm">
        Written to be read by people and by AI agents alike. See{" "}
        <Link href="/docs/ai-and-mcp" className="text-accent-dark underline underline-offset-4">
          AI agents &amp; MCP
        </Link>{" "}
        for the machine-readable versions.
      </p>

      <div className="mt-14 space-y-14">
        {docCategories.map((category) => (
          <section key={category} className="hair pt-6">
            <h2 className="label text-warm-2">{category}</h2>
            <div className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-2">
              {docsManifest
                .filter((d) => d.category === category)
                .map((doc) => (
                  <Link key={doc.slug} href={`/docs/${doc.slug}`} className="group block">
                    <h3 className="text-[19px] font-medium leading-snug group-hover:text-accent-dark">
                      {doc.title}
                    </h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-warm">
                      {doc.description}
                    </p>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
