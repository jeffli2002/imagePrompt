import { createKysely } from "@vercel/postgres-kysely";
import type { DB } from "./prisma/types";

export { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";

export * from "./prisma/types";
export * from "./prisma/enums";

// Create database instance
// The @vercel/postgres-kysely package will automatically use the correct
// environment variables when deployed to Vercel
// For local development, set POSTGRES_URL in your .env.local file
let db: ReturnType<typeof createKysely<DB>>;

try {
  db = createKysely<DB>();
} catch (error) {
  console.error("Failed to create database connection:", error);
  // Create a dummy instance for build time
  // This will be replaced with a real connection at runtime
  db = {} as ReturnType<typeof createKysely<DB>>;
}

export { db };
