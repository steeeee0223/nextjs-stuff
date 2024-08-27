"use client";

import { useEffect, useState } from "react";

import type { WorkspaceMemberships } from "../index.types";

interface UsePeopleOptions {
  load?: () => Promise<WorkspaceMemberships>;
}

const initial: WorkspaceMemberships = { members: [], guests: [] };

export const usePeople = ({ load }: UsePeopleOptions) => {
  const [memberships, setMemberships] = useState<WorkspaceMemberships>(initial);

  useEffect(() => {
    const $load = async () => {
      try {
        const data = (await load?.()) ?? initial;
        setMemberships(data);
      } catch (error) {
        console.log(`[settings:people] Error`, error);
      }
    };
    void $load();
  }, [load]);

  return { memberships };
};
