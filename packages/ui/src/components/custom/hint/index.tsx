import type { ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib";

export interface HintProps {
  className?: string;
  children: ReactNode;
  description: string;
  asChild?: boolean;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
}

export const Hint = ({
  children,
  className,
  description,
  asChild,
  side = "bottom",
  sideOffset,
  align,
  alignOffset,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={sideOffset}
          side={side}
          align={align}
          alignOffset={alignOffset}
          className={cn("max-w-[220px] break-words text-xs", className)}
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
