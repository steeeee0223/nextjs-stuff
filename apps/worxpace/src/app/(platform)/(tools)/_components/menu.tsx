"use client";

import { useRouter } from "next/navigation";
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
  useTree,
} from "@acme/ui/components";
import { cn } from "@acme/ui/lib";

import { archiveDocument } from "~/actions";
import { theme } from "~/constants/theme";
import { useClient } from "~/hooks";

interface MenuProps {
  documentId: string;
}

const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();
  const { username, path, workspaceId } = useClient();
  const { dispatch } = useTree();

  /** Action - Archive */
  const onError = (e: Error) => toast.error(e.message);
  const { trigger: archive } = useSWRMutation(
    `doc:${workspaceId}`,
    archiveDocument,
    {
      onSuccess: ({ ids, item }) => {
        dispatch({
          type: "update:group",
          payload: { ids, group: `trash:${item.type}` },
        });
        toast.success(`Document "${item.title}" Moved to Trash`);
        router.push(path);
      },
      onError,
    },
  );

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
