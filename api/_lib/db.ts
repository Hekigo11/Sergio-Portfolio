import { neon } from "@neondatabase/serverless";

const connectionString =
  process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "";

export const sql = neon(connectionString);

let schemaReady: Promise<void> | null = null;

// Idempotent — cheap enough at this traffic scale to run per cold start
// instead of wiring up a separate migration step for two tables.
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS comments (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          ip_hash TEXT,
          hidden BOOLEAN NOT NULL DEFAULT false
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS contact_submissions (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          ip_hash TEXT
        )
      `;
      // ALTER ... ADD COLUMN IF NOT EXISTS rather than folding ip_hash into the
      // CREATE above: this runs against a database that may already have
      // contact_submissions from before rate-limiting existed, and CREATE TABLE
      // IF NOT EXISTS is a no-op once the table is there — it would never add
      // the column to an already-deployed table.
      await sql`
        ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS ip_hash TEXT
      `;
    })();
  }
  return schemaReady;
}
