import { LOCALE } from "@acme/i18n";

import type { IconInfo } from "@/components/custom/icon-block";
import type { ModalData } from "@/components/custom/modal-provider";

export interface WorkspaceStore {
  id: string;
  name: string;
  icon: IconInfo;
  domain: string;
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
}) => Promise<void>;
