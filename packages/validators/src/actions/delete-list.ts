import { z } from "zod";

export const DeleteList = z.object({ id: z.string(), boardId: z.string() });

export type DeleteListInput = z.infer<typeof DeleteList>;
