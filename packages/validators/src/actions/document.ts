import { z } from "zod";

import { CoverImage, Icon, Membership } from "../objects";

export const CreateDocument = z.intersection(
  Membership,
  z.object({
    type: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    }),
    title: z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
      })
      .min(1, "Title is required."),
    parentId: z.string().optional(),
    content: z.string().nullable().optional(),
  }),
);

export type CreateDocumentInput = z.infer<typeof CreateDocument>;

export const DeleteDocument = z.intersection(
  Membership,
  z.object({ id: z.string() }),
);

export type DeleteDocumentInput = z.infer<typeof DeleteDocument>;

export const UpdateDocument = z.intersection(
  Membership,
  z.object({
    /** Document Fields */
    id: z.string(),
    icon: Icon.nullable().optional(),
    coverImage: CoverImage.nullable().optional(),
    title: z.string().optional(),
    content: z.string().nullable().optional(),
    isPublished: z.boolean().optional(),
    /** Activity Log */
    log: z.boolean().default(false).optional(),
  }),
);

export type UpdateDocumentInput = z.infer<typeof UpdateDocument>;
