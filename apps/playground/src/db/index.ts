import { accounts } from "./accounts";
import { memberships } from "./memberships";
import type { AccountModel, MembershipModel, WorkspaceModel } from "./types";
import { workspaces } from "./workspaces";

export interface MockDB {
  accounts: Record<string, AccountModel>;
  workspaces: Record<string, WorkspaceModel>;
  memberships: MembershipModel[];
}

export const mockDB: MockDB = {
  accounts,
  workspaces,
  memberships,
};
