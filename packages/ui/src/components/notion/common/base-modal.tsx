"use client";

import { useLayoutEffect, useRef } from "react";

import { useModal } from "@/components/custom/modal-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BaseModalProps {
  title: string;
  primary: string;
  secondary: string;
  onTrigger?: () => void;
}

export const BaseModal = ({
  title,
  primary,
  secondary,
  onTrigger,
}: BaseModalProps) => {
  const { isOpen, setClose } = useModal();

  const reset = () => {
    onTrigger?.();
    setClose();
  };

  const buttonRef = useRef<HTMLButtonElement>(null);
  useLayoutEffect(() => {
    buttonRef.current?.focus();
  }, []);

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
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="py-1.5">
          <Button
            ref={buttonRef}
            onClick={reset}
            variant="red"
            size="sm"
            className="w-full"
          >
            {primary}
          </Button>
          <Button onClick={setClose} size="sm" className="w-full">
            {secondary}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
