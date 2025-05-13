// packages/db/src/auth.schema.ts
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { type InferSelectModel } from "drizzle-orm";

export const usersTable = pgTable("user", {
	id: text("id").primaryKey(), // Medusa customer IDs (e.g., cus_...)
	email: text("email").notNull().unique(), // Added for login/registration
	hashedPassword: text("hashed_password").notNull(), // Added for storing hashed passwords
	// Add any other user-specific fields you want to store locally
});

export const sessionsTable = pgTable("session", {
	id: text("id").primaryKey(), // SHA-256 hash of the session token
	userId: text("user_id")
		.notNull()
		.references(() => usersTable.id), // Reference the text ID in usersTable
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});

// Export inferred types
export type User = InferSelectModel<typeof usersTable>;
export type Session = InferSelectModel<typeof sessionsTable>;
