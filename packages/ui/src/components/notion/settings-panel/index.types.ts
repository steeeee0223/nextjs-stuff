import type { ModalData } from "@/components/custom/modal-provider";

export interface UserStore {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}
export interface AccountStore {
  /** My Account */
  preferredName: string;
  email: string;
  password?: string | null;
}

export interface SettingsStore extends ModalData {
  user: UserStore;
  account: AccountStore;
}

export type UpdateSettings = (data: {
  user?: Partial<UserStore>;
  account?: Partial<AccountStore>;
}) => Promise<void>;
