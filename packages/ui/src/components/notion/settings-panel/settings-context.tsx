"use client";

import { createContext, useContext } from "react";
import type { UseThemeProps } from "next-themes/dist/types";

import type { Connection } from "@/components/notion/tables";
import { ConnectionStrategy, Role, Scope } from "@/components/notion/types";
import type {
  SettingsStore,
  UpdateSettings,
  WorkspaceMemberships,
} from "./index.types";

export interface SettingsContextInterface
  extends Pick<UseThemeProps, "theme" | "setTheme"> {
  settings: SettingsStore;
  scopes: Set<Scope>;
  updateSettings: UpdateSettings;
  uploadFile?: (
    file: File,
    options?: { replaceTargetUrl?: string },
  ) => Promise<{ url: string }>;
  deleteAccount?: (data: { accountId: string; email: string }) => Promise<void>;
  deleteWorkspace?: (workspaceId: string) => Promise<void>;
  /** Connections */
  connections: {
    load?: () => Promise<Connection[]>;
    add?: (strategy: ConnectionStrategy) => Promise<void>;
  };
  /** People */
  people: {
    load?: () => Promise<WorkspaceMemberships>;
    add?: (emails: string[], role: Role) => Promise<void>;
    update?: (id: string, role: Role) => Promise<void>;
    delete?: (id: string) => Promise<void>;
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
