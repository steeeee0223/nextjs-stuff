import type { IconInfo } from "../icon-block";

export interface TreeItem {
  id: string;
  title: string;
  parentId?: string | null;
  group: string | null;
  icon?: IconInfo;
  lastEditedBy?: string;
  lastEditedAt?: string;
}
