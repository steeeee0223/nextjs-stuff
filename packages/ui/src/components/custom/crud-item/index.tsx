/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import React, { forwardRef } from "react";
import { MoreHorizontal, Plus, Trash } from "lucide-react";
import stableHash from "stable-hash";

import { IconBlock, type IconInfo } from "@/components/custom/icon-block";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/variants";
import { SPECIAL_KEYS } from "@/constants/keyboard";
import { cn } from "@/lib/utils";
import { Hint } from "../hint";

export interface CRUDItemProps {
  className?: string;
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

export const CRUDItem = forwardRef<HTMLDivElement, CRUDItemProps>(function Item(
  {
    className,
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
  },
  ref,
) {
  /** Events */
  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onExpand?.();
  };
  const handleCreate = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onCreate?.();
    if (!expanded) onExpand?.();
  };
  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (id) onDelete?.(id);
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      role="button"
      style={{ paddingLeft: `${(level + 1) * 12}px` }}
      className={cn(
        buttonVariants({ variant: "hint" }),
        "group h-[27px] w-full justify-normal py-1 pr-3 text-secondary dark:text-secondary-dark",
        active && "bg-primary/10 text-primary dark:text-primary/80",
        className,
      )}
    >
      <div className="group/icon">
        {expandable && (
          <>
            <IconBlock
              className={cn(
                "hidden shrink-0 text-muted dark:text-muted-dark",
                expanded && "group-hover/icon:flex",
              )}
              defaultIcon={{ type: "lucide", name: "chevron-down" }}
              editable={false}
              onClick={handleExpand}
            />
            <IconBlock
              className={cn(
                "hidden shrink-0 text-muted dark:text-muted-dark",
                !expanded && "group-hover/icon:flex",
              )}
              defaultIcon={{ type: "lucide", name: "chevron-right" }}
              editable={false}
              onClick={handleExpand}
            />
          </>
        )}
        <IconBlock
          className={cn(
            "shrink-0 text-muted dark:text-muted-dark",
            expandable && "group-hover/icon:hidden",
          )}
          key={stableHash(icon)}
          defaultIcon={icon}
          editable={false}
        />
      </div>
      <span className="ml-1 truncate">{label}</span>
      {shortcut && (
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-0.5 rounded bg-primary/10 px-1.5 font-mono text-[10px] font-medium text-muted opacity-100 dark:text-muted-dark">
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
            <Hint
              asChild
              side="bottom"
              description="Delete, duplicate, and more..."
            >
              <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
                <div
                  role="button"
                  className={cn(
                    buttonVariants({
                      variant: "hint",
                      className:
                        "ml-auto size-auto p-0.5 opacity-0 group-hover:opacity-100",
                    }),
                  )}
                >
                  <MoreHorizontal className="size-4" />
                </div>
              </DropdownMenuTrigger>
            </Hint>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={handleDelete}>
                <Trash className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="flex flex-col items-center px-2 py-1 text-xs text-muted dark:text-muted-dark">
                <div className="w-full">Last edited by: {lastEditedBy}</div>
                <div className="w-full">{lastEditedAt}</div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {expandable && (
            <Hint asChild side="bottom" description="Add a page inside">
              <div
                role="button"
                onClick={handleCreate}
                className={cn(
                  buttonVariants({
                    variant: "hint",
                    className:
                      "ml-auto size-auto rounded-sm p-0.5 opacity-0 group-hover:opacity-100",
                  }),
                )}
              >
                <Plus className="size-4" />
              </div>
            </Hint>
          )}
        </div>
      )}
    </div>
  );
});

export function CRUDItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
      className="flex gap-x-2 px-2 py-1.5"
    >
      <Skeleton className="h-4 w-[18px]" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}
