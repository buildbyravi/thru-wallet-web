import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { docs, getDoc } from "@/content/docs";

type Params = { slug: string };

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return { title: "Doc" };
  return { title: doc.title, description: doc.description };
}

export default async function DocPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();
  const index = docs.findIndex((item) => item.slug === slug);
  const previous = docs[index - 1];
  const next = docs[index + 1];

  return (
    <main className="mx-auto grid max-w-[1120px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-8 lg:self-start">
        <p className="label text-warm">Docs</p>
        <nav aria-label="Documents" className="mt-3 space-y-1">
          {docs.map((item) => (
            <Link
              key={item.slug}
              href={`/docs/${item.slug}`}
              className={`block py-1 text-sm ${item.slug === slug ? "text-ink" : "text-warm hover:text-ink"}`}
              aria-current={item.slug === slug ? "page" : undefined}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
      <article className="min-w-0 max-w-3xl">
        <p className="label text-accent-dark">{doc.tag}</p>
        <h1 className="mt-3 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[0.98] font-light tracking-[-0.035em]">
          {doc.title}
        </h1>
        <p className="mt-4 text-lg text-warm">{doc.description}</p>
        <div className="mt-8">
          <MarkdownContent markdown={doc.markdown} />
        </div>
        <div className="mt-12 flex justify-between gap-4 border-t border-rule pt-5 text-sm">
          {previous ? (
            <Link className="text-link" href={`/docs/${previous.slug}`}>
              {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="text-link" href={`/docs/${next.slug}`}>
              {next.title}
            </Link>
          ) : null}
        </div>
      </article>
    </main>
  );
}
