"use client";

import { createContext, useContext } from "react";
import type { UseThemeProps } from "next-themes/dist/types";

import type { Connection } from "@/components/notion/tables";
import {
  ConnectionStrategy,
  Role,
  Scope,
  UploadFile,
} from "@/components/notion/types";
import type {
  SettingsStore,
  UpdateSettings,
  WorkspaceMemberships,
} from "./index.types";
import type { TabType } from "./sidebar";

export interface SettingsContextInterface
  extends Pick<UseThemeProps, "theme" | "setTheme"> {
  settings: SettingsStore;
  scopes: Set<Scope>;
  tab: TabType;
  setTab: (tab: TabType) => void;
  updateSettings: UpdateSettings;
  uploadFile?: UploadFile;
  deleteAccount?: (data: { accountId: string; email: string }) => void;
  deleteWorkspace?: (workspaceId: string) => void;
  /** Connections */
  connections: {
    load?: () => Promise<Connection[]>;
    add?: (strategy: ConnectionStrategy) => Promise<void>;
  };
  /** People */
  people: {
    load?: () => Promise<WorkspaceMemberships>;
    add?: (emails: string[], role: Role) => void;
    update?: (id: string, role: Role) => void;
    delete?: (id: string) => void;
  };
}

export const SettingsContext = createContext<SettingsContextInterface | null>(
  null,
);

export function useSettings(): SettingsContextInterface {
  const object = useContext(SettingsContext);
  if (!object)
    throw new Error("useSettings must be used within SettingsProvider");
  return object;
}
