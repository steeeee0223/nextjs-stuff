import { icons } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export type LucideName = keyof typeof dynamicIconImports;
/** @deprecated */
export type PascalLucideName = keyof typeof icons;
export type IconInfo =
  | { type: "lucide"; name: LucideName; color?: string }
  | { type: "emoji"; emoji: string }
  | { type: "file"; url: string };
export type IconTag = [name: LucideName, tags: string[]];
