import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <p className="label text-warm">Missing page</p>
      <h1 className="mt-3 font-serif text-5xl font-light tracking-[-0.04em]">This page is not in the dossier.</h1>
      <p className="mt-4 text-warm">The extension listing is still on the install page.</p>
      <div className="mt-6 flex gap-4">
        <Link className="text-link" href="/">
          Overview
        </Link>
        <Link className="text-link" href="/install">
          Install
        </Link>
      </div>
    </main>
  );
}
