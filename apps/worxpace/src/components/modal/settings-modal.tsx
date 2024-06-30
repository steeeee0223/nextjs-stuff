"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { useModal } from "@acme/ui/custom";
import { SettingsPanel, useWorkspace } from "@acme/ui/notion";
import type { SettingsPanelProps, SettingsStore } from "@acme/ui/notion";
import { Dialog, DialogContent } from "@acme/ui/shadcn";

import { useEdgeStore, useSettings } from "~/hooks";
import { toIcon } from "~/lib";

export const SettingsModal = () => {
  /** Route */
  const router = useRouter();
  const { signOut, userId, orgId } = useAuth();
  const clerkId = orgId ?? userId;
  const { activeWorkspace, select } = useWorkspace();
  const { isOpen, setClose } = useModal<SettingsStore>();
  const { edgestore } = useEdgeStore();
  /** Actions */
  const {
    settings,
    updateAccount,
    updateWorkspace,
    deleteAccount,
    deleteWorkspace,
  } = useSettings(
    clerkId && activeWorkspace
      ? { clerkId, workspaceId: activeWorkspace.id }
      : null,
  );
  /** Settings handlers */
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
    onDeleteAccount: async (id) => {
      clerkId && (await deleteAccount({ id, clerkId }));
      setClose();
      select();
      await signOut(() => router.push("/sign-in"));
    },
    onDeleteWorkspace: async (id) => {
      await deleteWorkspace({ id });
      setClose();
      select();
      router.push("/select-role");
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent
        forceMount
        className="z-[99999] flex h-[calc(100vh-100px)] max-h-[720px] w-[calc(100vw-100px)] max-w-[1150px] rounded border-none p-0 shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <SettingsPanel key={settings.workspace.id} {...settingsProps} />
      </DialogContent>
    </Dialog>
  );
};
