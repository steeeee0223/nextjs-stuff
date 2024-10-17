"use client";

import { useModal } from "@/components/custom/modal-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ResetLinkProps {
  onReset?: () => void;
}

export const ResetLink = ({ onReset }: ResetLinkProps) => {
  const { isOpen, setClose } = useModal();

  const reset = () => {
    onReset?.();
    setClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent
        forceMount
        hideClose
        className="flex w-[300px] flex-col items-start justify-center gap-2 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle className="text-base font-normal tracking-wide">
            Are you sure you want to reset the invite link for all space
            members? Your old one will no longer be able to be used.
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="py-1.5">
          <Button onClick={reset} variant="red" size="sm" className="w-full">
            Reset
          </Button>
          <Button onClick={setClose} size="sm" className="w-full">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
