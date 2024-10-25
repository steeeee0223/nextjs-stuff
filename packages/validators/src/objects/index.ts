import { z } from "zod";

export const UserObject = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string(),
});
export type User = z.infer<typeof UserObject>;

export const Membership = z.object({
  accountId: z.string(),
  workspaceId: z.string(),
});

export const Icon = z.object({
  type: z.enum(["emoji", "lucide", "file"]),
  src: z.string(),
  color: z.string().nullable().optional(),
});

export const CoverImageObject = z.object({
  type: z.enum(["file", "url"]),
  url: z.string(),
});
export type CoverImage = z.infer<typeof CoverImageObject>;

export enum Role {
  OWNER = "owner",
  MEMBER = "member",
  GUEST = "guest",
}
export const RoleObject = z.nativeEnum(Role);

export enum Plan {
  FREE = "free",
  EDUCATION = "education",
  PLUS = "plus",
  BUSINESS = "business",
  ENTERPRISE = "enterprise",
}
export const PlanObject = z.nativeEnum(Plan);
