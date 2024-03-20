import { z } from "zod";

export const UpdateListOrder = z.object({
  lists: z.array(
    z.object({
      id: z.string(),
      order: z.number(),
    }),
  ),
  boardId: z.string(),
});

export type UpdateListOrderInput = z.infer<typeof UpdateListOrder>;
