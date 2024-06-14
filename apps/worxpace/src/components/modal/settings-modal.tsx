"use client";

import { useModal } from "@acme/ui/custom";
import { SettingsPanel } from "@acme/ui/notion";
import type { SettingsPanelProps, SettingsStore } from "@acme/ui/notion";
import { Dialog, DialogContent } from "@acme/ui/shadcn";

import { useClient, useEdgeStore, useSettings } from "~/hooks";
import { toIcon } from "~/lib";

export const SettingsModal = () => {
  const { userId, workspaceId } = useClient();
  const { isOpen, setClose } = useModal<SettingsStore>();
  const { settings, updateAccount, updateWorkspace } = useSettings({
    userId,
    workspaceId,
  });
  const { edgestore } = useEdgeStore();

  const settingsProps: SettingsPanelProps = {
    settings,
    onUpdate: async ({ account, workspace }) => {
      account && (await updateAccount(account));
      workspace &&
        (await updateWorkspace({
          ...workspace,
          icon: workspace.icon ? toIcon(workspace.icon) : undefined,
        }));
    },
    onUploadFile: async (file, options) => {
      const { url } = await edgestore.publicFiles.upload({ file, options });
      return { url };
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent
        forceMount
        className="z-[99999] flex h-[calc(100vh-100px)] max-h-[720px] w-[calc(100vw-100px)] max-w-[1150px] rounded border-none p-0 shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <SettingsPanel key={settings.user.id} {...settingsProps} />
      </DialogContent>
    </Dialog>
  );
};
