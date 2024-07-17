"use client";

import { MoreHorizontal, Trash } from "lucide-react";

import { cn } from "@acme/ui/lib";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
} from "@acme/ui/shadcn";

import { theme } from "~/constants/theme";
import { useDocuments } from "~/hooks";

interface MenuProps {
  accountId: string;
  workspaceId: string;
  documentId: string;
}

const Menu = ({ accountId, workspaceId, documentId }: MenuProps) => {
  /** Docs */
  const { archive } = useDocuments({ workspaceId });
  const onArchive = () => archive({ id: documentId, accountId, workspaceId });
  // TODO last edited by
  const lastEditedBy = "user";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon-nav" variant="ghost">
          <MoreHorizontal className={theme.size.icon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-[99999] w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className={cn(theme.size.icon, "mr-2")} />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-2 text-xs text-muted-foreground">
          Last edited by: {lastEditedBy}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};

export default Menu;
