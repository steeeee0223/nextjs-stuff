"use client";

import { useModal } from "@/components/custom/modal-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface EmailSettingsProps {
  email: string;
}

export const EmailSettings = ({ email }: EmailSettingsProps) => {
  const { isOpen, setClose } = useModal();

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent
        forceMount
        className="z-[99999] w-[460px] rounded-sm p-8 text-sm"
        onClick={(e) => e.stopPropagation()}
        hideClose
      >
        <p className="my-0">
          Your current email is <span className="font-bold">{email}</span>.
          We&apos;ll send a temporary verification code to this email.
        </p>
        <Button
          tabIndex={0}
          variant="blue"
          size="sm"
          className="max-w-fit flex-shrink-0"
        >
          Send verification code
        </Button>
      </DialogContent>
    </Dialog>
  );
};
