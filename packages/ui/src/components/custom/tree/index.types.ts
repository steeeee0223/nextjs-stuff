import type { LucideIcon } from "lucide-react";

export interface TreeItem {
  id: string;
  title: string;
  parentId?: string | null;
  group: string | null;
  icon?: LucideIcon | string | null;
}
