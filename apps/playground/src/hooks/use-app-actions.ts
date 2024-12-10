"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { usePlatformStore } from "@swy/notion";

import { useAppState } from "./use-app-control";

export const useAppActions = () => {
  const router = useRouter();
  const { signOut } = useAppState();
  /** Store */
  const setActiveWorkspace = usePlatformStore(
    (state) => state.setActiveWorkspace,
  );
  const resetStore = usePlatformStore((state) => () => {
    state.resetWorkspaces();
    state.resetUser();
  });
  /** Actions */
  const goToOnboarding = useCallback(
    () => router.push("/onboarding"),
    [router],
  );
  const selectWorkspace = useCallback(
    (workspaceId: string) => {
      setActiveWorkspace(workspaceId);
      router.push(`/home/${workspaceId}`);
    },
    [router, setActiveWorkspace],
  );

  const logout = useCallback(() => {
    resetStore();
    signOut();
  }, [resetStore, signOut]);

  return {
    goToOnboarding,
    selectWorkspace,
    logout,
  };
};
