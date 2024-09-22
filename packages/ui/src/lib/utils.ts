import type { CxOptions } from "class-variance-authority";
import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import type { IconInfo } from "@/components/custom/icon-block";
import { COLOR } from "@/constants/colors";

function cn(...inputs: CxOptions) {
  return twMerge(cx(inputs));
}

export { cn };

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomItem<T>(items: T[]): T {
  return items.at(randomInt(0, items.length - 1))!;
}

export function toPascalCase(s: string): string {
  return s
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function pascalToDash(input: string): string {
  let result = "";
  for (let i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    if (char === char.toUpperCase() && i > 0 && isNaN(Number(input[i - 1]))) {
      result += "-" + char.toLowerCase();
    } else {
      result += char.toLowerCase();
    }
  }
  return result;
}

export function idToColor(id: string): string {
  const colors = Object.values(COLOR);
  const sum = Array.from(id).reduce((acc, x) => acc + x.charCodeAt(0), 0);
  return colors[sum % colors.length]!;
}

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
