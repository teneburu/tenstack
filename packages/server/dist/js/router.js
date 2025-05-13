import { initTRPC } from "@trpc/server";
import { z } from "zod";
const t = initTRPC.context().create();
// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
export const appRouter = router({
    // Define your tRPC procedures here
    hello: publicProcedure
        .input(z.object({ name: z.string().nullish() }).nullish())
        .query(({ input, ctx }) => {
        return {
            greeting: `Hello ${input?.name ?? ctx.user?.name ?? "world"}`,
        };
    }),
});
