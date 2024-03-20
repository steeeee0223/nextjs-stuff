import { z } from "zod";

export const UpdateCardOrder = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      listId: z.string(),
      order: z.number(),
    }),
  ),
  boardId: z.string(),
});

export type UpdateCardOrderInput = z.infer<typeof UpdateCardOrder>;
