import { z } from "zod";

import { Icon } from "../objects";

export const UpdateAccountSettings = z.object({
  avatarUrl: z.string().optional(),
  preferredName: z.string().optional(),
  email: z.string().email().optional(),
  hasPassword: z.boolean().optional(),
});

export type UpdateAccountSettingsInput = z.infer<typeof UpdateAccountSettings>;

export const UpdateWorkspaceSettings = z.object({
  name: z.string().optional(),
  icon: Icon.nullable().optional(),
  domain: z.string().optional(),
});

export type UpdateWorkspaceSettingsInput = z.infer<
  typeof UpdateWorkspaceSettings
>;
