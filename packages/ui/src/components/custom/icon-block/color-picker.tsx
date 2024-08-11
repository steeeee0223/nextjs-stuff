"use client";

import { forwardRef, Ref, useState } from "react";
import { Circle } from "lucide-react";

import { Hint } from "@/components/custom/hint";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { COLOR } from "@/constants/colors";
import { styles } from "./styles";

export interface ColorPickerProps {
  defaultColor: string;
  /**
   * colors: accepts key `name`, value `color hex`, `rgb string`
   */
  colors?: Record<string, string>;
  onSelect?: (color: string) => void;
}

const ColorPicker = forwardRef(function ColorPicker(
  { defaultColor, colors = COLOR, onSelect }: ColorPickerProps,
  ref: Ref<HTMLButtonElement>,
) {
  const [open, setOpen] = useState(false);
  const handleSelect = (color: string) => {
    setOpen(false);
    onSelect?.(color);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild ref={ref}>
        <Button variant="notion" size="icon-md">
          <Circle size={16} color={defaultColor} fill={defaultColor} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        variant="notion"
        className="z-[99999] grid w-[180px] grid-cols-5 gap-0 p-2"
      >
        {Object.entries(colors).map(([name, color], i) => (
          <Hint asChild key={i} description={name} variant="notion" size="sm">
            <Button
              variant="hint"
              size="icon-md"
              onClick={() => handleSelect(color)}
              className={styles.gridItem}
            >
              <Circle color={color} fill={color} size={16} />
            </Button>
          </Hint>
        ))}
      </PopoverContent>
    </Popover>
  );
});
export default ColorPicker;
