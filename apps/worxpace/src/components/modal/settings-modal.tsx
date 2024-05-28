"use client";

import { useModal } from "@acme/ui/custom";
import { SettingsPanel } from "@acme/ui/notion";
import type { SettingsPanelProps, SettingsStore } from "@acme/ui/notion";
import { Dialog, DialogContent } from "@acme/ui/shadcn";

import { useClient, useSettings } from "~/hooks";

export const SettingsModal = () => {
  const { userId } = useClient();
  const { isOpen, setClose } = useModal<SettingsStore>();
  const { settings, update } = useSettings(userId);
  console.log(settings);

  const onUpdate: SettingsPanelProps["onUpdate"] = async ({ account }) => {
    account && (await update({ userId, account }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent
        forceMount
        className="z-[99999] flex h-[calc(100vh-100px)] max-h-[720px] w-[calc(100vw-100px)] max-w-[1150px] rounded border-none p-0 shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <SettingsPanel
          key={settings.user.id}
          settings={settings}
          onUpdate={onUpdate}
        />
      </DialogContent>
    </Dialog>
  );
};
