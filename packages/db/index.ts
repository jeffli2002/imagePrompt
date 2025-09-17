import { createKysely } from "@vercel/postgres-kysely";
import type { Kysely } from "kysely";
import type { DB } from "./prisma/types";

export { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";

export * from "./prisma/types";
export * from "./prisma/enums";

// Create database instance with lazy initialization
// For local development, this will use POSTGRES_URL
// For Vercel deployment, it will use the Vercel Postgres environment variables
let _db: Kysely<DB> | null = null;

function getDb(): Kysely<DB> {
  if (!_db) {
    try {
      // Override the POSTGRES_URL check by setting a dummy value if needed
      if (!process.env.POSTGRES_URL && process.env.POSTGRES_PRISMA_URL) {
        process.env.POSTGRES_URL = process.env.POSTGRES_PRISMA_URL;
      }
      
      _db = createKysely<DB>();
    } catch (error) {
      console.error("Database connection error:", error);
      // Return a dummy database object for build time
      if (process.env.NODE_ENV === 'development' || !process.env.POSTGRES_URL) {
        console.warn("Running without database connection");
        return {} as Kysely<DB>;
      }
      throw error;
    }
  }
  return _db;
}

// Export a proxy that lazily initializes the database connection
export const db = new Proxy({} as Kysely<DB>, {
  get(target, prop, receiver) {
    try {
      const database = getDb();
      const value = Reflect.get(database, prop, database);
      if (typeof value === 'function') {
        return value.bind(database);
      }
      return value;
    } catch (error) {
      console.error("Database proxy error:", error);
      // Return a no-op function for build time
      if (typeof prop === 'string' && ['selectFrom', 'insertInto', 'updateTable', 'deleteFrom'].includes(prop)) {
        return () => ({
          where: () => ({ executeTakeFirst: async () => null }),
          select: () => ({ executeTakeFirst: async () => null }),
          selectAll: () => ({ executeTakeFirst: async () => null }),
        });
      }
      return undefined;
    }
  }
});
