"use client";

import { SettingsIcon } from "lucide-react";

import { useModal } from "@acme/ui/custom";
import {
  SettingsPanel,
  SettingsPanelProps,
  SettingsStore,
} from "@acme/ui/notion";
import { Button, Dialog, DialogContent } from "@acme/ui/shadcn";

import { mockConnections } from "../__mock__";

const Panel = () => {
  const { data, isOpen, setClose } = useModal<SettingsStore>();
  const props: SettingsPanelProps = {
    settings: data,
    onUpdate: async ({ account }) => console.log(`mutating`, { account }),
    onFetchConnections: async () => mockConnections,
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
  const handleClick = () => setOpen(<Panel />, async () => initialData);

  return (
    <Button size="icon" onClick={handleClick}>
      <SettingsIcon />
    </Button>
  );
};
