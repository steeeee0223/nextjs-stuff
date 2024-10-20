import { z } from "zod";

import { Role } from "../objects";

export const CreateInvitation = z.object({
  clerkInviteId: z.string(),
  workspaceId: z.string(),
  email: z.string(),
  role: Role,
});

export type CreateInvitationInput = z.infer<typeof CreateInvitation>;
