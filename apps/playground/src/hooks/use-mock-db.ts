"use client";

import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

import { actions, mockDB, type MockDB, type Model } from "~/db";
import { delay } from "~/lib/utils";

const initial: MockDB = {
  accounts: {},
  workspaces: {},
  memberships: [],
};

function determineType(input: unknown): "object" | "array" | "else" {
  return Array.isArray(input)
    ? "array"
    : typeof input === "object" && input !== null
      ? "object"
      : "else";
}

export const useMockDB = () => {
  const [db, update] = useLocalStorage<MockDB>("mock:db", initial);
  const setupDB = useCallback(() => update(mockDB), [update]);
  const addToDB = useCallback(
    <K extends keyof MockDB>(collection: K, data: MockDB[K]) =>
      dBAction(
        () =>
          update((prev) => {
            const storeType = determineType(prev[collection]);
            if (storeType === "else") return prev;
            return {
              ...prev,
              [collection]:
                storeType === "object"
                  ? { ...prev[collection], ...data }
                  : [
                      ...(prev[collection] as unknown[]),
                      ...(data as unknown[]),
                    ],
            };
          }),
        (e) => console.error(`[db:${collection}] update error`, e),
      ),
    [update],
  );
  const updateDB = useCallback(
    <K extends keyof MockDB>(
      collection: K,
      where: (item: Model<K>) => boolean,
      data: Partial<Model<K>>,
    ) =>
      dBAction(
        () =>
          update((prev) => {
            const storeType = determineType(prev[collection]);
            if (storeType === "else") return prev;
            if (storeType === "object") {
              const coll = prev[collection] as Record<string, Model<K>>;
              const items = Object.entries(coll).filter(([, item]) =>
                where(item),
              );
              items.forEach(([id, model]) => {
                coll[id] = { ...(model as object), ...data } as Model<K>;
              });
              return { ...prev, [collection]: coll };
            }
            return {
              ...prev,
              [collection]: (prev[collection] as Model<K>[])
                .filter((item) => !where(item))
                .map((model) => ({ ...(model as object), ...data })),
            };
          }),
        (e) => console.error(`[db:${collection}] update error`, e),
      ),
    [update],
  );
  const deleteFromDB = useCallback(
    <K extends keyof MockDB>(
      collection: K,
      where: (item: Model<K>) => boolean,
    ) =>
      dBAction(
        () =>
          update((prev) => {
            const storeType = determineType(prev[collection]);
            if (storeType === "else") return prev;
            if (storeType === "object") {
              const coll = prev[collection] as Record<string, Model<K>>;
              const items = Object.entries(coll).filter(([, item]) =>
                where(item),
              );
              items.forEach(([id]) => delete coll[id]);
              return { ...prev, [collection]: coll };
            }
            return {
              ...prev,
              [collection]: (prev[collection] as Model<K>[]).filter(
                (item) => !where(item),
              ),
            };
          }),
        (e) => console.error(`[db:${collection}] delete error`, e),
      ),
    [update],
  );
  const resetDB = useCallback(() => update(initial), [update]);
  /** fetchers */
  const findAccount = useCallback(
    (accountId: string) =>
      actions.findAccount({ accounts: db.accounts }, accountId),
    [db.accounts],
  );
  const findAccountMemberships = useCallback(
    (accountId: string) =>
      actions.findAccountMemberships(
        {
          workspaces: db.workspaces,
          memberships: db.memberships,
        },
        accountId,
      ),
    [db.memberships, db.workspaces],
  );
  const findWorkspace = useCallback(
    (accountId: string, workspaceId: string) =>
      actions.findWorkspace(
        { workspaces: db.workspaces, memberships: db.memberships },
        accountId,
        workspaceId,
      ),
    [db.workspaces, db.memberships],
  );

  return {
    setupDB,
    addToDB,
    updateDB,
    deleteFromDB,
    resetDB,
    /** fetchers */
    findAccount,
    findAccountMemberships,
    findWorkspace,
  };
};

const dBAction = async (fn: () => void, onError: (err: unknown) => void) => {
  let ok = false;
  try {
    await delay(500);
    fn();
    ok = true;
  } catch (err) {
    onError(err);
  }
  return ok;
};
