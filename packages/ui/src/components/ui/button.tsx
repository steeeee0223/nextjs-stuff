"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@/lib";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        /** Custom */
        notion:
          "select-none border border-primary/10 bg-background font-normal shadow-none hover:bg-[#e1e1e1] dark:hover:bg-[#2f2f2f]",
        blue: "border border-primary/10 bg-button text-white shadow-sm hover:bg-[#0077d4] hover:text-white",
        hint: "select-none text-primary/50 shadow-none hover:bg-primary/10",
        warning:
          "select-none border border-warning/50 bg-background font-normal text-warning shadow-none hover:bg-warning/10",
      },
      size: {
        xs: "h-6 rounded-sm px-1.5 text-xs",
        sm: "h-8 rounded-sm px-3 text-sm",
        md: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
        "icon-sm": "size-5",
        "icon-md": "size-7",
        "icon-nav": "size-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
