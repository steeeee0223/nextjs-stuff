"use client";

import { usePlatformStore, Workspace } from "@swy/notion";

export const usePlatform = () => {
  const clerkId = usePlatformStore((state) => state.clerkId ?? "");
  const workspaceId = usePlatformStore((state) => state.activeWorkspace ?? "");
  const workspace = usePlatformStore<Workspace>((state) => {
    if (!(state.activeWorkspace && state.activeWorkspace in state.workspaces))
      return {
        id: "",
        name: "",
        icon: { type: "text", text: "" },
        role: "guest",
        plan: "free",
        members: 0,
      } as Workspace;
    return state.workspaces[state.activeWorkspace]!;
  });
  const account = usePlatformStore(
    (state) => state.user ?? { id: "", name: "", email: "", avatarUrl: "" },
  );
  const accountId = account.id;
  const switchWorkspace = usePlatformStore((state) => (id: string) => {
    state.resetPages();
    state.setActiveWorkspace(id);
  });
  const leave = usePlatformStore((state) => (id: string) => {
    state.setActiveWorkspace(null);
    state.deleteWorkspace(id);
    state.resetPages();
  });
  const reset = usePlatformStore((state) => () => {
    state.resetUser();
    state.resetPages();
    state.resetWorkspaces();
  });

  return {
    clerkId,
    account,
    accountId,
    workspace,
    workspaceId,
    switchWorkspace,
    leave,
    reset,
  };
};
