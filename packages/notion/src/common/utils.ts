import { format } from "date-fns";

import type { IconInfo } from "@swy/ui/shared";

/**
 * @see `constants/color.ts` in `@swy/ui`
 */
const defaultColor = "#55534E";
export function generateDefaultIcon(type?: string): IconInfo {
  switch (type) {
    case "document":
      return { type: "lucide", name: "file", color: defaultColor };
    case "kanban":
      return { type: "lucide", name: "columns-3", color: defaultColor };
    case "whiteboard":
      return { type: "lucide", name: "presentation", color: defaultColor };
    case "workflow":
      return {
        type: "lucide",
        name: "git-pull-request-arrow",
        color: defaultColor,
      };
    default:
      return { type: "text", text: " " };
  }
}

export function toDateString(date: Date | string | number): string {
  return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
}
