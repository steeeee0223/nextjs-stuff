"use client";

import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { Dialog, DialogContent, useKanban } from "@acme/ui/components";

export const CardModal = () => {
  const { activeItem, setActiveItem } = useKanban();
  const ref = useRef<HTMLDivElement>(null);
  const onClose = () => setActiveItem(null);
  useOnClickOutside(ref, onClose);

  if (!activeItem) return null;
  return (
    <Dialog open={activeItem !== null} onOpenChange={onClose}>
      <DialogContent ref={ref}>
        <h3 className="text-lg font-medium">Item - {activeItem.title}</h3>
      </DialogContent>
    </Dialog>
  );
};
