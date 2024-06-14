import { z } from "zod";

import { CoverImage, Icon } from "../objects";

export const UpdateDocument = z.object({
  /** Document Fields */
  id: z.string(),
  icon: Icon.nullable().optional(),
  coverImage: CoverImage.nullable().optional(),
  title: z.string().optional(),
  content: z.string().nullable().optional(),
  isPublished: z.boolean().optional(),
  /** Activity Log */
  log: z.boolean().default(false).optional(),
});

export type UpdateDocumentInput = z.infer<typeof UpdateDocument>;
