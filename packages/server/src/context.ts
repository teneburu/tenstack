import { getDbClient, type User as DBUserType, type Session as DBSessionType } from "@tenstack/db";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

// If @fastify/cookie types are not automatically augmenting FastifyRequest,
// this interface helps. Otherwise, opts.req can be used directly if it has .cookies
export interface RequestWithCookies extends FastifyRequest {
  cookies: { [key: string]: string | undefined };
}

// Determine the DB name
const DB_NAME_FOR_CONTEXT = 'auth'; // As used in auth.ts and db/index.ts for auth db

// Define User types for the context
// Based on session.ts, validateSessionToken returns a user object like: { id: string; role: 'customer'; }
// This aligns with StandardUserContext.
export type StandardUserContext = {
  id: string; 
  role: 'customer'; 
};

// Admin user type - keep if you plan to re-add admin auth, otherwise can be removed
// For now, auth.ts does not use admin logic, so ContextUser will simplify to StandardUserContext
// export type AdminContextUser = {
//   id: string; 
//   role: 'admin';
// };

// export type ContextUser = StandardUserContext | AdminContextUser;
export type ContextUser = StandardUserContext; // Simplified as admin auth is removed from auth.ts


// Define Context type explicitly
export type Context = {
  db: ReturnType<typeof getDbClient>;
  req: RequestWithCookies; // Use the extended request type or FastifyRequest if types are augmented
  res: FastifyReply;
  user?: ContextUser; // Optional user, will be StandardUserContext
};

export function createContext({ req, res }: CreateFastifyContextOptions): Context {
  const dbInstance = getDbClient(DB_NAME_FOR_CONTEXT);
  return {
    db: dbInstance,
    // Cast to RequestWithCookies. If @fastify/cookie correctly augments FastifyRequest type,
    // this cast might not be strictly necessary, but it's safer for now.
    req: req as RequestWithCookies,
    res: res,
    // user is undefined initially, populated by auth logic (e.g., in the `me` procedure)
  };
}
