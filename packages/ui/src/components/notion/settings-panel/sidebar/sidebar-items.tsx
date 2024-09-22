import type { LucideIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      tabIndex={-1}
      role="button"
      className={cn(
        "flex cursor-pointer select-none items-center gap-x-1 rounded-sm px-4 py-1 hover:bg-primary/10",
        isActive && "bg-primary/10 font-extrabold",
      )}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <Icon
        strokeWidth={1.75}
        className="size-5 text-icon dark:text-icon-dark"
      />
      <p className="m-0 px-2 py-0 text-sm">{name}</p>
    </div>
  );
};

export const User = ({ settings }: { settings: SettingsStore }) => {
  const { account } = settings;

  return (
    <div className="flex items-center px-4 py-1">
      <div>
        <Avatar className="mr-3 size-5 border">
          <AvatarImage src={account.avatarUrl} alt="" />
          <AvatarFallback>{account.name[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <div>
          <p className="text-sm font-medium">{account.name}</p>
        </div>
        <div>
          <p className="text-xs text-secondary dark:text-secondary-dark">
            {account.email}
          </p>
        </div>
      </div>
    </div>
  );
};
