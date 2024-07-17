import { format } from "date-fns";

import type { Icon } from "@acme/prisma";
import type { IconInfo, TreeItem } from "@acme/ui/custom";

import type { DetailedDocument } from "./types";

export function generateDefaultIcon(group?: string): IconInfo {
  switch (group) {
    case "document":
      return { type: "lucide", name: "file" };
    case "kanban":
      return { type: "lucide", name: "columns-3" };
    case "whiteboard":
      return { type: "lucide", name: "presentation" };
    case "workflow":
      return { type: "lucide", name: "git-pull-request-arrow" };
    default:
      return { type: "emoji", emoji: " " };
  }
}

export function toIconInfo(icon?: Icon | null, defaultIcon?: string): IconInfo {
  if (!icon) return generateDefaultIcon(defaultIcon);
  const { type, src, color } = icon;
  switch (type) {
    case "emoji":
      return { type, emoji: src };
    case "lucide":
      return { type, name: src, color: color ?? undefined } as IconInfo;
    case "file":
      return { type, url: src };
  }
}

export function toIcon(info: IconInfo): Icon {
  switch (info.type) {
    case "emoji":
      return { type: info.type, src: info.emoji, color: null };
    case "lucide":
      return { type: info.type, src: info.name, color: info.color ?? null };
    case "file":
      return { type: info.type, src: info.url, color: null };
  }
}

export function toDateString(date: Date | string | number): string {
  return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
}

export function toTreeItem(doc: DetailedDocument): TreeItem {
  return {
    id: doc.id,
    title: doc.title,
    parentId: doc.parentId,
    icon: toIconInfo(doc.icon),
    group: doc.isArchived ? `trash:${doc.type}` : doc.type,
    lastEditedBy: doc.updatedBy.preferredName,
    lastEditedAt: toDateString(doc.updatedAt),
  };
}
