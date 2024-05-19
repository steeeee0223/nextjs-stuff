import { z } from "zod";

export const CreateDocument = z.object({
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
});

export type CreateDocumentInput = z.infer<typeof CreateDocument>;
