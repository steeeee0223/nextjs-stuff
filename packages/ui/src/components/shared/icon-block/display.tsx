"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";

import { cn } from "@swy/ui/lib";
import { Avatar, AvatarFallback, AvatarImage } from "@swy/ui/shadcn";

import type { IconInfo } from "./index.types";

export interface IconDisplayProps {
  iconInfo: IconInfo;
  className?: string;
}

const IconDisplay = ({ iconInfo, className }: IconDisplayProps) => {
  const LucideIcon = useMemo(
    () =>
      iconInfo.type === "lucide"
        ? dynamic(dynamicIconImports[iconInfo.name])
        : () => null,
    [iconInfo],
  );

  switch (iconInfo.type) {
    case "lucide":
      return (
        <LucideIcon
          color={iconInfo.color}
          className={cn("shrink-0", className)}
        />
      );
    case "file":
      return (
        <Avatar className={cn("shrink-0 rounded-sm", className)}>
          <AvatarFallback>UI</AvatarFallback>
          <AvatarImage src={iconInfo.url} alt="ui:icon-picker" />
        </Avatar>
      );
    case "emoji":
      return (
        <div
          className={cn(
            "shrink-0 justify-center text-primary dark:text-primary/80",
            className,
          )}
        >
          {iconInfo.emoji}
        </div>
      );
  }
};

export default IconDisplay;
