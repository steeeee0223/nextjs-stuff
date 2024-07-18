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
  accountId: z.string(),
  src: CardInfo,
  dest: CardInfo,
  boardId: z.string(),
});

export type CopyCardInput = z.infer<typeof CopyCard>;

export const CreateCard = z.intersection(
  CardInfo,
  z.object({
    accountId: z.string(),
    boardId: z.string(),
    description: z.string().nullable().optional(),
  }),
);

export type CreateCardInput = z.infer<typeof CreateCard>;

export const DeleteCard = z.object({
  accountId: z.string(),
  id: z.string(),
  boardId: z.string(),
});

export type DeleteCardInput = z.infer<typeof DeleteCard>;

export const UpdateCard = z.object({
  /** id */
  accountId: z.string(),
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
      .min(1, { message: "Title is required" }),
  ),
  description: z.optional(
    z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description is required",
      })
      .min(1, { message: "Description is required" }),
  ),
});

export type UpdateCardInput = z.infer<typeof UpdateCard>;

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
