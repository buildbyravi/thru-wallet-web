import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { docsManifest } from "@/content/docs-manifest";
import { getDocBody, getDocMeta } from "@/lib/docs";
import { MarkdownContent } from "@/components/MarkdownContent";
import { site } from "@/content/site";

export function generateStaticParams() {
  return docsManifest.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getDocMeta(slug);
  if (!meta) return {};
  return {
    title: `${meta.title} \u2014 ${site.name} Docs`,
    description: meta.description,
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getDocMeta(slug);
  if (!meta) notFound();
  const body = getDocBody(meta);

  const index = docsManifest.findIndex((d) => d.slug === slug);
  const prev = index > 0 ? docsManifest[index - 1] : undefined;
  const next = index < docsManifest.length - 1 ? docsManifest[index + 1] : undefined;

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="grid gap-14 xl:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden xl:block">
          <div className="sticky top-24 space-y-8">
            <Link href="/docs" className="label text-warm-2 hover:text-ink">
              &larr; All docs
            </Link>
            <DocsNav activeSlug={slug} />
          </div>
        </aside>

        <article className="min-w-0">
          <Link href="/docs" className="label text-warm-2 xl:hidden">
            &larr; All docs
          </Link>
          <div className="label mt-4 text-accent-dark">{meta.category}</div>
          <h1 className="mt-3 max-w-[26ch] text-[clamp(30px,4.5vw,48px)] font-[350] leading-[1.05] tracking-[-0.025em]">
            {meta.title}
          </h1>
          <p className="mt-3 max-w-[60ch] text-[15px] text-warm">{meta.description}</p>

          <div className="hair mt-8 pt-10">
            <MarkdownContent content={body} />
          </div>

          <div className="hair mt-16 flex items-center justify-between gap-4 pt-6 text-[14px]">
            {prev ? (
              <Link href={`/docs/${prev.slug}`} className="text-accent-dark hover:underline">
                &larr; {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/docs/${next.slug}`} className="text-accent-dark hover:underline">
                {next.title} &rarr;
              </Link>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}

function DocsNav({ activeSlug }: { activeSlug: string }) {
  const categories = Array.from(new Set(docsManifest.map((d) => d.category)));
  return (
    <nav className="space-y-6">
      {categories.map((category) => (
        <div key={category}>
          <div className="label text-warm-2">{category}</div>
          <ul className="mt-3 space-y-2">
            {docsManifest
              .filter((d) => d.category === category)
              .map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/docs/${d.slug}`}
                    className={
                      "block text-[14px] leading-snug " +
                      (d.slug === activeSlug ? "text-accent-dark" : "text-warm hover:text-ink")
                    }
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
