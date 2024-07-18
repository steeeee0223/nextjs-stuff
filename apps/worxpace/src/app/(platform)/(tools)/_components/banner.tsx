"use client";

import { cn } from "@acme/ui/lib";
import { Button } from "@acme/ui/shadcn";

import { ConfirmModal } from "~/components/modal";
import { theme } from "~/constants/theme";
import { useDocuments } from "~/hooks";

interface BannerProps {
  accountId: string;
  workspaceId: string;
  documentId: string;
}
const $buttonProps =
  "rounded-sm border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal";

const Banner = ({ accountId, workspaceId, documentId }: BannerProps) => {
  const { restore, remove } = useDocuments({ workspaceId });
  const onRestore = () => restore({ id: documentId, accountId, workspaceId });
  const onRemove = () => remove({ id: documentId, accountId, workspaceId });

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
