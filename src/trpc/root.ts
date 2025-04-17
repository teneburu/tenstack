import { createTRPCRouter } from "~/trpc/utils";
import { productsRouter } from "./routers/products";

export const appRouter = createTRPCRouter({
  products: productsRouter,
});

export type AppRouter = typeof appRouter;