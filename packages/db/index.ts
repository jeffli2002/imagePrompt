import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { DB } from "./prisma/types";

export { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";

export * from "./prisma/types";
export * from "./prisma/enums";

// Create database instance
// Use regular pg pool for both local and production
// The connection string will determine if it's pooled or direct
let _db: Kysely<DB> | null = null;

function getDb(): Kysely<DB> {
  if (!_db) {
    // Use POSTGRES_URL which should be the pooled connection
    const connectionString = process.env.POSTGRES_URL;
    
    if (!connectionString) {
      throw new Error("POSTGRES_URL environment variable is not set");
    }

    _db = new Kysely<DB>({
      dialect: new PostgresDialect({
        pool: new Pool({
          connectionString,
          ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
        }),
      }),
    });
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
