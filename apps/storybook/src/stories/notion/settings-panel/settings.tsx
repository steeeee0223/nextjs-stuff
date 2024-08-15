"use client";

import { SettingsIcon } from "lucide-react";

import { useModal } from "@acme/ui/custom";
import {
  SettingsPanel,
  SettingsPanelProps,
  SettingsStore,
} from "@acme/ui/notion";
import { Button, Dialog, DialogContent } from "@acme/ui/shadcn";

const Panel = () => {
  const { data, isOpen, setClose } = useModal<SettingsStore>();
  const props: SettingsPanelProps = {
    settings: data,
    onUpdate: async ({ account }) => {
      console.log(`mutating`, { account });
    },
    onFetchConnections: async () => [
      {
        id: "connection-id",
        connection: { type: "github", account: "shadcn-ui" },
        scopes: ["Can preview links", "Can content"],
      },
    ],
  };

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent
        forceMount
        noTitle
        className="z-[99999] flex h-[calc(100vh-100px)] max-h-[720px] w-[calc(100vw-100px)] max-w-[1150px] rounded border-none p-0 shadow"
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
    setOpen<SettingsStore>(<Panel />, async () => initialData);

  return (
    <Button variant="outline" size="icon" onClick={handleClick}>
      <SettingsIcon />
    </Button>
  );
};
