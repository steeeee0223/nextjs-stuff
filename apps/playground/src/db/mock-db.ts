import { accounts, memberships, workspaces } from "./data";
import type { AccountModel, MembershipModel, WorkspaceModel } from "./types";

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
