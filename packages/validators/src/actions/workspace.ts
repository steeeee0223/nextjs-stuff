import { z } from "zod";

import { Icon, Membership } from "../objects";

export const CreateWorkspace = z.object({
  createdBy: z.string(),
  name: z.string(),
  icon: Icon.nullable().optional(),
});

export type CreateWorkspaceInput = z.infer<typeof CreateWorkspace>;

export const DeleteWorkspace = z.object({ id: z.string() });

export type DeleteWorkspaceInput = z.infer<typeof DeleteWorkspace>;

export const JoinWorkspace = z.intersection(
  Membership,
  z.object({
    withClerkTicket: z.boolean().optional(),
  }),
);

export type JoinWorkspaceInput = z.infer<typeof JoinWorkspace>;

export const UpdateWorkspace = z.object({
  name: z.string().optional(),
  icon: Icon.nullable().optional(),
  domain: z.string().optional(),
  inviteToken: z.string().optional(),
});

export type UpdateWorkspaceInput = z.infer<typeof UpdateWorkspace>;
