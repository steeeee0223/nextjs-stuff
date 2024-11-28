"use client";

import { forwardRef, useState } from "react";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TooltipProvider,
} from "@swy/ui/shadcn";

import { Tooltip, type PaletteProps } from "../_components";
import type { Skin } from "./types";

type SkinPickerProps = PaletteProps<
  Record<Skin, { emoji: string; name: string }>
>;

export const SkinPicker = forwardRef<HTMLButtonElement, SkinPickerProps>(
  ({ palette, value, onSelect }, ref) => {
    const [open, setOpen] = useState(false);
    const selectSkin = (skin: Skin) => {
      setOpen(false);
      onSelect(skin);
    };

    return (
      <TooltipProvider delayDuration={500}>
        <Popover open={open} onOpenChange={setOpen}>
          <Tooltip description="Select skin tone">
            <PopoverTrigger asChild ref={ref}>
              <Button
                variant="hint"
                size="icon-md"
                className="text-xl/6 text-primary dark:text-primary/80"
              >
                {palette[value].emoji}
              </Button>
            </PopoverTrigger>
          </Tooltip>
          <PopoverContent className="grid w-[200px] grid-cols-6 gap-0 p-1">
            {Object.entries(palette).map(([id, { emoji, name }]) => (
              <Tooltip key={id} sideOffset={8} description={name}>
                <Button
                  variant="hint"
                  className="size-8 p-0 text-2xl text-primary dark:text-primary/80"
                  onClick={() => selectSkin(id as Skin)}
                >
                  {emoji}
                </Button>
              </Tooltip>
            ))}
          </PopoverContent>
        </Popover>
      </TooltipProvider>
    );
  },
);

SkinPicker.displayName = "SkinPicker";
