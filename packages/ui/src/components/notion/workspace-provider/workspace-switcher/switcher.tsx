"use client";

import { ChevronsUpDown } from "lucide-react";
import stableHash from "stable-hash";

import { IconBlock } from "@/components/custom/icon-block";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspace } from "../workspace-context";
import HeaderDropdown from "./header-dropdown";
import WorkspaceList from "./workspace-list";

const styles = {
  seperator: "bg-primary/15",
  action:
    "focus:bg-primary/5 w-full cursor-pointer text-xs text-primary/55 rounded-sm",
};

export interface WorkspaceSwitcherProps {
  onCreateAccount?: () => void;
  onCreateWorkspace?: () => void;
  onLogout?: () => void;
  onSelect?: (id: string) => Promise<void>;
}

export const WorkspaceSwitcher = ({
  onCreateAccount,
  onCreateWorkspace,
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
          className="flex w-full items-center p-3 text-sm hover:rounded-sm hover:bg-primary/5"
        >
          <div className="flex max-w-[150px] items-center gap-x-2">
            <IconBlock
              editable={false}
              size="sm"
              defaultIcon={
                activeWorkspace?.icon ?? { type: "emoji", emoji: " " }
              }
              key={stableHash(activeWorkspace?.icon)}
            />
            <span className="line-clamp-1 text-start font-medium">
              {activeWorkspace?.name}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 text-primary/55" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-[99999] w-80 border-primary/15"
        align="start"
        alignOffset={11}
        forceMount
      >
        <DropdownMenuGroup>
          <div className="flex flex-col space-y-2 px-1 py-2">
            <div className="flex items-center">
              <p className="flex-1 text-xs font-medium leading-none text-primary/55">
                {user.email}
              </p>
              <HeaderDropdown
                onLogout={handleLogout}
                onCreateWorkspace={onCreateWorkspace}
              />
            </div>
            <WorkspaceList onSelect={onSelect} />
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className={styles.seperator} />
        <DropdownMenuGroup className="">
          <DropdownMenuItem className={styles.action} onClick={onCreateAccount}>
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
