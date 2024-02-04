import { FileIcon, type LucideIcon } from "lucide-react";

import { cn } from "@/lib";

export interface CRUDItemIconProps {
  icon?: LucideIcon | string | null;
  className?: string;
}

export const CRUDItemIcon = ({ className, icon: Icon }: CRUDItemIconProps) => {
  if (!Icon)
    return (
      <FileIcon
        className={cn(
          className,
          "h-[18px] w-[18px] shrink-0 text-muted-foreground",
        )}
      />
    );
  if (typeof Icon === "string")
    return <div className={cn(className, "shrink-0 text-[18px]")}>{Icon}</div>;
  return (
    <Icon
      className={cn(
        className,
        "h-[18px] w-[18px] shrink-0 text-muted-foreground",
      )}
    />
  );
};
