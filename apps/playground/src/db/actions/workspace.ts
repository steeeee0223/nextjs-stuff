import type { Workspace } from "@swy/notion";

import { delay } from "~/lib/utils";
import type { MockDB } from "../mock-db";

export const findAccount = async (
  db: Pick<MockDB, "accounts">,
  accountId: string,
) => {
  await delay(500);
  return await Promise.resolve(db.accounts[accountId] ?? null);
};

export const findAccountMemberships = async (
  db: Pick<MockDB, "workspaces" | "memberships">,
  accountId: string,
): Promise<Workspace[]> => {
  await delay(500);
  const mems = db.memberships.filter((mem) => mem.accountId === accountId);
  const ws = mems.map((mem) => {
    const w = db.workspaces[mem.workspaceId]!;
    const membersCount = db.memberships.filter(
      (mem) => mem.workspaceId === w.id,
    ).length;
    return {
      id: w.id,
      role: mem.role,
      name: w.name,
      icon: w.icon ?? { type: "text", text: w.name },
      members: membersCount,
      plan: w.plan,
    };
  });
  return await Promise.resolve(ws);
};
