import { z } from "zod";


import { createTRPCRouter, protectedProcedure } from "../trpc";

const include = { workspace: true, createdBy: true, updatedBy: true }

export const documentRouter = createTRPCRouter({
  all: protectedProcedure
  .input(z.object({ workspaceId: z.string(), isArchived: z.boolean().optional() }))
  .query(({ ctx, input }) => {
    return ctx.db.document.findMany({
      where: input,
      orderBy: { createdAt: "desc" },
      include,
    })
  }),

  byId: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.document.findUnique({ where: { id: input }, include });
    }),
});
