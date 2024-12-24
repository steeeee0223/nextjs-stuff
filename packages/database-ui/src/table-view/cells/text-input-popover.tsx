"use client";

import React from "react";

import { Input, Popover, PopoverContent, PopoverTrigger } from "@swy/ui/shadcn";

import "./view.css";

type TextInputPopoverProps = React.PropsWithChildren<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  position: { top: number; left: number };
  value: string;
}>;

export const TextInputPopover: React.FC<TextInputPopoverProps> = ({
  open,
  onOpenChange,
  position,
  value,
  children,
}) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange} modal>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side="bottom"
        sideOffset={-position.top}
        align="start"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[773px] min-h-[34px] w-[240px] flex-col overflow-visible backdrop-filter-none"
      >
        <Input
          spellCheck
          value={value}
          className="word-break max-h-[771px] min-h-8 whitespace-pre-wrap border-none bg-transparent caret-primary"
        />
        {/* <div className="flex flex-col overflow-y-auto grow h-full px-2 py-1.5 min-h-[34px] justify-between text-sm font-medium">
            <div spellCheck contentEditable data-content-editable-leaf className="w-full max-w-full whitespace-pre-wrap word-break caret-primary">{value}</div>
        </div> */}
      </PopoverContent>
    </Popover>
  );
};
