import { LOCALE } from "@swy/i18n";

import type { IconInfo } from "@/components/custom/icon-block";
import type { ModalData } from "@/components/custom/modal-provider";
import type { GuestRow, MemberRow } from "@/components/notion/tables";
import { Plan, Role } from "@/components/notion/types";

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
export interface AccountStore {
  id: string;
  name: string;
  /** My Account */
  avatarUrl: string;
  preferredName: string;
  email: string;
  hasPassword?: boolean;
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
