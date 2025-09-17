import { createKysely } from "@vercel/postgres-kysely";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

import type { DB } from "./prisma/types";

export { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";

export * from "./prisma/types";
export * from "./prisma/enums";

// Create database instance
// For local development, ensure you have the correct POSTGRES_URL set
// For production, this will use Vercel's pooled connections automatically
export const db = process.env.POSTGRES_PRISMA_URL
  ? createKysely<DB>() // Vercel will use pooled connections
  : new Kysely<DB>({
      dialect: new PostgresDialect({
        pool: new Pool({
          connectionString: process.env.POSTGRES_URL || "postgresql://postgres:password@localhost:5432/saasfly"
        })
      })
    });
