import { z } from "zod";

export const CreateList = z.object({
  // id
  id: z.string(),
  boardId: z.string(),
  // content
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(1, {
      message: "Title is required",
    }),
  order: z.number(),
});

export type CreateListInput = z.infer<typeof CreateList>;
