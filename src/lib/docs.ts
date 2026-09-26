import fs from "node:fs";
import path from "node:path";
import { docsManifest, type DocMeta } from "@/content/docs-manifest";

const DOCS_DIR = path.join(process.cwd(), "src/content/docs");

export function getDocMeta(slug: string): DocMeta | undefined {
  return docsManifest.find((d) => d.slug === slug);
}

export function getDocBody(meta: DocMeta): string {
  return fs.readFileSync(path.join(DOCS_DIR, meta.file), "utf-8");
}

export function getAllDocs(): Array<DocMeta & { body: string }> {
  return docsManifest.map((meta) => ({ ...meta, body: getDocBody(meta) }));
}

export const docCategories = Array.from(new Set(docsManifest.map((d) => d.category)));
