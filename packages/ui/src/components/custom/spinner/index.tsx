import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin text-muted-foreground", {
  variants: {
    size: {
      sm: "h-2 w-2",
      md: "h-4 w-4",
      lg: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export const Spinner = ({ className, size }: SpinnerProps) => {
  return <Loader className={cn(spinnerVariants({ size, className }))} />;
};
