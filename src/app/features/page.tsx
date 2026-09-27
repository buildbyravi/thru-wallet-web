import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { PageHeader } from "@/components/Section";
import { featureGroups, features } from "@/content/features";

export const metadata: Metadata = {
  title: "Features",
  description: "Thru Wallet features grouped by wallet core, daily use, token work, and future modules.",
};

export default function FeaturesPage() {
  return (
    <main className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 sm:py-16">
      <PageHeader
        kicker="Features"
        title="A narrow wallet, labeled honestly."
        lede="Stable means it is the product. Alpha means the code exists and a live or browser check is still open. Planned means you cannot do it in the extension today."
      />
      <div className="mt-12 space-y-14">
        {featureGroups.map((group) => (
          <section key={group}>
            <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">{group}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {features
                .filter((feature) => feature.group === group)
                .map((feature) => (
                  <article key={feature.title} className="rounded-2xl border border-rule bg-white/30 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-2xl leading-tight tracking-[-0.02em]">{feature.title}</h3>
                      <Badge value={feature.status} />
                    </div>
                    <p className="mt-3 text-warm">{feature.body}</p>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
