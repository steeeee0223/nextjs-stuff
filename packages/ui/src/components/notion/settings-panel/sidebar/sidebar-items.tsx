/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SettingsStore } from "../index.types";

export interface TabProps {
  name: string;
  isActive: boolean;
  Icon: LucideIcon;
  onClick?: () => void;
}

export const Tab = ({ name, isActive, Icon, onClick }: TabProps) => {
  return (
    <div
      className={cn(
        "flex cursor-pointer select-none items-center gap-x-1 rounded-sm px-4 py-1 hover:bg-primary/10",
        isActive && "font-extrabold",
      )}
      onClick={onClick}
    >
      <Icon strokeWidth={1.75} className="h-5 w-5" />
      <p className="m-0 px-2 py-0 text-sm">{name}</p>
    </div>
  );
};

export const User = ({ settings }: { settings: SettingsStore }) => {
  const { user, account } = settings;

  return (
    <div className="flex items-center px-4 py-1">
      <div>
        <img
          src={account.avatarUrl}
          alt=" "
          className="mr-3 w-5 rounded-full border border-solid"
        />
      </div>
      <div>
        <div>
          <p className="text-sm font-medium text-primary">{user.name}</p>
        </div>
        <div>
          <p className="mt-1 text-xs text-primary/65">{user.email}</p>
        </div>
      </div>
    </div>
  );
};
