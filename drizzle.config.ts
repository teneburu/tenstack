import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL || "postgresql://postgres:postgres@localhost:5432/postgres",
  },
});