import { SortDirection } from "@tanstack/react-table";
import { CircleArrowUp, MoreHorizontalIcon } from "lucide-react";

import { Select, type SelectProps } from "@/components/custom/select";
import * as Icon from "@/components/notion/icons";
import { Role, Scope } from "@/components/notion/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { roleOptions } from "./constants";
import type { GuestRow, MemberRow } from "./types";

interface HeaderProps {
  title: string;
  className?: string;
}

/**
 * Extended version
 * @see my-connections
 */
export const Header = ({ title, className }: HeaderProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden text-ellipsis whitespace-nowrap text-xs font-normal text-primary/65",
        className,
      )}
    >
      {title}
    </div>
  );
};

interface SortingToggleProps {
  title: string;
  isSorted: false | SortDirection;
  toggle: () => void;
}

export const SortingToggle = ({
  title,
  isSorted,
  toggle,
}: SortingToggleProps) => (
  <Button variant="hint" size="xs" onClick={toggle} className="px-1">
    <Header title={title} className="text-sm" />
    {isSorted &&
      (isSorted === "asc" ? (
        <Icon.ArrowUp className="ml-1 size-3 flex-shrink-0 fill-primary/65" />
      ) : (
        <Icon.ArrowDown className="ml-1 size-3 flex-shrink-0 fill-primary/65" />
      ))}
  </Button>
);

interface UserCellProps {
  user: MemberRow["account"];
}
export const UserCell = ({ user }: UserCellProps) => {
  return (
    <div className="z-20 flex h-full min-h-[42px] w-[220px] items-center justify-between pr-3">
      <div className="flex w-full items-center gap-2.5">
        <div className="relative">
          <img
            src={user.avatarUrl}
            alt={user.name[0]}
            className="size-7 rounded-full border border-primary/10"
          />
        </div>
        <div className="max-w-[164px]">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primary">
            {user.name}
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-primary/65">
            {user.email}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TeamspacesCellProps {
  teamspaces: MemberRow["teamspaces"];
}
export const TeamspacesCell = ({ teamspaces }: TeamspacesCellProps) => {
  const { options, current } = teamspaces;
  const $options = options.reduce<SelectProps["options"]>(
    (acc, { id, name, members }) => ({
      ...acc,
      [id]: {
        label: name,
        description: `${members} members`,
      },
    }),
    {},
  );
  return (
    <div className="flex items-center">
      {options.length < 1 ? (
        <div className="w-auto cursor-default p-2 text-sm text-primary/50">
          No access
        </div>
      ) : (
        <Select
          className="m-0 w-auto"
          options={$options}
          defaultValue={current ?? undefined}
          hideCheck
          align="center"
          customDisplay={Custom}
        />
      )}
    </div>
  );
};

interface RoleCellProps {
  role: Role;
  scopes: Set<Scope>;
  onSelect?: (role: Role) => void;
}
export const RoleCell = ({ role, scopes, onSelect }: RoleCellProps) => {
  return (
    <div className="flex items-center">
      {scopes.has(Scope.MemberUpdate) ? (
        <Select
          className="m-0 w-auto"
          options={roleOptions}
          onChange={(role) => onSelect?.(role as Role)}
          defaultValue={role ?? undefined}
          align="center"
          customDisplay={Custom}
        />
      ) : (
        <div className="w-auto cursor-default text-sm text-primary/65">
          {roleOptions[role]!.label}
        </div>
      )}
    </div>
  );
};

const Custom: SelectProps["customDisplay"] = ({ option }) => (
  <div className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-primary/65">
    {typeof option === "string" ? option : option?.label}
  </div>
);

interface MemberActionCellProps {
  isSelf: boolean;
  onDelete?: () => void;
}

export const MemberActionCell = ({
  isSelf,
  onDelete,
}: MemberActionCellProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex rounded hover:bg-primary/10 focus-visible:outline-none">
        <MoreHorizontalIcon className="size-5 text-primary/45" />
      </DropdownMenuTrigger>
      <DropdownMenuContent variant="notion" className="z-[99999]">
        <DropdownMenuItem variant="warning" onClick={onDelete}>
          <Icon.Bye className="mr-2 size-4 flex-shrink-0 fill-warning" />
          {isSelf ? "Leave workspace" : "Remove from workspace"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface AccessCellProps {
  access: GuestRow["access"];
}
export const AccessCell = ({ access }: AccessCellProps) => {
  const options = access.reduce<SelectProps["options"]>(
    (acc, { id, name, scope }) => ({
      ...acc,
      [id]: { label: name, description: scope },
    }),
    {},
  );
  return (
    <div className="flex items-center">
      {access.length < 1 ? (
        <div className="w-auto cursor-default p-2 text-sm text-primary/50">
          No access
        </div>
      ) : (
        <Select
          className="m-0 w-auto data-[placeholder]:text-primary/65"
          options={options}
          hideCheck
          align="center"
          placeholder={`${access.length} pages`}
          customDisplay={() => AccessCellDisplay({ pages: access.length })}
        />
      )}
    </div>
  );
};

const AccessCellDisplay = ({ pages }: { pages: number }) => (
  <div className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-primary/65">
    {`${pages} pages`}
  </div>
);

interface GuestActionCellProps {
  onUpdate?: () => void;
  onDelete?: () => void;
}

export const GuestActionCell = ({
  onUpdate,
  onDelete,
}: GuestActionCellProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex rounded hover:bg-primary/10 focus-visible:outline-none">
        <MoreHorizontalIcon className="size-5 text-primary/45" />
      </DropdownMenuTrigger>
      <DropdownMenuContent variant="notion" className="z-[99999]">
        <DropdownMenuItem variant="notion">
          <CircleArrowUp className="mr-2 size-4" onClick={onUpdate} />
          Upgrade to member
        </DropdownMenuItem>
        <DropdownMenuSeparator variant="notion" />
        <DropdownMenuItem variant="warning" onClick={onDelete}>
          <Icon.Bye className="mr-2 size-4 flex-shrink-0 fill-warning" />
          Remove from workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
