"use server";

import { Account, ACTION, AuditLog, Entity, worxpace } from "@swy/prisma";

export type LogWithAccount = AuditLog & {
  account: Account;
};

const getByEntity = async (entityId: string): Promise<LogWithAccount[]> =>
  await worxpace.auditLog.findMany({
    where: { entity: { is: { entityId } } },
    orderBy: { createdAt: "desc" },
    include: { account: true },
    take: 10,
  });

const create = async ({
  entity,
  action,
  accountId,
}: {
  entity: Entity;
  action: ACTION;
  accountId: string;
}) =>
  await worxpace.auditLog.create({
    data: {
      entity,
      action,
      account: { connect: { id: accountId } },
    },
  });

const remove = async (entityId: string) =>
  await worxpace.auditLog.deleteMany({
    where: { entity: { is: { entityId } } },
  });

export { getByEntity, create, remove };
