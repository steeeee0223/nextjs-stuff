import type { LucideIcon } from "lucide-react";

export type Groups = readonly string[];

export interface TreeItem {
  id: string;
  title: string;
  parentId?: string | null;
  group: Groups[number] | null;
  icon?: LucideIcon | string | null;
}
