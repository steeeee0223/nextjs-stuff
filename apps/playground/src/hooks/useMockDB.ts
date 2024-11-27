"use client";

import { useLocalStorage } from "usehooks-ts";

import type { MockDB } from "~/db";

const initial: MockDB = {
  accounts: {},
  workspaces: {},
  memberships: [],
};

export const useMockDB = () => {
  const [value, update] = useLocalStorage<MockDB>("mock:db", initial);

  return {
    ...value,
    update,
    reset: () => update(initial),
  };
};
