import { z } from "zod";

const CardInfo = z.object({
  id: z.string(),
  listId: z.string(),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(1, { message: "Title is required" }),
  order: z.number(),
});

export const CopyCard = z.object({
  src: CardInfo,
  dest: CardInfo,
  boardId: z.string(),
});

export type CopyCardInput = z.infer<typeof CopyCard>;
