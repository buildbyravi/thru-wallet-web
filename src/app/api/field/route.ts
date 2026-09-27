import { addNote, listNotes } from "@/lib/catalog";
import { isDeskAuthed } from "@/lib/desk";

export const dynamic = "force-dynamic";

export async function GET() {
  const notes = await listNotes(30);
  return Response.json({ notes });
}

export async function POST(request: Request) {
  if (!(await isDeskAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as { title?: string; body?: string; tag?: string } | null;
  if (!body) return Response.json({ error: "invalid_json" }, { status: 400 });
  try {
    const note = await addNote({
      title: body.title ?? "",
      body: body.body ?? "",
      tag: body.tag ?? "NOTE",
    });
    return Response.json({ note }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "rejected";
    return Response.json({ error: message }, { status: 400 });
  }
}
