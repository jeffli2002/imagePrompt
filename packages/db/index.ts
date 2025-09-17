import { createKysely } from "@vercel/postgres-kysely";
import { createPool } from "@vercel/postgres";

import type { DB } from "./prisma/types";

export { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";

export * from "./prisma/types";
export * from "./prisma/enums";

// Create database instance
// For local development, ensure you have the correct POSTGRES_URL set
// For production, this will use Vercel's pooled connections automatically
// Use createPool to ensure we're using the pooled connection
const pool = createPool();
export const db = createKysely<DB>({ pool });
