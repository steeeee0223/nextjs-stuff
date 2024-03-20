import { z } from "zod";

export const UpdateCard = z.object({
  /** id */
  id: z.string(),
  listId: z.string(),
  boardId: z.string(),
  /** content */
  title: z.optional(
    z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
      })
      .min(1, {
        message: "Title is required",
      }),
  ),
  description: z.optional(
    z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description is required",
      })
      .min(1, {
        message: "Description is required",
      }),
  ),
});

export type UpdateCardInput = z.infer<typeof UpdateCard>;
