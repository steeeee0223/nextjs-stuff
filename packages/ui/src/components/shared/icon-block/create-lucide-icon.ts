import { createElement, forwardRef } from "react";
import { Icon, type IconNode, type LucideProps } from "lucide-react";

import { cn, toPascalCase } from "@swy/ui/lib";

import { iconNodes } from "./data";
import type { LucideName } from "./types";

/**
 * Create a Lucide icon component
 */
export const createLucideIcon = (name: string) => {
  if (!(name in iconNodes)) return () => null;
  const nodeWithKeys = iconNodes[name as LucideName].map(([elem, attrs], i) => [
    elem,
    { ...attrs, key: `${name}-${i}` },
  ]) as IconNode;
  const Component = forwardRef<SVGSVGElement, LucideProps>(
    ({ className, ...props }, ref) =>
      createElement(Icon, {
        ref,
        iconNode: nodeWithKeys,
        className: cn(`lucide-${name}`, className),
        ...props,
      }),
  );

  Component.displayName = toPascalCase(name);
  return Component;
};
