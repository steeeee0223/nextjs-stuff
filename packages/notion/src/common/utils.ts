import type { IconInfo } from "@swy/ui/shared";

export function generateDefaultIcon(type?: string): IconInfo {
  switch (type) {
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
