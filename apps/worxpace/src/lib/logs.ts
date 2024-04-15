"use server";

import { auth, currentUser } from "@clerk/nextjs";

import { ACTION, AuditLog, Entity, ROLE, worxpace } from "@acme/prisma";

const getByEntity = async (entityId: string): Promise<AuditLog[]> =>
  await worxpace.auditLog.findMany({
    where: { entity: { is: { entityId } } },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

const create = async (entity: Entity, action: ACTION) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();
    if (!user) throw new Error("User not found!");

    await worxpace.auditLog.create({
      data: {
        entity,
        action,
        user: {
          role: orgId ? ROLE.ORG : ROLE.USER,
          userId: user.id,
          orgId: orgId ?? undefined,
          image: user.imageUrl,
          name: `${user.firstName} ${user.lastName}`,
        },
      },
    });
  } catch (error) {
    console.log(`[AUDIT] Error`, error);
  }
};

const remove = async (entityId: string) =>
  await worxpace.auditLog.deleteMany({
    where: { entity: { is: { entityId } } },
  });

export { getByEntity, create, remove };
