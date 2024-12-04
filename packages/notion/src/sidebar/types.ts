import type { TreeItemData } from "@swy/ui/shared";

export interface DocItemData extends TreeItemData {
  lastEditedBy: string;
  lastEditedAt: number; // timestamp in ms
}
