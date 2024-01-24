/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import type { MouseEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ChevronDown,
  ChevronRight,
  FileIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
} from "@/components/ui";
import { SPECIAL_KEYS } from "@/constants/keyboard";
import { cn } from "@/lib";

/** Styles */
const bgHover = "hover:bg-neutral-300 dark:hover:bg-neutral-600";
const iconSize = "h-4 w-4";

export interface CRUDItemProps {
  username?: string;
  label: string;
  icon?: LucideIcon | string | null;
  id?: string;
  active?: boolean;
  expanded?: boolean;
  level?: number;
  shortcut?: string;
  onClick?: () => void;
  onExpand?: () => void;
  onCreate?: () => void;
  onDelete?: (itemId: string) => void;
}

const ItemIcon = ({ icon: Icon }: Pick<CRUDItemProps, "icon">) => {
  if (!Icon)
    return (
      <FileIcon className="mr-2 h-[18px] w-[18px] shrink-0 text-muted-foreground" />
    );
  if (typeof Icon === "string")
    return <div className="mr-2 shrink-0 text-[18px]">{Icon}</div>;
  return (
    <Icon className="mr-2 h-[18px] w-[18px] shrink-0 text-muted-foreground" />
  );
};

export const CRUDItem = ({
  id,
  username = "admin",
  label,
  icon,
  active,
  level = 0,
  expanded,
  shortcut,
  onClick,
  onExpand,
  onCreate,
  onDelete,
}: CRUDItemProps) => {
  const ExpandIcon = expanded ? ChevronDown : ChevronRight;
  const handleExpand = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onExpand?.();
  };
  const handleCreate = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onCreate?.();
    if (!expanded) onExpand?.();
  };
  const handleDelete = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (id) onDelete?.(id);
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: `${((level ?? 0) + 1) * 12}px` }}
      className={cn(
        "flex items-center",
        "group min-h-[27px] w-full py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5",
        active && "bg-primary/5 text-primary",
      )}
    >
      {!!id && (
        <div
          role="button"
          className={cn(bgHover, "mr-1 h-full rounded-sm p-0.5")}
          onClick={handleExpand}
        >
          <ExpandIcon
            className={cn(iconSize, "shrink-0 text-muted-foreground/50")}
          />
        </div>
      )}
      <ItemIcon icon={icon} />
      <span className="truncate">{label}</span>
      {shortcut && (
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          {Array.from(shortcut).map((key, i) => (
            <span className={SPECIAL_KEYS.has(key) ? "text-xs" : ""} key={i}>
              {key}
            </span>
          ))}
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-1 p-0.5">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role="button"
                className={cn(
                  bgHover,
                  "ml-auto h-full rounded-sm p-0.5 opacity-0 group-hover:opacity-100",
                )}
              >
                <MoreHorizontal
                  className={cn(iconSize, "text-muted-foreground")}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="z-[99999] w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={handleDelete}>
                <Trash className={cn(iconSize, "mr-2")} />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="p-2 text-xs text-muted-foreground">
                Last edited by: {username}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            onClick={handleCreate}
            className={cn(
              bgHover,
              "ml-auto h-full rounded-sm p-0.5 opacity-0 group-hover:opacity-100",
            )}
          >
            <Plus className={cn("h-4 w-4", "text-muted-foreground")} />
          </div>
        </div>
      )}
    </div>
  );
};

CRUDItem.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 px-2 py-1.5"
    >
      <Skeleton className={cn("h-4 w-4", "w-[18px] bg-primary/5")} />
      <Skeleton className="h-4 w-full bg-primary/5" />
    </div>
  );
};
