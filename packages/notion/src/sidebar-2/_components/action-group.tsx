"use client";

import React from "react";
import {
  ArrowUpRight,
  Copy,
  Link,
  MoreHorizontal,
  Plus,
  SquarePen,
  Trash,
} from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@swy/ui/shadcn";
import { Hint, IconInfo } from "@swy/ui/shared";

import { Icon, RenamePopover, toDateString } from "../../common";
import type { UpdatePageParams } from "../../types";
import { MenuType } from "./types";

interface ActionGroupProps {
  type: MenuType;
  title: string;
  icon: IconInfo;
  pageLink: string;
  isFavorite: boolean;
  lastEditedBy: string;
  lastEditedAt: number;
  onCreate?: () => void;
  onDuplicate?: () => void;
  onUpdate: (data: UpdatePageParams) => void;
}

export const ActionGroup: React.FC<ActionGroupProps> = ({
  type,
  title,
  icon,
  pageLink,
  isFavorite,
  lastEditedBy,
  lastEditedAt,
  onCreate,
  // onDelete,
  onDuplicate,
  onUpdate,
}) => {
  const [, copy] = useCopyToClipboard();

  return (
    <div className="ml-auto flex items-center p-0.5">
      <DropdownMenu>
        <Hint
          asChild
          side="bottom"
          description="Delete, duplicate, and more..."
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="hint"
              className="ml-auto size-auto p-0.5 opacity-0 group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
        </Hint>
        <DropdownMenuContent
          className="w-60"
          align="start"
          side="right"
          forceMount
          onClick={(e) => e.stopPropagation()}
        >
          {isFavorite ? (
            <DropdownMenuItem onSelect={() => onUpdate({ isFavorite: false })}>
              <Icon.Unstar className="mr-2 size-4 flex-shrink-0 fill-icon dark:fill-icon-dark" />
              Remove from Favorites
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onSelect={() => onUpdate({ isFavorite: true })}>
              <Icon.Star className="mr-2 size-4 flex-shrink-0 fill-icon dark:fill-icon-dark" />
              Add to Favorites
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => void copy(pageLink)}>
            <Link className="mr-2 size-4" />
            Copy link
          </DropdownMenuItem>
          {type === MenuType.Normal && (
            <DropdownMenuItem onSelect={onDuplicate}>
              <Copy className="mr-2 size-4" />
              Duplicate
            </DropdownMenuItem>
          )}
          <RenamePopover title={title} icon={icon} onChange={onUpdate}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <SquarePen className="mr-2 size-4" />
              Rename
            </DropdownMenuItem>
          </RenamePopover>
          {type === MenuType.Normal && (
            <DropdownMenuItem
              variant="warning"
              onSelect={() => onUpdate({ isArchived: true })}
            >
              <Trash className="mr-2 size-4" />
              Move to Trash
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => window.open(pageLink)}>
            <ArrowUpRight className="mr-2 size-4" />
            Open in new tab
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="flex flex-col items-center px-2 py-1 text-xs text-muted dark:text-muted-dark">
            <div className="w-full">Last edited by: {lastEditedBy}</div>
            <div className="w-full">{toDateString(lastEditedAt)}</div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Hint asChild side="bottom" description="Add a page inside">
        <Button
          variant="hint"
          className="ml-auto size-auto rounded-sm p-0.5 opacity-0 group-hover:opacity-100"
          onClick={onCreate}
        >
          <Plus className="size-4" />
        </Button>
      </Hint>
    </div>
  );
};
