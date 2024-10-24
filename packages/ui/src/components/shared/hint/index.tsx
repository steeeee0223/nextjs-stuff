import type { ReactNode } from "react";

import { cn } from "@swy/ui/lib";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  type TooltipContentProps,
} from "@swy/ui/shadcn";

export interface HintProps extends TooltipContentProps {
  /** @property triggerProps modifies the `className` of `TooltipTrigger`  */
  triggerProps?: string;
  children: ReactNode;
  description: string;
}

export const Hint = ({
  children,
  className,
  triggerProps,
  description,
  asChild,
  side = "bottom",
  ...props
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild} className={triggerProps}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          className={cn("font-medium", className)}
          {...props}
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
