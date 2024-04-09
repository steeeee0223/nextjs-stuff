import { z } from "zod";

export const UpdateDocument = z.object({
  /** Document Fields */
  id: z.string(),
  icon: z
    .object({
      type: z.enum(["emoji", "lucide", "file"]),
      src: z.string(),
      color: z.string().nullable().optional(),
    })
    .optional(),
  coverImage: z.string().nullable().optional(),
  title: z.string().optional(),
  content: z.string().nullable().optional(),
  isPublished: z.boolean().optional(),
  /** Activity Log */
  log: z.boolean().default(false).optional(),
});

export type UpdateDocumentInput = z.infer<typeof UpdateDocument>;
