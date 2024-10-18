"use client";

import { useModal } from "@/components/custom/modal-provider";
import { BaseModal } from "@/components/notion/common";
import type { PageContextInterface } from "@/components/notion/page-provider";
import { Button } from "@/components/ui/button";

interface BannerProps {
  pageId: string;
  onChangeState?: PageContextInterface["onChangeState"];
}

export const Banner = ({ pageId, onChangeState }: BannerProps) => {
  const { setOpen } = useModal();
  const onDelete = () =>
    setOpen(
      <BaseModal
        title="Are you sure you want to delete this page from Trash?"
        primary="Yes. Delete this page"
        secondary="Cancel"
        onTrigger={() => onChangeState?.(pageId, "delete")}
      />,
    );

  return (
    <div className="flex w-full items-center justify-center gap-x-2 bg-rose-500 p-2 text-center text-sm text-white">
      <p>This page is in the Trash.</p>
      <Button
        variant="white"
        size="sm"
        onClick={() => onChangeState?.(pageId, "restore")}
        className="h-auto px-2 py-1"
      >
        Restore page
      </Button>
      <Button
        size="sm"
        variant="white"
        className="h-auto px-2 py-1"
        onClick={onDelete}
      >
        Delete forever
      </Button>
    </div>
  );
};
