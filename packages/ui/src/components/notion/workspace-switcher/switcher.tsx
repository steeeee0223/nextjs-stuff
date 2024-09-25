"use client";

import { ChevronsUpDown } from "lucide-react";
import stableHash from "stable-hash";

import { IconBlock } from "@/components/custom/icon-block";
import { useWorkspace } from "@/components/notion/workspace-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/variants";
import { cn } from "@/lib/utils";
import { HeaderDropdown, WorkspaceList } from "./_components/";

const styles = {
  action: "w-full text-xs text-secondary dark:text-secondary-dark",
};

export interface WorkspaceSwitcherProps {
  onCreateAccount?: () => void;
  onCreateWorkspace?: () => void;
  onLogout?: () => void;
  onSelect?: (id: string) => void;
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
            <span className="overflow-hidden text-ellipsis text-start font-medium text-primary dark:text-primary/80">
              {activeWorkspace?.name}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 size-4 text-primary/45" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <DropdownMenuGroup className="flex flex-col space-y-2 p-1">
          <div className="flex items-center">
            <p className="flex-1 text-xs font-medium leading-none text-secondary dark:text-secondary-dark">
              {user.email}
            </p>
            <HeaderDropdown
              onLogout={handleLogout}
              onCreateWorkspace={onCreateWorkspace}
            />
          </div>
          <WorkspaceList onSelect={onSelect} />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className={styles.action} onClick={onCreateAccount}>
            Add another account
          </DropdownMenuItem>
          <DropdownMenuItem className={styles.action} onClick={handleLogout}>
            Log out
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={styles.action} onClick={handleGetMac}>
            Get Mac App
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
