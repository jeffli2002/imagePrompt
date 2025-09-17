import { createKysely } from "@vercel/postgres-kysely";
import { Kysely } from "kysely";
import type { DB } from "./prisma/types";

export { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";

export * from "./prisma/types";
export * from "./prisma/enums";

// Create database instance with lazy initialization
// The @vercel/postgres-kysely package will automatically use the correct
// environment variables when deployed to Vercel
// For local development, set POSTGRES_URL in your .env.local file
let _db: Kysely<DB> | null = null;

function getDb(): Kysely<DB> {
  if (!_db) {
    _db = createKysely<DB>();
  }
  return _db;
}

// Export a proxy that lazily initializes the database connection
export const db = new Proxy({} as Kysely<DB>, {
  get(target, prop, receiver) {
    const database = getDb();
    const value = Reflect.get(database, prop, database);
    if (typeof value === 'function') {
      return value.bind(database);
    }
    return value;
  }
});
