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
      // Return a more complete dummy database object for build time
      if (process.env.NODE_ENV === 'development' || !process.env.POSTGRES_URL) {
        console.warn("Running without database connection");
        // Create a complete mock that satisfies KyselyAdapter
        const mockDb = {
          getExecutor: () => ({
            executeQuery: async () => ({ rows: [] }),
            adapter: {
              supportsReturning: true,
              supportsTransactionalDdl: true,
              supportsCte: true,
              supportsLateralJoin: true,
              acquireMigrationLock: async () => {},
              releaseMigrationLock: async () => {},
            },
          }),
          dynamic: {
            ref: () => {},
            cast: () => {},
          },
          selectFrom: () => ({ 
            where: () => ({ 
              executeTakeFirst: async () => null,
              execute: async () => ({ rows: [] }),
            }),
            select: () => ({ 
              executeTakeFirst: async () => null,
              execute: async () => ({ rows: [] }),
            }),
            selectAll: () => ({ 
              executeTakeFirst: async () => null,
              execute: async () => ({ rows: [] }),
            }),
          }),
          insertInto: () => ({ 
            values: () => ({ 
              execute: async () => ({ rows: [] }),
              returning: () => ({ executeTakeFirst: async () => null }),
            }),
          }),
          updateTable: () => ({ 
            set: () => ({ 
              where: () => ({ 
                execute: async () => ({ rows: [] }),
                returning: () => ({ execute: async () => ({ rows: [] }) }),
              }),
            }),
          }),
          deleteFrom: () => ({ 
            where: () => ({ 
              execute: async () => ({ rows: [] }),
            }),
          }),
          transaction: () => ({
            execute: async (cb: any) => cb(mockDb),
          }),
        } as unknown as Kysely<DB>;
        _db = mockDb;
        return mockDb;
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
      // Return appropriate mocks for build time
      if (typeof prop === 'string') {
        if (prop === 'getExecutor') {
          return () => ({
            executeQuery: async () => ({ rows: [] }),
            adapter: {
              supportsReturning: true,
              supportsTransactionalDdl: true,
              supportsCte: true,
              supportsLateralJoin: true,
              acquireMigrationLock: async () => {},
              releaseMigrationLock: async () => {},
            },
          });
        }
        if (prop === 'dynamic') {
          return {
            ref: () => {},
            cast: () => {},
          };
        }
        if (['selectFrom', 'insertInto', 'updateTable', 'deleteFrom'].includes(prop)) {
          return () => ({
            where: () => ({ 
              executeTakeFirst: async () => null,
              execute: async () => ({ rows: [] }),
            }),
            select: () => ({ 
              executeTakeFirst: async () => null,
              execute: async () => ({ rows: [] }),
            }),
            selectAll: () => ({ 
              executeTakeFirst: async () => null,
              execute: async () => ({ rows: [] }),
            }),
            values: () => ({ 
              execute: async () => ({ rows: [] }),
              returning: () => ({ executeTakeFirst: async () => null }),
            }),
            set: () => ({ 
              where: () => ({ 
                execute: async () => ({ rows: [] }),
                returning: () => ({ execute: async () => ({ rows: [] }) }),
              }),
            }),
          });
        }
      }
      return undefined;
    }
  }
});
