import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { Dialog, DialogContent } from "@swy/ui/shadcn";
import { useKanban } from "@swy/ui/shared";

export const CardModal = () => {
  const { activeItem, setActiveItem } = useKanban();
  const ref = useRef<HTMLDivElement>(null);
  const onClose = () => setActiveItem(null);
  useOnClickOutside(ref, onClose);

  if (!activeItem) return null;
  return (
    <Dialog open={!!activeItem} onOpenChange={onClose}>
      <DialogContent ref={ref} noTitle>
        <h3 className="text-lg font-medium">Item - {activeItem.title}</h3>
      </DialogContent>
    </Dialog>
  );
};
