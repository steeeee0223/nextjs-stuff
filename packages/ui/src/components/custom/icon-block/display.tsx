"use client";

import { forwardRef, useMemo } from "react";
import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib";
import type { IconInfo } from "./index.types";

export interface IconDisplayProps {
  iconInfo: IconInfo;
  className?: string;
}

export default forwardRef(function IconDisplay(
  { iconInfo, className }: IconDisplayProps,
  _ref,
) {
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
          className={cn("shrink-0 text-muted-foreground", className)}
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
        <div className={cn("shrink-0 justify-center", className)}>
          {iconInfo.emoji}
        </div>
      );
  }
});
