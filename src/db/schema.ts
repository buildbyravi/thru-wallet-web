import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const fieldNotes = pgTable("field_notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  tag: text("tag").notNull().default("NOTE"),
  author: text("author").notNull().default("desk"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
});

export const smokeChecks = pgTable("smoke_checks", {
  id: uuid("id").defaultRandom().primaryKey(),
  itemKey: text("item_key").notNull().unique(),
  label: text("label").notNull(),
  detail: text("detail").notNull(),
  status: text("status").notNull().default("open"),
  note: text("note"),
  sort: integer("sort").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
});

export const deskSessions = pgTable("desk_sessions", {
  token: text("token").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
});

export type FieldNote = typeof fieldNotes.$inferSelect;
export type SmokeCheck = typeof smokeChecks.$inferSelect;
