"use client";

import { forwardRef, useState } from "react";
import { Circle } from "lucide-react";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TooltipProvider,
} from "@swy/ui/shadcn";

import { Tooltip, type PaletteProps } from "../_components";

type ColorPickerProps = PaletteProps<
  Record<string, string> & { default: string }
>;

const ColorPicker = forwardRef<HTMLButtonElement, ColorPickerProps>(
  function ColorPicker({ palette, value, onSelect }, ref) {
    const [open, setOpen] = useState(false);
    const selectColor = (color: string) => {
      setOpen(false);
      onSelect(color);
    };

    return (
      <TooltipProvider delayDuration={500}>
        <Popover open={open} onOpenChange={setOpen}>
          <Tooltip description="Select icon color">
            <PopoverTrigger asChild ref={ref}>
              <Button variant="secondary" size="icon-md">
                <Circle size={16} color={value} fill={value} />
              </Button>
            </PopoverTrigger>
          </Tooltip>
          <PopoverContent className="grid w-[180px] grid-cols-5 gap-0 p-2">
            {Object.entries(palette).map(([name, color]) => (
              <Tooltip key={name} description={name}>
                <Button
                  variant="hint"
                  className="size-[30px] p-0"
                  onClick={() => selectColor(color)}
                >
                  <Circle color={color} fill={color} size={16} />
                </Button>
              </Tooltip>
            ))}
          </PopoverContent>
        </Popover>
      </TooltipProvider>
    );
  },
);
export default ColorPicker;
