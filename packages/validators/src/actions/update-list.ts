import { z } from "zod";

export const UpdateList = z.object({
  /** id */
  id: z.string(),
  boardId: z.string(),
  /** content */
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(1, {
      message: "Title is required",
    })
    .optional(),
  order: z.number().optional(),
  /** Activity Log */
  log: z.boolean().default(false).optional(),
});

export type UpdateListInput = z.infer<typeof UpdateList>;
