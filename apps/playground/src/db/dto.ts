import type { SettingsStore } from "@swy/notion";
import {  Role } from "@swy/validators";

import type { AccountModel, WorkspaceModel } from "./types";

export function toSettingsStore(
  account: AccountModel,
  workspace: WorkspaceModel,
  memberships: 
  origin: string,
): SettingsStore {
  // const membership = account.memberships.find(
  //   ({ workspaceId }) => workspaceId === workspace.id,
  // );
  return {
    account,
    workspace: {
      id: workspace.id,
      name: workspace.name,
      role: Role[membership!.role],
      icon: workspace.icon ?? { type: "text", text: workspace.name },
      inviteLink: `${origin}/invite/${workspace.inviteToken}`,
      domain: workspace.domain,
      plan: workspace.plan,
    },
  };
}
