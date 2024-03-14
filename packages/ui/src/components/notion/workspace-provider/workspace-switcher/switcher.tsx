"use client";

import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { cn } from "@/lib";
import { useWorkspace } from "../workspace-context";
import HeaderDropdown from "./header-dropdown";
import WorkspaceList from "./workspace-list";

const styles = {
  seperator: "bg-primary/15",
  action: "w-full cursor-pointer text-xs text-muted-foreground rounded-sm",
};

export interface WorkspaceSwitcherProps {
  onCreateAccount?: () => void;
  onLogout?: () => void;
  onSelect?: (id: string) => Promise<void>;
}

export const WorkspaceSwitcher = ({
  onLogout,
  onSelect,
}: WorkspaceSwitcherProps) => {
  const { user, activeWorkspace, select, dispatch } = useWorkspace();
  const handleLogout = () => {
    select();
    dispatch({ type: "set", payload: [] });
    onLogout?.();
  };
  const handleGetMac = () =>
    window.open("https://www.notion.so/desktop", "_blank");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className={cn(
            "flex items-center",
            "w-full p-3 text-sm hover:bg-primary/5",
            "hover:rounded-sm",
          )}
        >
          <div className={cn("flex items-center gap-x-2", "max-w-[150px]")}>
            <p className="text-lg">{activeWorkspace?.icon}</p>
            <span className="line-clamp-1 text-start font-medium">
              {activeWorkspace?.name}
            </span>
          </div>
          <ChevronsUpDown
            className={cn("h-4 w-4", "ml-2 text-muted-foreground")}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-[99999] w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <DropdownMenuGroup>
          <div className="flex flex-col space-y-2 p-2">
            <div className="flex items-center">
              <p className="flex-1 text-xs font-medium leading-none text-muted-foreground">
                {user.email}
              </p>
              <HeaderDropdown onLogout={handleLogout} />
            </div>
            <WorkspaceList onSelect={onSelect} />
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className={styles.seperator} />
        <DropdownMenuGroup className="">
          <DropdownMenuItem className={styles.action}>
            Add another account
          </DropdownMenuItem>
          <DropdownMenuItem className={styles.action} onClick={handleLogout}>
            Log out
          </DropdownMenuItem>
          <DropdownMenuSeparator className={styles.seperator} />
          <DropdownMenuItem className={styles.action} onClick={handleGetMac}>
            Get Mac App
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
