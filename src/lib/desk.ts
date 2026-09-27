import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { db } from "@/db";
import { deskSessions } from "@/db/schema";

const COOKIE = "thru_desk";
const DEFAULT_PASSWORD = "alphanet-desk";

export function expectedPassword() {
  return process.env.DESK_PASSWORD || DEFAULT_PASSWORD;
}

export function deskIsWritable() {
  return db !== null;
}

export function passwordHint() {
  if (!deskIsWritable()) return "Read-only seed data · configure DATABASE_URL to open the desk.";
  return expectedPassword() === DEFAULT_PASSWORD
    ? "Preview password: alphanet-desk"
    : "Password is set in DESK_PASSWORD.";
}

export function passwordsMatch(input: string) {
  const left = createHash("sha256").update(input).digest();
  const right = createHash("sha256").update(expectedPassword()).digest();
  return timingSafeEqual(left, right);
}

export async function createSession() {
  if (!db) throw new Error("DATABASE_URL is required to open the desk.");
  const token = randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 12);
  await db.insert(deskSessions).values({ token, expiresAt });
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function clearSession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token && db) {
    await db.delete(deskSessions).where(eq(deskSessions.token, token));
  }
  jar.delete(COOKIE);
}

export async function isDeskAuthed() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token || !db) return false;
  const rows = await db.select().from(deskSessions).where(eq(deskSessions.token, token)).limit(1);
  const row = rows[0];
  if (!row || row.expiresAt.getTime() < Date.now()) return false;
  return true;
}
