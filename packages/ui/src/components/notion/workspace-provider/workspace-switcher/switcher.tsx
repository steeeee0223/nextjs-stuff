"use client";

import { ChevronsUpDown } from "lucide-react";
import stableHash from "stable-hash";

import { IconBlock } from "@/components/custom/icon-block";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useWorkspace } from "../workspace-context";
import HeaderDropdown from "./header-dropdown";
import WorkspaceList from "./workspace-list";

const styles = {
  action: "w-full cursor-pointer text-xs text-primary/55",
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
          className={cn(
            buttonVariants({
              variant: "hint",
              className: "w-full justify-normal rounded-sm p-3",
            }),
          )}
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
            <span className="overflow-hidden text-ellipsis text-start font-medium text-primary">
              {activeWorkspace?.name}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 text-primary/55" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        variant="notion"
        className="z-[99999] w-80"
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
        <DropdownMenuSeparator variant="notion" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="notion"
            className={styles.action}
            onClick={onCreateAccount}
          >
            Add another account
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="notion"
            className={styles.action}
            onClick={handleLogout}
          >
            Log out
          </DropdownMenuItem>
          <DropdownMenuSeparator variant="notion" />
          <DropdownMenuItem
            variant="notion"
            className={styles.action}
            onClick={handleGetMac}
          >
            Get Mac App
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
