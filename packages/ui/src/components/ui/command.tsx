"use client";

import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "@swy/ui/lib";

import { Dialog, DialogContent } from "./dialog";
import {
  buttonVariants,
  inputVariants,
  separatorVariants,
  type ButtonVariants,
  type InputVariants,
} from "./variants";

type CommandProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>;
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  CommandProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md bg-modal",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps
  extends DialogProps,
    Pick<CommandProps, "shouldFilter"> {
  className?: string;
}

const CommandDialog = ({
  className,
  shouldFilter,
  children,
  ...props
}: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent
        className={cn("overflow-hidden p-0 shadow-lg", className)}
        noTitle
        hideClose
      >
        <Command
          shouldFilter={shouldFilter}
          className="focus-visible:outline-none dark:text-muted-dark [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12"
          // [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

interface CommandInputProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    InputVariants {}
const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ className, variant = "search", ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <CommandPrimitive.Input
      ref={ref}
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn("py-6 text-center text-sm", className)}
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-muted dark:text-muted-dark [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

type CommandSeparatorProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Separator
>;
const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn(separatorVariants({ variant: "default", className }))}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

interface CommandItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
    ButtonVariants {}
const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, size = "sm", ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      buttonVariants({ variant: "item", size }),
      "px-2 py-1.5 aria-selected:bg-primary/5 aria-selected:text-primary dark:aria-selected:text-primary/80",
      // this is tricky...
      "data-[disabled]:pointer-events-auto data-[disabled]:opacity-100",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted dark:text-muted-dark",
        className,
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
