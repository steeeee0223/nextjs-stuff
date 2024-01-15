import type { LucideIcon } from "lucide-react";

export interface TreeItem {
  id: string;
  title: string;
  parentId?: string | null;
  isArchived?: boolean;
  icon?: LucideIcon | string | null;
}
