import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { PageHeader } from "@/components/Section";
import { StoreButton } from "@/components/StoreButton";
import { drift } from "@/content/drift";
import { chromeStoreUrl, extensionId, release, site, source, unverified } from "@/content/site";
import { formatDay } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/install");

const commands = `git clone https://github.com/buildbyravi/thru-wallet-ext.git
cd thru-wallet-ext
npm install
npm test
npm run build
npm audit --omit=dev`;

export default function InstallPage() {
  return (
    <main className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 sm:py-16">
      <PageHeader
        path="/install"
        kicker="Install"
        title="Add the extension."
        lede="The Chrome Web Store listing is the public install path. The repository is the audit path. They stopped being the same build on 2026-10-04, when contract v16 merged hours after the package was cut, and both still call themselves the same version."
        meta={`Listing ${site.listing.version} · ${site.listing.updated} · id ${extensionId}`}
      />

      <section className="mt-10 overflow-hidden rounded-[1.6rem] bg-plate text-paper">
        <div className="plate-grain grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="label text-paper/55">Recommended · Chrome Web Store</p>
            <h2 className="mt-3 font-serif text-4xl leading-none font-light tracking-[-0.03em]">Thru Wallet</h2>
            <p className="mt-4 max-w-xl text-paper/75">{site.listing.blurb}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="label text-paper/45">Version</dt>
                <dd className="mt-1">{site.listing.version}</dd>
              </div>
              <div>
                <dt className="label text-paper/45">Updated</dt>
                <dd className="mt-1">{site.listing.updated}</dd>
              </div>
              <div>
                <dt className="label text-paper/45">Size</dt>
                <dd className="mt-1">{site.listing.size}</dd>
              </div>
              <div>
                <dt className="label text-paper/45">Contract</dt>
                <dd className="mt-1">
                  {drift.storeContract} · {drift.storeMethods} methods
                </dd>
              </div>
              <div>
                <dt className="label text-paper/45">Routes</dt>
                <dd className="mt-1">{drift.storeRoutes}</dd>
              </div>
              <div>
                <dt className="label text-paper/45">Permissions</dt>
                <dd className="mt-1">{site.listing.permissions}</dd>
              </div>
            </dl>
            <div className="mt-7 flex flex-wrap gap-3">
              <StoreButton variant="ghost" label="Add to Chrome" />
              <Link className="btn btn-ghost" href="/privacy">
                Privacy policy
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="label text-paper/50">Verify the listing</p>
            <ul className="mt-4 space-y-3 text-sm text-paper/80">
              <li>
                Extension id matches <span className="mono text-paper">{extensionId}</span>.
              </li>
              <li>
                The developer website resolves to <span className="mono text-paper">thruwallet.vercel.app</span>.
              </li>
              <li>Version still reads {site.listing.version}, updated {formatDay(site.listing.updated)}.</li>
              <li>Privacy policy points at the extension repository, not a random host.</li>
              <li>The page says it is not affiliated with Unto Labs.</li>
            </ul>
            <a
              className="mt-5 block text-sm break-all text-paper/60 underline underline-offset-4"
              href={chromeStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {chromeStoreUrl}
            </a>
          </div>
        </div>
      </section>

      <section className="mt-6 border-l-2 border-alert bg-alert-soft/50 px-5 py-4">
        <p className="label text-alert">Which contract you get, as of {site.listing.verifiedOn}</p>
        <p className="mt-2 max-w-3xl text-sm text-warm">
          A store install is package {site.listing.version} from {formatDay(site.listing.updated)} — contract{" "}
          {drift.storeContract}, {drift.storeMethods} methods, {drift.storeRoutes} routes, {drift.storePackages}, and{" "}
          <span className="mono">{release.rpc}</span> as the only allowed connect-src. A build from{" "}
          <span className="mono">main</span> is the same package number and a different wallet: contract{" "}
          {drift.sourceContract}, {drift.sourceMethods} methods, {drift.sourceRoutes} routes,{" "}
          {drift.sourcePackages}, plus the Domain screen. The listing has not moved since publication, and no tag after{" "}
          {release.tag} exists.
        </p>
        <p className="mt-3 max-w-3xl text-sm text-warm">
          What neither path gives you: verification. {unverified.note}
        </p>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="label text-warm">Developers · load unpacked</p>
          <h2 className="mt-2 font-serif text-3xl font-light tracking-[-0.03em]">Build dist/, then point Chrome at it.</h2>
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-warm">
            <li>Clone the extension repository and install dependencies.</li>
            <li>Run the test suite. It is local — {source.tests} on {site.contract.checkedOn} — and it does not certify Chrome or the chain.</li>
            <li>Build, then load the dist/ folder as an unpacked extension.</li>
            <li>After a code change, reload the extension so the service worker updates too.</li>
            <li>Register a .thru name on a throwaway account first — the registration is a real signed, irreversible broadcast.</li>
          </ol>
          <p className="mt-5 text-sm text-warm">
            Source:{" "}
            <a className="text-link" href={site.repos.extension}>
              {site.repos.extension}
            </a>
          </p>
        </div>
        <CodeBlock code={commands} label="thru-wallet-ext" />
      </section>

      <section className="mt-12 overflow-x-auto border-y border-rule">
        <table className="w-full min-w-[40rem] text-left">
          <thead>
            <tr className="border-b border-rule">
              <th className="label py-3 pr-4 font-medium text-warm"> </th>
              <th className="label py-3 pr-4 font-medium text-warm">Chrome Web Store</th>
              <th className="label py-3 font-medium text-warm">Load unpacked</th>
            </tr>
          </thead>
          <tbody className="text-warm">
            {[
              ["Who", "Anyone trying the wallet", "Someone auditing, patching, or needing domains now"],
              ["Artifact", `Listing ${site.listing.version}, ${site.listing.updated}`, `main at ${site.contract.commit}, built by you`],
              ["Contract", `${drift.storeContract} · ${drift.storeMethods} methods`, `${drift.sourceContract} · ${drift.sourceMethods} methods`],
              ["Routes", `${drift.storeRoutes}`, `${drift.sourceRoutes} — /name included`],
              ["Version string", `${drift.packageVersion}`, `${drift.packageVersion} (unchanged)`],
              ["Updates", "Chrome updates the listing — none since 2026-10-04", "You rebuild dist/ and reload the extension"],
            ].map((row) => (
              <tr key={row[0]} className="border-b border-rule/80">
                <th className="py-3 pr-4 font-serif text-lg font-normal text-ink">{row[0]}</th>
                <td className="py-3 pr-4">{row[1]}</td>
                <td className="py-3">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">If it misbehaves</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-warm">
          <li>You selected the repository root instead of dist/.</li>
          <li>Developer mode is off, so Load unpacked is hidden.</li>
          <li>The popup was reopened but the service worker was not reloaded.</li>
          <li>A serialization error names a method and field path. If Chrome&rsquo;s bare message appears, the failure is on the request.</li>
          <li>The Domain screen says a root is closed. That is a chain fact, not a bug: the .id root&rsquo;s authority is another key.</li>
        </ul>
        <p className="mt-6">
          <Link className="text-link" href="/docs/installation">
            Installation doc
          </Link>
          <span className="text-warm"> · </span>
          <Link className="text-link" href="/status">
            Open checks
          </Link>
        </p>
      </section>
    </main>
  );
}
