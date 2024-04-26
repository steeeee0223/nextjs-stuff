"use client";

import { useModal } from "@acme/ui/custom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  Label,
  ThemeToggle,
} from "@acme/ui/shadcn";

export const SettingsModal = () => {
  const { isOpen, setClose } = useModal();

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent className="z-[99999]">
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how WorXpace looks on your device
            </span>
          </div>
          <ThemeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};
