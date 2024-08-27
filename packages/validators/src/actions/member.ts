import { z } from "zod";

import { Membership, Role } from "../objects";

export const CreateMembers = z.object({
  workspaceId: z.string(),
  emails: z.array(z.string()),
  role: Role,
});

export type CreateMembersInput = z.infer<typeof CreateMembers>;

export const UpdateMember = z.intersection(
  Membership,
  z.object({ role: Role }),
);

export type UpdateMemberInput = z.infer<typeof UpdateMember>;

export const DeleteMember = Membership;

export type DeleteMemberInput = z.infer<typeof DeleteMember>;
