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

export type Model<K extends keyof MockDB> =
  MockDB[K] extends Record<string, infer V>
    ? V extends object
      ? V
      : never
    : MockDB[K] extends (infer U)[]
      ? U extends object
        ? U
        : never
      : never;
