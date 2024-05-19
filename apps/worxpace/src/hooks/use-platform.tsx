"use client";

import { useRouter } from "next/navigation";

export const usePlatform = () => {
  const router = useRouter();
  const toToolsPage = (id: string, group: string | null) => {
    if (group === "document") router.push(`/documents/${id}`);
    if (group === "kanban") router.push(`/kanban/${id}`);
    if (group === "whiteboard") router.push(`/whiteboard/${id}`);
    if (group === "workflow") router.push(`/workflows/${id}`);
  };
  return { toToolsPage };
};
