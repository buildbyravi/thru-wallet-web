"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type DocCard = {
  slug: string;
  title: string;
  description: string;
  tag: string;
};

export function DocsFilter({ docs }: { docs: DocCard[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return docs;
    return docs.filter((doc) =>
      `${doc.title} ${doc.description} ${doc.tag}`.toLowerCase().includes(needle),
    );
  }, [docs, query]);

  return (
    <div className="mt-10">
      <label className="block max-w-md">
        <span className="label text-warm">Filter</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Install, signing, MCP…"
          className="mt-2 w-full border-b border-rule bg-transparent py-2 outline-none placeholder:text-dim"
        />
      </label>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((doc) => (
          <li key={doc.slug}>
            <Link href={`/docs/${doc.slug}`} className="block h-full rounded-2xl border border-rule p-5 hover:border-ink">
              <p className="label text-accent-dark">{doc.tag}</p>
              <h2 className="mt-2 font-serif text-2xl tracking-[-0.02em]">{doc.title}</h2>
              <p className="mt-2 text-sm text-warm">{doc.description}</p>
            </Link>
          </li>
        ))}
      </ul>
      {filtered.length === 0 ? <p className="mt-6 text-warm">No doc matches that filter.</p> : null}
    </div>
  );
}
