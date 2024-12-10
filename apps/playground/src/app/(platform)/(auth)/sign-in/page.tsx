"use client";

import { useRouter } from "next/navigation";

import { usePlatformStore, useSettingsStore } from "@swy/notion";
import { IconBlock } from "@swy/ui/shared";

import { accounts, githubAccounts } from "~/db";
import { useAppActions, useAppState, useMockDB } from "~/hooks";
import { SignInButton } from "./_components/sign-in-button";

export default function Page() {
  const router = useRouter();
  const { signIn } = useAppState();
  const { goToOnboarding, selectWorkspace } = useAppActions();
  const { findAccount, findAccountMemberships } = useMockDB();
  /** Store */
  const setUser = usePlatformStore((state) => state.setUser);
  const setWorkspaces = usePlatformStore((state) => state.setWorkspaces);
  const updateSettings = useSettingsStore((state) => state.update);
  const login = async (userId: string) => {
    const u = await findAccount(userId);
    if (!u) return router.push("/sign-in");

    console.log(`set app state: ${userId}`);
    setUser({
      id: userId,
      name: u.name,
      email: u.email,
      avatarUrl: u.avatarUrl,
    });
    updateSettings({ account: u });
    signIn(userId);
    const workspaces = await findAccountMemberships(userId);
    if (workspaces.length === 0) return goToOnboarding();
    setWorkspaces(workspaces);
    selectWorkspace(userId, workspaces[0]!.id);
  };

  return (
    <div className="flex flex-col items-center gap-12 p-10">
      <div className="flex w-[320px] flex-col items-center gap-4">
        <IconBlock
          icon={{ type: "lucide", name: "user-round-check", color: "#448361" }}
          size="lg"
        />
        <h1 className="flex w-full flex-col text-center text-xl font-medium">
          Sign in with ...
        </h1>
        <div className="flex w-[240px] flex-col items-center gap-3">
          {Object.values(accounts).map(({ id, name, avatarUrl }) => (
            <SignInButton
              name={name}
              avatarUrl={avatarUrl}
              githubAccount={githubAccounts[id]!}
              onClick={() => login(id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
