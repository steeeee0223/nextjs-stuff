"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { useModal } from "@acme/ui/custom";
import { SettingsPanel, useSettingsStore, useWorkspace } from "@acme/ui/notion";
import type { SettingsPanelProps, SettingsStore } from "@acme/ui/notion";
import { Dialog, DialogContent } from "@acme/ui/shadcn";

import { useEdgeStore, usePlatform, useSettings, useSetup } from "~/hooks";
import { toIcon } from "~/lib";

export const SettingsModal = () => {
  /** Route */
  const router = useRouter();
  const { signOut } = useAuth();
  const platform = usePlatform();
  const store = useSettingsStore();
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
    activeWorkspace
      ? { clerkId: platform.clerkId, workspaceId: activeWorkspace.id }
      : null,
  );
  const { fetchData } = useSetup({ clerkId: platform.clerkId });
  /** Settings handlers */
  const settingsProps: SettingsPanelProps = {
    settings,
    onUpdate: async ({ account, workspace }) => {
      account && (await updateAccount(account));
      if (workspace) {
        await updateWorkspace({
          ...workspace,
          icon: workspace.icon ? toIcon(workspace.icon) : undefined,
        });
        await fetchData();
      }
    },
    onUploadFile: async (file, options) => {
      const { url } = await edgestore.publicFiles.upload({ file, options });
      return { url };
    },
    onDeleteAccount: async ({ accountId }) => {
      await deleteAccount({ id: accountId, clerkId: platform.clerkId });
      setClose();
      select();
      await signOut(() => {
        platform.reset();
        store.reset();
        router.push("/sign-in");
      });
    },
    onDeleteWorkspace: async (id) => {
      await deleteWorkspace({ id });
      setClose();
      select();
      platform.update((prev) => ({ ...prev, workspaceId: "" }));
      store.reset();
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
