"use client";

import { useTransition } from "react";

import { useModal } from "@/components/custom/modal-provider";
import { Spinner } from "@/components/custom/spinner";
import { UserX } from "@/components/notion/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteGuestProps {
  name: string;
  onDelete?: () => void;
}

export const DeleteGuest = ({ name, onDelete }: DeleteGuestProps) => {
  const { isOpen, setClose } = useModal();
  const [loading, startTransition] = useTransition();

  const onRemove = () =>
    startTransition(() => {
      onDelete?.();
      setClose();
    });

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent
        forceMount
        className="flex w-[300px] flex-col items-start justify-center gap-5 p-5"
        onClick={(e) => e.stopPropagation()}
        aria-describedby={undefined}
      >
        <DialogHeader>
          <div className="flex items-center justify-center">
            <UserX className="size-9 flex-shrink-0 fill-primary/45 p-1" />
          </div>
          <DialogTitle className="text-lg/[22px]">
            Remove {name} from the workspace?
          </DialogTitle>
        </DialogHeader>
        <div className="relative flex w-full flex-col items-center gap-2 self-stretch">
          <div className="text-md text-wrap text-center text-primary/50">
            They will lose access to all shared pages. To add them as a guest in
            the future, a request must be submitted, or an admin must invite
            them.
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={onRemove}
            variant="warning:fill"
            size="sm"
            className="w-full font-semibold"
          >
            Remove
            {loading && <Spinner className="ml-2 text-white" />}
          </Button>
          <Button
            onClick={setClose}
            variant="hint"
            size="sm"
            className="h-7 w-fit"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
