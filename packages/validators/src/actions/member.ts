import { z } from "zod";

import { Membership, RoleObject } from "../objects";

export const CreateMembers = z.object({
  workspaceId: z.string(),
  emails: z.array(z.string()),
  role: RoleObject,
  inviteLink: z.string(),
});

export type CreateMembersInput = z.infer<typeof CreateMembers>;

export const UpdateMember = z.intersection(
  Membership,
  z.object({ role: RoleObject }),
);

export type UpdateMemberInput = z.infer<typeof UpdateMember>;

export const DeleteMember = Membership;

export type DeleteMemberInput = z.infer<typeof DeleteMember>;
