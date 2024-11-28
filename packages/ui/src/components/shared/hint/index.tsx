import type { ReactNode } from "react";

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
        <TooltipContent side={side} {...props}>
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
