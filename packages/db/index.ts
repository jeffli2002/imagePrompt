import { createKysely } from "@vercel/postgres-kysely";

import type { DB } from "./prisma/types";

export { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";

export * from "./prisma/types";
export * from "./prisma/enums";

// Create database instance
// For local development, ensure you have the correct POSTGRES_URL set
// For production, this will use Vercel's pooled connections automatically
// @vercel/postgres-kysely automatically handles the connection configuration
export const db = createKysely<DB>();
