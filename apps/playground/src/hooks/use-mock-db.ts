"use client";

import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

import { actions, mockDB, type MockDB } from "~/db";
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
  const updateDB = useCallback(
    async <K extends keyof MockDB>(collection: K, data: MockDB[K]) => {
      await delay(500);
      let ok = false;
      try {
        update((prev) => {
          const storeType = determineType(prev[collection]);
          if (storeType === "else") return prev;
          return {
            ...prev,
            [collection]:
              storeType === "object"
                ? { ...prev[collection], ...data }
                : [...(prev[collection] as unknown[]), ...(data as unknown[])],
          };
        });
        ok = true;
      } catch (error) {
        console.error(`[db:${collection}] update error`, error);
      }
      return Promise.resolve(ok);
    },
    [update],
  );
  const deleteFromDB = useCallback(
    async <
      K extends keyof MockDB,
      T = MockDB[K] extends Record<string, infer V>
        ? V
        : MockDB[K] extends (infer U)[]
          ? U
          : never,
    >(
      collection: K,
      where: (item: T) => boolean,
    ) => {
      await delay(500);
      let ok = false;
      try {
        update((prev) => {
          const storeType = determineType(prev[collection]);
          if (storeType === "else") return prev;
          if (storeType === "object") {
            const coll = prev[collection] as Record<string, T>;
            const items = Object.entries(coll).filter(([, item]) =>
              where(item),
            );
            items.forEach(([id]) => delete coll[id]);
            return { ...prev, [collection]: coll };
          }
          return {
            ...prev,
            [collection]: (prev[collection] as T[]).filter(
              (item) => !where(item),
            ),
          };
        });
        ok = true;
      } catch (error) {
        console.error(`[db:${collection}] delete error`, error);
      }
      return Promise.resolve(ok);
    },
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
    updateDB,
    deleteFromDB,
    resetDB,
    /** fetchers */
    findAccount,
    findAccountMemberships,
    findWorkspace,
  };
};
