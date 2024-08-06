"use client";

import { useModal } from "@/components/custom/modal-provider";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckIcon } from "../_components";

export const PasswordSuccess = () => {
  const { isOpen, setClose } = useModal();

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent
        forceMount
        className="z-[99999] w-[280px] gap-0 rounded-sm p-4 text-sm"
        onClick={(e) => e.stopPropagation()}
        hideClose
        noTitle
      >
        <div className="my-4 flex justify-center">
          <CheckIcon className="size-[27px] flex-shrink-0 fill-primary/85" />
        </div>
        <h2 className="mb-1 px-2.5 text-center text-sm/tight font-medium text-primary">
          Your password has been saved
        </h2>
        <div className="mb-4 text-center text-xs/snug text-primary/65">
          You&apos;ll be able to log in, even if you lose access to your school
          email address.
        </div>
      </DialogContent>
    </Dialog>
  );
};
