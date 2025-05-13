import { getDbClient } from "@tenstack/db";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
export interface RequestWithCookies extends FastifyRequest {
    cookies: {
        [key: string]: string | undefined;
    };
}
export type StandardUserContext = {
    id: string;
    role: 'customer';
};
export type ContextUser = StandardUserContext;
export type Context = {
    db: ReturnType<typeof getDbClient>;
    req: RequestWithCookies;
    res: FastifyReply;
    user?: ContextUser;
};
export declare function createContext({ req, res }: CreateFastifyContextOptions): Context;
