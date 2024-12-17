"use client";

import React, { useRef, useState } from "react";

import { Input, Popover, PopoverContent, PopoverTrigger } from "@swy/ui/shadcn";
import { IconBlock, IconInfo, IconMenu } from "@swy/ui/shared";

interface RenamePopoverProps extends React.PropsWithChildren {
  title: string;
  icon: IconInfo;
  onChange: (value: { title: string; icon: IconInfo }) => void;
}

export const RenamePopover: React.FC<RenamePopoverProps> = ({
  children,
  title,
  icon,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen)
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      const value = inputRef.current?.value;
      if (value && value !== title) onChange({ title: value, icon });
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange} modal>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="flex w-[380px] items-center gap-1.5 px-2 py-1"
        onClick={(e) => e.stopPropagation()}
      >
        <IconMenu
          className="size-7 shrink-0 border border-border-button hover:bg-primary/5"
          onSelect={(icon) => onChange({ title, icon })}
          onRemove={() =>
            onChange({ title, icon: { type: "lucide", name: "file" } })
          }
        >
          <IconBlock icon={icon} className="p-0 text-lg/[22px]" />
        </IconMenu>
        <Input
          ref={inputRef}
          className="whitespace-pre-wrap break-words"
          value={title}
          onChange={(e) => onChange({ title: e.target.value, icon })}
          onKeyDown={onKeyDown}
        />
      </PopoverContent>
    </Popover>
  );
};
