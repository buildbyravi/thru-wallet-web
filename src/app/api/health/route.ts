import { sql } from "drizzle-orm";
import { db } from "@/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!db) {
    return Response.json({ ok: true, database: "unavailable", mode: "read-only" });
  }

  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, database: "connected", mode: "read-write" });
  } catch {
    return Response.json({ ok: true, database: "unavailable", mode: "read-only" });
  }
}
