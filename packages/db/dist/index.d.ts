import { NodePgDatabase } from 'drizzle-orm/node-postgres';
export { eq, desc, and, lt, inArray, like, type InferSelectModel, type SQL, asc } from 'drizzle-orm';
export declare const schema: {
    usersTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
        name: "user";
        schema: undefined;
        columns: {
            id: import("drizzle-orm/pg-core").PgColumn<{
                name: "id";
                tableName: "user";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: true;
                hasDefault: false;
                isPrimaryKey: true;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            email: import("drizzle-orm/pg-core").PgColumn<{
                name: "email";
                tableName: "user";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: true;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            hashedPassword: import("drizzle-orm/pg-core").PgColumn<{
                name: "hashed_password";
                tableName: "user";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: true;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
        };
        dialect: "pg";
    }>;
    sessionsTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
        name: "session";
        schema: undefined;
        columns: {
            id: import("drizzle-orm/pg-core").PgColumn<{
                name: "id";
                tableName: "session";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: true;
                hasDefault: false;
                isPrimaryKey: true;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            userId: import("drizzle-orm/pg-core").PgColumn<{
                name: "user_id";
                tableName: "session";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: true;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            expiresAt: import("drizzle-orm/pg-core").PgColumn<{
                name: "expires_at";
                tableName: "session";
                dataType: "date";
                columnType: "PgTimestamp";
                data: Date;
                driverParam: string;
                notNull: true;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
        };
        dialect: "pg";
    }>;
};
export type { User, Session } from './auth.schema.js';
/**
 * Returns a Drizzle instance connected to the specified database.
 * Reuses connection pools for efficiency.
 * @param dbName - The name of the database to connect to (e.g., 'auth', 'blog').
 */
export declare function getDbClient(dbName: string): NodePgDatabase<typeof schema>;
/**
 * Runs migrations on the specified database using the provided migrations folder.
 * @param dbName - The name of the database to migrate.
 * @param migrationsFolder - The absolute path to the migrations folder for this database.
 */
export declare function runMigrations(dbName: string, migrationsFolder: string): Promise<void>;
export declare function testConnection(dbName: string): Promise<boolean>;
