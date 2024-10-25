"use client";

import { Dialog, DialogContent } from "@swy/ui/shadcn";
import { useModal } from "@swy/ui/shared";

import { SettingsPanel, type SettingsPanelProps } from "../../settings-panel";

export const SettingsModal = (props: SettingsPanelProps) => {
  const { isOpen, setClose } = useModal();
  const settingsProps: SettingsPanelProps = {
    ...props,
    onDeleteAccount: (data) => {
      setClose();
      props.onDeleteAccount?.(data);
    },
    onDeleteWorkspace: (data) => {
      setClose();
      props.onDeleteWorkspace?.(data);
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        forceMount
        noTitle
        className="flex h-[calc(100vh-100px)] max-h-[720px] w-[calc(100vw-100px)] max-w-[1150px] rounded border-none p-0 shadow"
      >
        <SettingsPanel {...settingsProps} />
      </DialogContent>
    </Dialog>
  );
};
