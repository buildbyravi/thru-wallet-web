import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { fieldNotes, smokeChecks, type FieldNote, type SmokeCheck } from "@/db/schema";
import { smokeSeed } from "@/content/smoke";
import { noteSeed } from "@/content/seeds";

const tags = new Set(["NOTE", "SMOKE", "RELEASE", "SECURITY", "DOCS", "FIX"]);
const smokeStatuses = new Set(["open", "pass", "fail", "blocked"]);

const fallbackNotes: FieldNote[] = noteSeed
  .map((note, index) => ({
    id: `seed-note-${index + 1}`,
    ...note,
  }))
  .sort((left, right) => right.createdAt.getTime() - left.createdAt.getTime());

const fallbackSmoke: SmokeCheck[] = smokeSeed.map((check, index) => ({
  id: `seed-smoke-${index + 1}`,
  ...check,
  note: null,
  updatedAt: new Date("2026-09-26T00:00:00Z"),
}));

function requireDatabase() {
  if (!db) {
    throw new Error("DATABASE_URL is required for catalog writes.");
  }
  return db;
}

function reportReadFailure(error: unknown) {
  console.error("Catalog database unavailable; serving checked-in seed data.", error);
}

export function normalizeTag(value: string) {
  const tag = value.trim().toUpperCase();
  return tags.has(tag) ? tag : "NOTE";
}

export function normalizeSmokeStatus(value: string) {
  const status = value.trim().toLowerCase();
  return smokeStatuses.has(status) ? status : "open";
}

async function ensureCatalog(database: NonNullable<typeof db>) {
  const existing = await database.select({ itemKey: smokeChecks.itemKey }).from(smokeChecks);
  const have = new Set(existing.map((row) => row.itemKey));
  const missing = smokeSeed.filter((item) => !have.has(item.itemKey));
  if (missing.length > 0) {
    await database
      .insert(smokeChecks)
      .values(
        missing.map((item) => ({
          itemKey: item.itemKey,
          label: item.label,
          detail: item.detail,
          status: item.status,
          sort: item.sort,
        })),
      )
      .onConflictDoNothing();
  }

  const notes = await database.select({ id: fieldNotes.id }).from(fieldNotes).limit(1);
  if (notes.length === 0) {
    await database
      .insert(fieldNotes)
      .values(
        noteSeed.map((note) => ({
          title: note.title,
          body: note.body,
          tag: note.tag,
          author: note.author,
          createdAt: note.createdAt,
        })),
      )
      .onConflictDoNothing();
  }
}

export async function listNotes(limit = 20): Promise<FieldNote[]> {
  if (!db) return fallbackNotes.slice(0, limit);

  try {
    await ensureCatalog(db);
    return await db.select().from(fieldNotes).orderBy(desc(fieldNotes.createdAt)).limit(limit);
  } catch (error) {
    reportReadFailure(error);
    return fallbackNotes.slice(0, limit);
  }
}

export async function listSmoke(): Promise<SmokeCheck[]> {
  if (!db) return fallbackSmoke;

  try {
    await ensureCatalog(db);
    return await db.select().from(smokeChecks).orderBy(asc(smokeChecks.sort));
  } catch (error) {
    reportReadFailure(error);
    return fallbackSmoke;
  }
}

export async function addNote(input: { title: string; body: string; tag: string; author?: string }) {
  const title = input.title.trim();
  const body = input.body.trim();
  if (title.length < 4 || title.length > 140) {
    throw new Error("Title must be between 4 and 140 characters.");
  }
  if (body.length < 8 || body.length > 4000) {
    throw new Error("Note must be between 8 and 4000 characters.");
  }
  const database = requireDatabase();
  const [row] = await database
    .insert(fieldNotes)
    .values({
      title,
      body,
      tag: normalizeTag(input.tag),
      author: input.author?.trim() || "desk",
    })
    .returning();
  return row;
}

export async function removeNote(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return;
  await requireDatabase().delete(fieldNotes).where(eq(fieldNotes.id, id));
}

export async function saveSmoke(
  updates: Array<{ itemKey: string; status: string; note: string }>,
) {
  const database = requireDatabase();
  for (const update of updates) {
    await database
      .update(smokeChecks)
      .set({
        status: normalizeSmokeStatus(update.status),
        note: update.note.trim() || null,
        updatedAt: new Date(),
      })
      .where(eq(smokeChecks.itemKey, update.itemKey));
  }
}
