import { changelog } from "@/content/changelog";
import { docs } from "@/content/docs";
import { features } from "@/content/features";
import { routeCount } from "@/content/routes";
import { chromeStoreUrl, extensionId, pendingRelease, site, storeReview } from "@/content/site";
import { listNotes, listSmoke } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  const [notes, checks] = await Promise.all([listNotes(5), listSmoke()]);
  return Response.json({
    name: site.name,
    warning: site.warning,
    extension: {
      storeUrl: chromeStoreUrl,
      id: extensionId,
      listingVersion: site.listing.version,
      listingUpdated: site.listing.updated,
      listingNetwork: site.listing.network,
      listingVerifiedOn: site.listing.verifiedOn,
      offeredBy: site.listing.offeredBy,
      size: site.listing.size,
      privacy: site.links.privacy,
      source: site.repos.extension,
      website: site.repos.website,
    },
    contract: site.contract,
    storeReview,
    pendingRelease,
    routes: routeCount,
    features: features.length,
    docs: docs.map((doc) => ({ slug: doc.slug, title: doc.title, tag: doc.tag })),
    changelog: changelog.length,
    desk: {
      notes: notes.length,
      smokeOpen: checks.filter((check) => check.status !== "pass").length,
    },
  });
}
