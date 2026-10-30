"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addNote, removeNote, saveSmoke } from "@/lib/catalog";
import { clearSession, createSession, isDeskAuthed, passwordsMatch } from "@/lib/desk";

function refresh() {
  revalidatePath("/");
  revalidatePath("/desk");
  revalidatePath("/status");
  revalidatePath("/changelog");
  revalidatePath("/api/field");
  revalidatePath("/api/catalog");
}

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!passwordsMatch(password)) redirect("/desk?error=1");
  await createSession();
  redirect("/desk");
}

export async function logout() {
  await clearSession();
  redirect("/desk");
}

export async function createNote(formData: FormData) {
  if (!(await isDeskAuthed())) redirect("/desk?error=auth");
  try {
    await addNote({
      title: String(formData.get("title") ?? ""),
      body: String(formData.get("body") ?? ""),
      tag: String(formData.get("tag") ?? "NOTE"),
      author: String(formData.get("author") ?? "desk"),
    });
  } catch {
    redirect("/desk?error=note");
  }
  refresh();
}

export async function deleteNote(formData: FormData) {
  if (!(await isDeskAuthed())) redirect("/desk?error=auth");
  try {
    await removeNote(String(formData.get("id") ?? ""));
  } catch {
    // A dropped connection or a database that is gone used to surface as the error boundary.
    // The desk is an editor; a failed edit belongs next to the form.
    redirect("/desk?error=write");
  }
  refresh();
}

export async function updateSmoke(formData: FormData) {
  if (!(await isDeskAuthed())) redirect("/desk?error=auth");
  const keys = formData.getAll("keys").map(String);
  try {
    await saveSmoke(
      keys.map((itemKey) => ({
        itemKey,
        status: String(formData.get(`status:${itemKey}`) ?? "open"),
        note: String(formData.get(`note:${itemKey}`) ?? ""),
      })),
    );
  } catch {
    redirect("/desk?error=write");
  }
  refresh();
}
