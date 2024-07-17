/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { useRef, type MouseEvent } from "react";
import { MoreHorizontal, Plus, Trash } from "lucide-react";
import stableHash from "stable-hash";
import { useHover } from "usehooks-ts";

import { IconBlock, type IconInfo } from "@/components/custom/icon-block";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { SPECIAL_KEYS } from "@/constants/keyboard";
import { cn } from "@/lib/utils";

export interface CRUDItemProps {
  label: string;
  icon?: IconInfo;
  lastEditedBy?: string;
  lastEditedAt?: string;
  id?: string;
  active?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  level?: number;
  shortcut?: string;
  onClick?: () => void;
  onExpand?: () => void;
  onCreate?: () => void;
  onDelete?: (itemId: string) => void;
}

export const CRUDItem = ({
  id,
  label,
  icon = { type: "lucide", name: "file" },
  active,
  lastEditedBy = "admin",
  lastEditedAt = "now",
  level = 0,
  expandable = false,
  expanded,
  shortcut,
  onClick,
  onExpand,
  onCreate,
  onDelete,
}: CRUDItemProps) => {
  /** Icon Hover */
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(hoverRef);
  /** Events */
  const handleExpand = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isHover) onExpand?.();
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
        "group min-h-[27px] w-full py-1 pr-3 text-sm font-medium text-primary/50 hover:bg-primary/10",
        active && "bg-primary/5 text-primary",
      )}
    >
      <div ref={hoverRef}>
        {expandable && (
          <>
            <IconBlock
              className={cn("hidden shrink-0", expanded && isHover && "block")}
              defaultIcon={{ type: "lucide", name: "chevron-down" }}
              editable={false}
              onClick={handleExpand}
            />
            <IconBlock
              className={cn("hidden shrink-0", !expanded && isHover && "block")}
              defaultIcon={{ type: "lucide", name: "chevron-right" }}
              editable={false}
              onClick={handleExpand}
            />
          </>
        )}
        <IconBlock
          className={cn("shrink-0", expandable && isHover && "hidden")}
          key={stableHash(icon)}
          defaultIcon={icon}
          editable={false}
        />
      </div>
      <span className="ml-1 truncate">{label}</span>
      {shortcut && (
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-primary/50 opacity-100">
          {Array.from(shortcut).map((key, i) => (
            <span className={SPECIAL_KEYS.has(key) ? "text-xs" : ""} key={i}>
              {key}
            </span>
          ))}
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center p-0.5">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role="button"
                className="ml-auto h-full rounded-sm p-0.5 opacity-0 hover:bg-primary/10 group-hover:opacity-100"
              >
                <MoreHorizontal className="size-4 text-primary/50" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="z-[99999] w-60 border-primary/10"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem
                className="focus:bg-primary/10"
                onClick={handleDelete}
              >
                <Trash className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-primary/10" />
              <div className="flex flex-col items-center px-2 py-1">
                <div className="w-full text-xs text-primary/50">
                  Last edited by: {lastEditedBy}
                </div>
                <div className="w-full text-xs text-primary/50">
                  {lastEditedAt}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {expandable && (
            <div
              role="button"
              onClick={handleCreate}
              className="ml-auto h-full rounded-sm p-0.5 opacity-0 hover:bg-primary/10 group-hover:opacity-100"
            >
              <Plus className="size-4 text-primary/50" />
            </div>
          )}
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
