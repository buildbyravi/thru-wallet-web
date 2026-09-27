import { changelog } from "@/content/changelog";
import { listNotes } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  const notes = await listNotes(20);
  return Response.json({
    authored: changelog,
    fieldNotes: notes,
  });
}
