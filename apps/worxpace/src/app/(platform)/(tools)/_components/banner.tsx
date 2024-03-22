"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

import { Button, useTree } from "@acme/ui/components";
import { cn } from "@acme/ui/lib";

import { deleteDocument, restoreDocument } from "~/actions";
import { ConfirmModal } from "~/components/modal";
import { theme } from "~/constants/theme";
import { useClient } from "~/hooks";

interface BannerProps {
  documentId: string;
}
const $buttonProps =
  "rounded-sm border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal";

const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const { path, workspaceId } = useClient();
  /** Tree */
  const { dispatch } = useTree();
  const onError = (e: Error) => toast.error(e.message);
  /** Action - Restore */
  const { trigger: restore } = useSWRMutation(
    `doc:${workspaceId}`,
    restoreDocument,
    {
      onSuccess: ({ ids, item }) => {
        dispatch({ type: "update:group", payload: { ids, group: item.type } });
        toast.success(`Restored document "${item.title}"`);
        router.push(path);
      },
      onError,
    },
  );
  const onRestore = () => restore({ id: documentId });
  /** Action - Remove */
  const { trigger: remove } = useSWRMutation(
    `doc:${workspaceId}`,
    deleteDocument,
    {
      onSuccess: (data) => {
        dispatch({ type: "delete", payload: data.ids });
        toast.success(`Deleted document "${data.item.title}"`);
        if (documentId === data.item.id) router.push(path);
      },
      onError,
    },
  );
  const onRemove = () => remove({ id: documentId });

  return (
    <div
      className={cn(
        theme.flex.gap2,
        "w-full justify-center bg-rose-500 p-2 text-center text-sm text-white",
      )}
    >
      <p>This page is in the Trash.</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className={$buttonProps}
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button size="sm" variant="outline" className={$buttonProps}>
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
