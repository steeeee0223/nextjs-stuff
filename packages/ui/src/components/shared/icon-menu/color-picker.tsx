"use client";

import { forwardRef, useState } from "react";
import { Circle } from "lucide-react";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@swy/ui/shadcn";

import { Hint } from "../hint";

export interface ColorPickerProps {
  /**
   * @prop colorPalette: accepts key `name`, value `color hex`, `rgb string`
   */
  colorPalette: Record<string, string>;
  color: string;
  onSelect: (color: string) => void;
}

const ColorPicker = forwardRef<HTMLButtonElement, ColorPickerProps>(
  function ColorPicker({ colorPalette, color, onSelect }, ref) {
    const [open, setOpen] = useState(false);
    const selectColor = (color: string) => {
      setOpen(false);
      onSelect(color);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <Hint asChild description="Select icon color">
          <PopoverTrigger asChild ref={ref}>
            <Button variant="secondary" size="icon-md">
              <Circle size={16} color={color} fill={color} />
            </Button>
          </PopoverTrigger>
        </Hint>
        <PopoverContent className="grid w-[180px] grid-cols-5 gap-0 p-2">
          {Object.entries(colorPalette).map(([name, color], i) => (
            <Hint asChild key={i} description={name}>
              <Button
                variant="hint"
                className="size-[30px] p-0"
                onClick={() => selectColor(color)}
              >
                <Circle color={color} fill={color} size={16} />
              </Button>
            </Hint>
          ))}
        </PopoverContent>
      </Popover>
    );
  },
);
export default ColorPicker;
