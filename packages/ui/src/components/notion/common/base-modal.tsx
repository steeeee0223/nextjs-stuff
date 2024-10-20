"use client";

import { useLayoutEffect, useRef, useTransition } from "react";

import { useModal } from "@/components/custom/modal-provider";
import { Spinner } from "@/components/custom/spinner";
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
  const [loading, startTransition] = useTransition();

  const reset = () =>
    startTransition(() => {
      onTrigger?.();
      setClose();
    });

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
        aria-describedby={undefined}
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
            {loading && <Spinner className="ml-2 text-white" />}
          </Button>
          <Button onClick={setClose} size="sm" className="w-full">
            {secondary}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
