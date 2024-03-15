"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button, useTree } from "@acme/ui/components";
import { useAction } from "@acme/ui/hooks";
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
  const { path } = useClient();
  /** Tree */
  const { dispatch } = useTree();
  const onError = (e: string) => toast.error(e);
  /** Action - Restore */
  const { execute: restore } = useAction(restoreDocument, {
    onSuccess: ({ ids, item }) => {
      dispatch({ type: "update:group", payload: { ids, group: item.type } });
      toast.success(`Restored document "${item.title}"`);
      router.push(path);
    },
    onError,
  });
  const onRestore = () => restore({ id: documentId });
  /** Action - Remove */
  const { execute: remove } = useAction(deleteDocument, {
    onSuccess: (data) => {
      dispatch({ type: "delete", payload: data.ids });
      toast.success(`Deleted document "${data.item.title}"`);
      if (documentId === data.item.id) router.push(path);
    },
    onError,
  });
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
