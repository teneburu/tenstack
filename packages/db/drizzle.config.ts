import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/schema.ts',
  out:    './src/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_BASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres',
  },
});
