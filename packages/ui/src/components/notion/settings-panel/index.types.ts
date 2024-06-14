import type { IconInfo } from "@/components/custom/icon-block";
import type { ModalData } from "@/components/custom/modal-provider";

export interface UserStore {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}
export interface WorkspaceStore {
  id: string;
  name: string;
  icon: IconInfo;
  domain: string;
}
export interface AccountStore {
  /** My Account */
  avatarUrl: string;
  preferredName: string;
  email: string;
  hasPassword?: boolean;
}

export interface SettingsStore extends ModalData {
  user: UserStore;
  workspace: WorkspaceStore;
  account: AccountStore;
}

export type UpdateSettings = (data: {
  user?: Partial<UserStore>;
  workspace?: Partial<WorkspaceStore>;
  account?: Partial<AccountStore>;
}) => Promise<void>;
