"use server";

import { currentUser } from "@clerk/nextjs";

import type { UserStore } from "@acme/ui/notion";

export const getUser = async (userId: string): Promise<UserStore> => {
  const user = await currentUser();
  return {
    id: userId,
    name: `${user?.firstName} ${user?.lastName}`,
    email: user?.emailAddresses[0]?.emailAddress ?? "",
    imageUrl: user?.imageUrl ?? "",
  };
};
