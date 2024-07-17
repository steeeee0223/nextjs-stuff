import { z } from "zod";

export const CopyList = z.object({
  accountId: z.string(),
  srcId: z.string(),
  destId: z.string(),
  boardId: z.string(),
});

export type CopyListInput = z.infer<typeof CopyList>;

export const CreateList = z.object({
  accountId: z.string(),
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

export const DeleteList = z.object({
  accountId: z.string(),
  id: z.string(),
  boardId: z.string(),
});

export type DeleteListInput = z.infer<typeof DeleteList>;

export const UpdateList = z.object({
  accountId: z.string(),
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
