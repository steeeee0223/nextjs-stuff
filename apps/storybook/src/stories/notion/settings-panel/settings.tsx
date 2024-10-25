"use client";

import { SettingsIcon } from "lucide-react";

import { SettingsPanel, SettingsPanelProps, SettingsStore } from "@swy/notion";
import { mockConnections } from "@swy/notion/mock";
import { Button, Dialog, DialogContent } from "@swy/ui/shadcn";
import { useModal } from "@swy/ui/shared";

const Panel = () => {
  const { data, isOpen, setClose } = useModal<SettingsStore>();
  const props: SettingsPanelProps = {
    settings: data,
    onUpdate: ({ account }) => console.log(`mutating`, { account }),
    onFetchConnections: () => Promise.resolve(mockConnections),
  };

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent
        forceMount
        noTitle
        className="flex h-[calc(100vh-100px)] max-h-[720px] w-[calc(100vw-100px)] max-w-[1150px] rounded border-none p-0 shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <SettingsPanel {...props} />
      </DialogContent>
    </Dialog>
  );
};

export const Settings = ({ initialData }: { initialData: SettingsStore }) => {
  const { setOpen } = useModal();
  const handleClick = () =>
    setOpen(<Panel />, () => Promise.resolve(initialData));

  return (
    <Button size="icon" onClick={handleClick}>
      <SettingsIcon />
    </Button>
  );
};
