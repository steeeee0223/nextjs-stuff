"use client";

import { useRouter } from "next/navigation";
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
  useTreeAction,
} from "@acme/ui/components";
import { useAction } from "@acme/ui/hooks";
import { cn } from "@acme/ui/lib";

import { archiveDocument } from "~/actions";
import { theme } from "~/constants/theme";
import { useClient } from "~/hooks";

interface MenuProps {
  documentId: string;
}

const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();
  const { username, path } = useClient();
  const { dispatch } = useTreeAction();

  /** Action - Archive */
  const { execute: archive } = useAction(archiveDocument, {
    onSuccess: (data) => {
      dispatch({ type: "archive", payload: data });
      toast.success(`Document "${data.item.title}" Moved to Trash`);
      router.push(path);
    },
    onError: (e) => toast.error(e),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className={theme.size.icon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-[99999] w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={() => archive({ id: documentId })}>
          <Trash className={cn(theme.size.icon, "mr-2")} />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-2 text-xs text-muted-foreground">
          Last edited by: {username}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};

export default Menu;