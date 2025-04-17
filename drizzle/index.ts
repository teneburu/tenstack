import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import 'dotenv/config';

// Check for required environment variables
if (!process.env.DB_URL) {
  throw new Error('DB_URL environment variable is required');
}

// Create a PostgreSQL connection pool
const pool = new pg.Pool({
  connectionString: process.env.DB_URL,
});

// Create the database instance with our schema
export const db = drizzle(pool, { schema });

// Export schema for type inferencing
export { schema };

// Helper to run migrations programmatically
export async function runMigrations() {
  console.log('Running database migrations...');
  try {
    await migrate(db, { migrationsFolder: './drizzle/migrations' });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    throw error;
  }
}

// For testing connection
export async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connection successful:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
} 