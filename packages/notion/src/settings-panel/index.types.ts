import { LOCALE } from "@swy/i18n";
import type { IconInfo, ModalData } from "@swy/ui/shared";
import { Plan, Role, type User } from "@swy/validators";

import type { GuestRow, MemberRow } from "../tables";

export interface WorkspaceStore {
  id: string;
  name: string;
  icon: IconInfo;
  domain: string;
  /** People */
  inviteLink: string;
  /** Plans */
  plan: Plan;
  /** Current account */
  role: Role;
}
export interface AccountStore extends User {
  /** My Account */
  preferredName: string;
  hasPassword?: boolean;
  /** Region */
  language?: LOCALE;
}

export interface SettingsStore extends ModalData {
  workspace: WorkspaceStore;
  account: AccountStore;
}

export type UpdateSettings = (data: {
  workspace?: Partial<WorkspaceStore>;
  account?: Partial<AccountStore>;
}) => void;

export interface WorkspaceMemberships {
  members: MemberRow[];
  guests: GuestRow[];
}
