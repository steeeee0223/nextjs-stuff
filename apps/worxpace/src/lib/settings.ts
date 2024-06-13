"use server";

import { currentUser } from "@clerk/nextjs";

import { worxpace as db } from "@acme/prisma";
import type { AccountStore, UserStore, WorkspaceStore } from "@acme/ui/notion";
import type {
  UpdateAccountSettingsInput,
  UpdateWorkspaceSettingsInput,
} from "@acme/validators";

import { toIconInfo } from "./icon";

const getUser = async (userId: string): Promise<UserStore> => {
  const user = await currentUser();
  return {
    id: userId,
    name: `${user?.firstName} ${user?.lastName}`,
    email: user?.emailAddresses[0]?.emailAddress ?? "",
    imageUrl: user?.imageUrl ?? "",
  };
};

const getAccount = async (userId: string): Promise<AccountStore> => {
  const account = await db.accountSettings.findUnique({
    where: { userId },
  });
  if (!account) return await updateAccount(userId);
  return account;
};

const updateAccount = async (
  userId: string,
  account?: UpdateAccountSettingsInput,
): Promise<AccountStore> => {
  const user = await getUser(userId);
  const { avatarUrl, email, preferredName, hasPassword } =
    await db.accountSettings.upsert({
      where: { userId },
      create: {
        userId,
        avatarUrl: account?.avatarUrl ?? user.imageUrl,
        email: account?.email ?? user.email,
        preferredName: account?.preferredName ?? user.name,
        hasPassword: false,
      },
      update: { ...account },
    });
  return { avatarUrl, email, preferredName, hasPassword };
};

const getWorkspace = async (workspaceId: string): Promise<WorkspaceStore> => {
  const workspace = await db.workspaceSettings.findUnique({
    where: { workspaceId },
  });
  if (!workspace) return await updateWorkspace(workspaceId);
  return {
    id: workspaceId,
    name: workspace.name,
    icon: toIconInfo(workspace.icon),
    domain: workspace.domain,
  };
};

const updateWorkspace = async (
  workspaceId: string,
  workspace?: UpdateWorkspaceSettingsInput,
): Promise<WorkspaceStore> => {
  const { name, icon, domain } = await db.workspaceSettings.upsert({
    where: { workspaceId },
    create: {
      workspaceId,
      /** @todo Fill in organization name */
      name: "",
      /** @todo Fill in organization imageUrl */
      icon: null,
      domain: workspaceId,
    },
    update: { ...workspace },
  });
  return { id: workspaceId, name, icon: toIconInfo(icon), domain };
};

export { getUser, getAccount, updateAccount, getWorkspace, updateWorkspace };
