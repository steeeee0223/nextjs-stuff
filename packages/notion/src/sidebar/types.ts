import type { TreeItemData } from "@swy/ui/shared";

export interface DocItemData extends TreeItemData {
  isFavorite: boolean;
  lastEditedBy: string;
  lastEditedAt: number; // timestamp in ms
}
