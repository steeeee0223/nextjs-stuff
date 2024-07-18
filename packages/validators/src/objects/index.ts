import { z } from "zod";

export const Membership = z.object({
  accountId: z.string(),
  workspaceId: z.string(),
});

export const Icon = z.object({
  type: z.enum(["emoji", "lucide", "file"]),
  src: z.string(),
  color: z.string().nullable().optional(),
});

export const CoverImage = z.object({
  type: z.enum(["file", "url"]),
  url: z.string(),
});
