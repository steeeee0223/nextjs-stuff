import type { LucideIcon } from "lucide-react";

import type { TreeItem } from "@acme/ui/components";

export const createItem = (
  id: string,
  title: string,
  parentId?: string,
  icon?: LucideIcon | string | null,
): TreeItem => ({
  id,
  title,
  parentId: parentId ?? null,
  isArchived: false,
  icon,
});

export const delay = async (timeout: number) =>
  await new Promise((resolve) => setTimeout(resolve, timeout));
