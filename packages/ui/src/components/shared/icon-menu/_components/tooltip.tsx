import React from "react";

import {
  TooltipContent,
  Tooltip as TooltipPrimitive,
  TooltipTrigger,
  type TooltipContentProps,
} from "@swy/ui/shadcn";

interface TooltipProps extends TooltipContentProps {
  children: React.ReactNode;
  description: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  description,
  side = "bottom",
  ...props
}) => {
  return (
    <TooltipPrimitive>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} {...props}>
        {description}
      </TooltipContent>
    </TooltipPrimitive>
  );
};
