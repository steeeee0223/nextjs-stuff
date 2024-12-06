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
        console.error("update db error", error);
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

  return {
    setupDB,
    updateDB,
    resetDB,
    /** fetchers */
    findAccount,
    findAccountMemberships,
  };
};
