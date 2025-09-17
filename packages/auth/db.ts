import { createKysely } from "@vercel/postgres-kysely";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { GeneratedAlways } from "kysely";

interface Database {
  User: {
    id: GeneratedAlways<string>;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
  };
  Account: {
    id: GeneratedAlways<string>;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
  };
  Session: {
    id: GeneratedAlways<string>;
    userId: string;
    sessionToken: string;
    expires: Date;
  };
  VerificationToken: {
    identifier: string;
    token: string;
    expires: Date;
  };
}

// Create database instance
// For local development, ensure you have the correct POSTGRES_URL set
// For production, this will use Vercel's pooled connections automatically
export const db = process.env.POSTGRES_PRISMA_URL
  ? createKysely<Database>() // Vercel will use pooled connections
  : new Kysely<Database>({
      dialect: new PostgresDialect({
        pool: new Pool({
          connectionString: process.env.POSTGRES_URL || "postgresql://postgres:password@localhost:5432/saasfly"
        })
      })
    });
