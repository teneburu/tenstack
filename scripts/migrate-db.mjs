import { runMigrations } from '../packages/db/dist/index.js'; // Adjust path if needed
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Configuration ---
// Load environment variables from the root .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../'); // Assumes scripts is one level down from root
dotenv.config({ path: path.join(projectRoot, '.env') });

// --- Main Function ---
async function main() {
  // Get database names from command line arguments (skip first two: node path, script path)
  const dbNames = process.argv.slice(2);

  if (dbNames.length === 0) {
    console.error('Error: Please provide at least one database name as an argument.');
    console.log('Usage: pnpm run migrate-db <dbName1> [dbName2] ...');
    process.exit(1);
  }

  if (!process.env.DB_BASE_URL) {
    console.error('Error: DB_BASE_URL environment variable is not set.');
    console.error('Ensure it is defined in your .env file in the project root.');
    process.exit(1);
  }

  console.log(`Found databases to migrate: ${dbNames.join(', ')}`);

  for (const dbName of dbNames) {
    try {
      let migrationsFolder;
      if (dbName.toLowerCase() === 'auth') {
        migrationsFolder = path.join(projectRoot, 'packages/db/src/migrations_auth');
      // TODO: Add migrations for other databases here
      } else {
        console.error(`Unknown dbName "${dbName}" for determining migrations folder.`);
        continue; // Skip or handle error
      }
      console.log(`--- Starting migration for database: ${dbName} using folder ${migrationsFolder} ---`);
      // Ensure runMigrations in @parqu/db can accept a migrations folder option
      await runMigrations(dbName, migrationsFolder); 
      console.log(`--- Successfully migrated database: ${dbName} ---`);
    } catch (error) {
      console.error(`--- Failed to migrate database: ${dbName} ---`);
      // Optionally exit on first error, or continue with others
      // process.exit(1);
    }
    console.log('\n'); // Add space between logs for different databases
  }

  console.log('All specified database migrations attempted.');
}

// --- Execute Script ---
main().catch((error) => {
  console.error('An unexpected error occurred during the migration process:', error);
  process.exit(1);
}); 