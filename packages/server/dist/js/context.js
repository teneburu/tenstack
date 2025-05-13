import { getDbClient } from "@tenstack/db";
// Determine the DB name
const DB_NAME_FOR_CONTEXT = 'auth'; // As used in auth.ts and db/index.ts for auth db
export function createContext({ req, res }) {
    const dbInstance = getDbClient(DB_NAME_FOR_CONTEXT);
    return {
        db: dbInstance,
        // Cast to RequestWithCookies. If @fastify/cookie correctly augments FastifyRequest type,
        // this cast might not be strictly necessary, but it's safer for now.
        req: req,
        res: res,
        // user is undefined initially, populated by auth logic (e.g., in the `me` procedure)
    };
}
