import { listSmoke, saveSmoke } from "@/lib/catalog";
import { isDeskAuthed } from "@/lib/desk";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks = await listSmoke();
  return Response.json({ checks });
}

export async function POST(request: Request) {
  if (!(await isDeskAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as {
    updates?: Array<{ itemKey?: string; status?: string; note?: string }>;
  } | null;
  const updates = body?.updates?.filter((item) => item.itemKey) ?? [];
  if (updates.length === 0) return Response.json({ error: "no_updates" }, { status: 400 });
  await saveSmoke(
    updates.map((item) => ({
      itemKey: item.itemKey ?? "",
      status: item.status ?? "open",
      note: item.note ?? "",
    })),
  );
  return Response.json({ ok: true });
}
