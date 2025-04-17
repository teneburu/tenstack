import { createTRPCRouter, publicProcedure } from "~/trpc/utils";
import { db } from "../../../drizzle";
import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async () => {
      return await db.query.products.findMany();
    }),
});

