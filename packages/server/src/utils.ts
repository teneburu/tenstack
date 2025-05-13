import { initTRPC } from "@trpc/server";
import type { Context } from './context.js'; // Import context type

// Specify context type and add transformer
export const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;