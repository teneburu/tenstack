import pg from 'pg';
const { Pool } = pg;
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

// Re-export commonly used Drizzle functions
export { eq, desc, and, lt, inArray, like, type InferSelectModel, type SQL, asc } from 'drizzle-orm';

// Import schemas from their dedicated files
import * as authSchemaContents from './auth.schema.js';

// Combine schemas into a single object for Drizzle and application use
export const schema = {
  ...authSchemaContents,
};

// Export types from their respective schema files
export type { User, Session } from './auth.schema.js';

// Store pools per database name to reuse connections
const pools: Record<string, pg.Pool> = {};

function getPool(dbName: string): pg.Pool {
  const databaseUrl = `${process.env.DB_BASE_URL}/${dbName}`;
  if (!process.env.DB_BASE_URL) {
    throw new Error("DB_BASE_URL environment variable is not set.");
  }
  if (!pools[dbName]) {
    console.log(`Creating connection pool for database: ${dbName}`);
    pools[dbName] = new Pool({ connectionString: databaseUrl });
  }
  return pools[dbName];
}

/**
 * Returns a Drizzle instance connected to the specified database.
 * Reuses connection pools for efficiency.
 * @param dbName - The name of the database to connect to (e.g., 'auth', 'blog').
 */
export function getDbClient(dbName: string): NodePgDatabase<typeof schema> {
  if (!dbName) {
    throw new Error("Database name must be provided to getDbClient.");
  }
  const pool = getPool(dbName);
  // Create a Drizzle instance for the specific pool and the combined schema
  return drizzle(pool, { schema }); 
}

/**
 * Runs migrations on the specified database using the provided migrations folder.
 * @param dbName - The name of the database to migrate.
 * @param migrationsFolder - The absolute path to the migrations folder for this database.
 */
export async function runMigrations(dbName: string, migrationsFolder: string) {
  if (!dbName) {
    throw new Error("Database name must be provided to runMigrations.");
  }
  if (!migrationsFolder) {
    throw new Error("Migrations folder must be provided to runMigrations.");
  }
  console.log(`Running database migrations on '${dbName}' using folder: ${migrationsFolder}...`);
  try {
    // Get a specific client for the migration
    const migrationDb = getDbClient(dbName);
    await migrate(migrationDb, { migrationsFolder: migrationsFolder });
    console.log(`Migrations completed successfully on '${dbName}' from ${migrationsFolder}`);
  } catch (error) {
    console.error(`Error running migrations on '${dbName}' from ${migrationsFolder}:`, error);
    throw error;
  }
}

export async function testConnection(dbName: string) {
  if (!dbName) {
    throw new Error("Database name must be provided to testConnection.");
  }
  console.log(`Testing connection to '${dbName}'...`);
  try {
    const pool = getPool(dbName);
    const result = await pool.query('SELECT NOW()');
    console.log(`Database connection successful for '${dbName}':`, result.rows[0]);
    return true;
  } catch (error) {
    console.error(`Database connection failed for '${dbName}':`, error);
    return false;
  }
} 