import { z } from "zod";
import { TRPCError } from "@trpc/server";
import argon2 from "argon2"; // For password hashing
// Correctly import from @tenstack/db
import { getDbClient, schema, eq } from "@tenstack/db";
import { createTRPCRouter, publicProcedure } from "../utils.js";
// Import session utilities from session.ts
import { generateSessionToken, createSession, validateSessionToken, invalidateSession
// invalidateAllSessions, // Not currently used in this router
 } from "../session.js"; // Corrected path
// --- Cookie Settings ---
const SESSION_COOKIE_NAME = "session_token"; // Using a more specific name for the token
const COOKIE_OPTIONS = {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Use lowercase "none" and "lax"
    maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
};
// --- Input Schemas ---
const registerInputSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8), // Consider password strength requirements
    // Add other fields like firstName, lastName if needed for user creation
    // For simplicity, Lucia example focuses on user ID.
    // We'll assume email is unique and used for user lookup/creation if not using Medusa.
});
const loginInputSchema = z.object({
    email: z.string().email(),
    password: z.string(), // Password validation will be against stored hash
});
// --- Authentication Router ---
export const authRouter = createTRPCRouter({
    register: publicProcedure
        .input(registerInputSchema)
        .mutation(async ({ input, ctx }) => {
        const db = getDbClient("auth"); // Get DB client for "auth" database
        const existingUser = await db.query.usersTable.findFirst({
            where: eq(schema.usersTable.email, input.email),
        });
        if (existingUser) {
            throw new TRPCError({ code: "CONFLICT", message: "User with this email already exists." });
        }
        const hashedPassword = await argon2.hash(input.password);
        // Create a new user ID or use a scheme compatible with your User table's ID type
        // For this example, we assume the User ID can be derived or is an email (if your schema allows text ID)
        // If your user ID is auto-generated (e.g. serial), you'd insert and get the ID back.
        // For now, using email as ID, assuming `usersTable.id` is text. Adjust if not.
        let userId = input.email; // Placeholder if ID is not auto-generated
        try {
            const newUserInput = {
                id: userId,
                email: input.email,
                hashedPassword: hashedPassword,
            };
            const result = await db.insert(schema.usersTable).values(newUserInput).returning({ id: schema.usersTable.id });
            if (result.length > 0 && result[0].id) {
                userId = result[0].id;
            }
            else {
                console.warn("User ID not returned from insert, falling back to input email as ID or pre-generated ID.");
            }
        }
        catch (dbError) {
            console.error("Error creating user:", dbError);
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Could not create user." });
        }
        const sessionToken = generateSessionToken();
        await createSession(db, sessionToken, userId); // Use createSession from session.ts
        ctx.res.setCookie(SESSION_COOKIE_NAME, sessionToken, COOKIE_OPTIONS);
        return { success: true, userId: userId, token: sessionToken };
    }),
    login: publicProcedure
        .input(loginInputSchema)
        .mutation(async ({ input, ctx }) => {
        const db = getDbClient("auth"); // Get DB client
        const user = await db.query.usersTable.findFirst({
            where: eq(schema.usersTable.email, input.email),
        });
        if (!user || !user.hashedPassword) {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password." });
        }
        const isValidPassword = await argon2.verify(user.hashedPassword, input.password);
        if (!isValidPassword) {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password." });
        }
        const sessionToken = generateSessionToken();
        await createSession(db, sessionToken, user.id); // Use createSession from session.ts
        ctx.res.setCookie(SESSION_COOKIE_NAME, sessionToken, COOKIE_OPTIONS);
        return { success: true, userId: user.id, token: sessionToken };
    }),
    me: publicProcedure
        .query(async ({ ctx }) => {
        const db = getDbClient("auth"); // Get DB client
        const sessionToken = ctx.req.cookies?.[SESSION_COOKIE_NAME];
        if (!sessionToken) {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated." });
        }
        const { session, user } = await validateSessionToken(db, sessionToken); // Use validateSessionToken from session.ts
        if (!session || !user) {
            ctx.res.clearCookie(SESSION_COOKIE_NAME, { path: COOKIE_OPTIONS.path });
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid session." });
        }
        ctx.user = user;
        return { user };
    }),
    logout: publicProcedure
        .mutation(async ({ ctx }) => {
        const db = getDbClient("auth"); // Get DB client
        const sessionToken = ctx.req.cookies?.[SESSION_COOKIE_NAME];
        if (sessionToken) {
            await invalidateSession(db, sessionToken);
        }
        ctx.res.clearCookie(SESSION_COOKIE_NAME, { path: COOKIE_OPTIONS.path });
        return { success: true };
    }),
});
// Ensure your schema definitions in @tenstack/db are compatible:
// export const usersTable = pgTable("user", {
// 	id: text("id").primaryKey(), 
//  email: text("email").unique().notNull(),
//  hashedPassword: text("hashed_password").notNull(),
// });
// export const sessionsTable = pgTable("session", { // Corrected to sessionsTable if that's your schema
// 	id: text("id").primaryKey(), 
// 	userId: text("user_id") 
// ... existing code ...
