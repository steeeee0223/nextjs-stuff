"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { usePlatformStore, useSettingsStore } from "@swy/notion";
import { useOrigin } from "@swy/ui/hooks";

import { useAppState } from "./use-app-control";
import { useMockDB } from "./use-mock-db";

export const useAppActions = () => {
  const router = useRouter();
  const origin = useOrigin();
  const { signOut } = useAppState();
  const { findWorkspace } = useMockDB();
  /** Store */
  const setActiveWorkspace = usePlatformStore(
    (state) => state.setActiveWorkspace,
  );
  const resetStore = usePlatformStore((state) => () => {
    state.resetWorkspaces();
    state.resetUser();
  });
  const updateSettings = useSettingsStore((state) => state.update);
  const resetSettings = useSettingsStore((state) => state.reset);
  /** Actions */
  const goToOnboarding = useCallback(
    () => router.push("/onboarding"),
    [router],
  );
  const selectWorkspace = useCallback(
    (accountId: string, workspaceId: string) => {
      setActiveWorkspace(workspaceId);
      void findWorkspace(accountId, workspaceId).then((workspace) => {
        if (!workspace) return;
        const { id, name, icon, domain, plan, inviteToken, role } = workspace;
        updateSettings({
          workspace: {
            role,
            id,
            name,
            icon: icon ?? undefined,
            domain,
            plan,
            inviteLink: `${origin}/${inviteToken}`,
          },
        });
      });
      router.push(`/home/${workspaceId}`);
    },
    [findWorkspace, origin, router, setActiveWorkspace, updateSettings],
  );

  const logout = useCallback(() => {
    resetStore();
    resetSettings();
    signOut();
  }, [resetStore, resetSettings, signOut]);

  return {
    goToOnboarding,
    selectWorkspace,
    logout,
  };
};
