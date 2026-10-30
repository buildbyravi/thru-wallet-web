import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

function createPool(connectionString: string) {
  const created = new Pool({ connectionString });
  // A pg Pool emits 'error' for idle clients that drop their connection (a database restart, a
  // proxy timeout, a network blip). Node treats an unhandled 'error' event on an EventEmitter as
  // fatal, so without this listener one idle disconnect takes the whole server down. Logging it
  // lets the pool discard the client and hand out a fresh one on the next query.
  created.on("error", (error) => {
    console.error("Postgres idle client error; the pool will replace the connection.", error);
  });
  return created;
}

export const pool = databaseUrl
  ? (globalForDb.__arenaNextJsPostgresqlPool ?? createPool(databaseUrl))
  : null;

if (process.env.NODE_ENV !== "production" && pool) {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

/**
 * Database access is optional so public, read-only pages can use their
 * checked-in seed data when Postgres is not configured.
 */
export const db = pool ? drizzle(pool, { schema }) : null;
