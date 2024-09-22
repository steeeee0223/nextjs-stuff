"use client";

import { MoreHorizontal, Trash } from "lucide-react";

import { Hint } from "@/components/custom/hint";
import type { PageContextInterface } from "@/components/notion/page-provider";
import type { Page } from "@/components/notion/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
  page: Page;
  onChangeState?: PageContextInterface["onChangeState"];
}

export const Menu = ({ page, onChangeState }: MenuProps) => {
  return (
    <DropdownMenu>
      <Hint description="Style, export, and more..." asChild>
        <DropdownMenuTrigger asChild>
          <Button variant="nav" size="icon-md">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
      </Hint>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={() => onChangeState?.(page.id, "archive")}>
          <Trash className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="flex flex-col items-center px-2 py-1 text-xs text-muted dark:text-muted-dark">
          <div className="w-full">Last edited by: {page.lastEditedBy}</div>
          <div className="w-full">{page.lastEditedAt}</div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="size-10" />;
};
