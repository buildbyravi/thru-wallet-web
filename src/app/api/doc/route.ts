import { docs, getDoc } from "@/content/docs";

export function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) {
    return Response.json({
      docs: docs.map((doc) => ({ slug: doc.slug, title: doc.title, description: doc.description, tag: doc.tag })),
    });
  }
  const doc = getDoc(slug);
  if (!doc) return Response.json({ error: "not_found" }, { status: 404 });
  return Response.json(doc);
}
