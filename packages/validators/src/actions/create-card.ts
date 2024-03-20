import { z } from "zod";

export const CreateCard = z.object({
  // id
  id: z.string(),
  listId: z.string(),
  boardId: z.string(),
  // content
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(1, { message: "Title is required" }),
  description: z.string().nullable().optional(),
  order: z.number(),
});

export type CreateCardInput = z.infer<typeof CreateCard>;
