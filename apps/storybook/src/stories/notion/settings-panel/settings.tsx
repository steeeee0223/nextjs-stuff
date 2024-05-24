"use client";

import { SettingsIcon } from "lucide-react";

import { useModal } from "@acme/ui/custom";
import { SettingsPanel } from "@acme/ui/notion";
import { Button, Dialog, DialogContent } from "@acme/ui/shadcn";

const Panel = () => {
  const { isOpen, setClose } = useModal();

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent
        forceMount
        className="z-[99999] flex h-[calc(100vh-100px)] max-h-[720px] w-[calc(100vw-100px)] max-w-[1150px] rounded border-none p-0 shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <SettingsPanel />
      </DialogContent>
    </Dialog>
  );
};

export const Settings = () => {
  const { setOpen } = useModal();
  const handleClick = () => setOpen(<Panel />);

  return (
    <Button variant="outline" size="icon" onClick={handleClick}>
      <SettingsIcon />
    </Button>
  );
};
