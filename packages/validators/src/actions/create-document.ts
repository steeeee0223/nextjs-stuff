import { z } from "zod";

export const CreateDocument = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(1, "Title is required."),
  parentId: z.string().optional(),
});

export type CreateDocumentInput = z.infer<typeof CreateDocument>;
