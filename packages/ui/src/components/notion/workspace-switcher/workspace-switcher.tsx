"use client";

import { useEffect } from "react";
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
import HeaderDropdown from "./header-dropdown";
import type { UserState, WorkspaceState } from "./index.types";
import { useUser } from "./use-user";
import { useWorkspace } from "./use-workspace";
import WorkspaceList from "./workspace-list";

const styles = {
  seperator: "bg-primary/15",
  action: "w-full cursor-pointer text-xs text-muted-foreground rounded-sm",
};

export interface WorkspaceSwitcherProps {
  initialUser: UserState;
  initialWorkspace: WorkspaceState;
  onCreateAccount?: () => void;
  onLogout?: () => void;
}

export const WorkspaceSwitcher = ({
  initialUser,
  initialWorkspace,
  onLogout,
}: WorkspaceSwitcherProps) => {
  const workspace = useWorkspace();
  const user = useUser();

  useEffect(() => {
    user.select(initialUser);
  }, [initialUser]);
  useEffect(() => {
    workspace.select(initialWorkspace);
  }, [initialWorkspace]);

  const handleLogout = () => {
    user.logout();
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
            <p className="text-lg">{workspace.info?.icon}</p>
            <span className="line-clamp-1 text-start font-medium">
              {workspace.info?.name}
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
                {user.info?.email}
              </p>
              <HeaderDropdown onLogout={handleLogout} />
            </div>
            <WorkspaceList />
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
