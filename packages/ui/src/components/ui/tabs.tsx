"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const listVariants = cva("inline-flex h-10 items-center", {
  variants: {
    variant: {
      default: "justify-center rounded-md bg-muted p-1 text-muted-foreground",
      notion:
        "flex w-full justify-start rounded-none border-b border-primary/10 bg-transparent p-0 text-primary/50",
    },
  },
  defaultVariants: { variant: "default" },
});
export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof listVariants> {}
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(listVariants({ variant, className }))}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const triggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background",
  {
    variants: {
      variant: {
        default:
          "rounded-sm px-3 py-1.5 ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        notion:
          "relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent text-primary/50 shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:shadow-none",
      },
      defaultVariants: { variants: "default" },
    },
  },
);
export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof triggerVariants> {}
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(triggerVariants({ variant, className }))}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const contentVariants = cva(
  "mt-2 ring-offset-background focus-visible:outline-none",
  {
    variants: {
      variant: {
        default:
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        notion:
          "relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
      },
      defaultVariants: { variants: "default" },
    },
  },
);
export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
    VariantProps<typeof contentVariants> {}
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(contentVariants({ variant, className }))}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
