"use server";

import { currentUser } from "@clerk/nextjs";

import { worxpace as db } from "@acme/prisma";
import type { SettingsStore, UserStore } from "@acme/ui/notion";
import type { UpdateSettingsInput } from "@acme/validators";

const getUserStore = async (userId: string): Promise<UserStore> => {
  const user = await currentUser();
  return {
    id: userId,
    name: `${user?.firstName} ${user?.lastName}`,
    email: user?.emailAddresses[0]?.emailAddress ?? "",
    imageUrl: user?.imageUrl ?? "",
  };
};

const get = async (userId: string): Promise<SettingsStore> => {
  const user = await getUserStore(userId);
  const account = await db.accountSettings.findUnique({
    where: { userId },
  });

  if (!account) return await update({ userId });
  return { user, account };
};

const update = async ({
  userId,
  account,
}: UpdateSettingsInput): Promise<SettingsStore> => {
  const user = await getUserStore(userId);
  const { email, preferredName, password } = await db.accountSettings.upsert({
    where: { userId },
    create: {
      userId,
      email: account?.email ?? user.email,
      preferredName: account?.preferredName ?? user.name,
      password: account?.password,
    },
    update: { ...account },
  });
  return { user, account: { email, preferredName, password } };
};

export { get, update };
