import { initTRPC } from "@trpc/server";
// Specify context type and add transformer
export const t = initTRPC.context().create();
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
