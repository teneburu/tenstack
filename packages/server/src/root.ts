import { createTRPCRouter } from "./utils.js";
import { authRouter } from "./routers/auth.js";

export const appRouter = createTRPCRouter({
  auth: authRouter,
});

export type AppRouter = typeof appRouter;