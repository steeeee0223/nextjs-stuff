import { z } from "zod";

export const CopyList = z.object({
  srcId: z.string(),
  destId: z.string(),
  boardId: z.string(),
});

export type CopyListInput = z.infer<typeof CopyList>;
