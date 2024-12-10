import React from "react";
import {
  ArrowUpRight,
  Copy,
  Link,
  MoreHorizontal,
  Plus,
  SquarePen,
  Star,
  Trash,
} from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@swy/ui/shadcn";
import { Hint } from "@swy/ui/shared";

import { toDateString } from "../../common";

interface ActionGroupProps {
  lastEditedBy: string;
  lastEditedAt: number;
  onCreate: () => void;
  onDelete: () => void;
}

export const ActionGroup: React.FC<ActionGroupProps> = ({
  lastEditedBy,
  lastEditedAt,
  onCreate,
  onDelete,
}) => {
  return (
    <div className="ml-auto flex items-center p-0.5">
      <DropdownMenu>
        <Hint
          asChild
          side="bottom"
          description="Delete, duplicate, and more..."
        >
          <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
            <Button
              variant="hint"
              className="ml-auto size-auto p-0.5 opacity-0 group-hover:opacity-100"
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
          <DropdownMenuItem>
            <Star className="mr-2 size-4" />
            Add to Favorites
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link className="mr-2 size-4" />
            Copy link
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy className="mr-2 size-4" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SquarePen className="mr-2 size-4" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            className="group/trash hover:text-red"
          >
            <Trash className="mr-2 size-4" />
            Move to Trash
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
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
