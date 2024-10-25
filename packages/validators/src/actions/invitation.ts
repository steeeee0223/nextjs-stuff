import { z } from "zod";

import { RoleObject } from "../objects";

export const CreateInvitation = z.object({
  clerkInviteId: z.string(),
  workspaceId: z.string(),
  email: z.string(),
  role: RoleObject,
});

export type CreateInvitationInput = z.infer<typeof CreateInvitation>;
