import { z } from "zod";

export const DeleteDocument = z.object({ id: z.string() });

export type DeleteDocumentInput = z.infer<typeof DeleteDocument>;
