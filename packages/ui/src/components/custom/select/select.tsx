"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type SelectContentProps,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface Option {
  label: string;
  description?: string;
}

export interface CustomSelectProps
  extends Pick<SelectContentProps, "side" | "align"> {
  className?: string;
  /**
   * @prop `options` maps `value` to `Option.value`
   */
  options: Record<string, string | Option>;
  onChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  hideCheck?: boolean;
  customDisplay?: React.FC<{ option?: Option | string }>;
}

const CustomSelect = ({
  className,
  options,
  defaultValue,
  placeholder,
  side = "bottom",
  align = "end",
  disabled,
  hideCheck,
  onChange,
  customDisplay: Display,
}: CustomSelectProps) => {
  const [value, setValue] = useState<string>(defaultValue ?? "");
  const onValueChange = (value: string) => {
    setValue(value);
    onChange?.(value);
  };

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger
        className={cn(
          "focus:none mb-1 mt-3 inline-flex h-7 min-w-0 flex-shrink-0 cursor-pointer select-none items-center whitespace-nowrap rounded-sm border-none px-2 text-sm text-primary hover:bg-primary/5",
          className,
        )}
      >
        <SelectValue
          aria-disabled={disabled}
          placeholder={placeholder}
          {...(Display && {
            "aira-label": value,
            children: <Display option={options[value]} />,
          })}
        />
      </SelectTrigger>
      <SelectContent
        className="z-[99999] border-primary/10 dark:bg-[#252525]"
        position="popper"
        side={side}
        align={align}
      >
        <SelectGroup>
          {Object.entries(options).map(([key, option]) => (
            <SelectItem
              className="min-h-7 min-w-0 flex-shrink flex-grow basis-auto justify-between gap-x-6 py-1 text-sm focus:bg-primary/5"
              value={key}
              key={key}
              hideCheck={hideCheck}
            >
              <div className="flex items-center overflow-hidden text-ellipsis whitespace-nowrap">
                {typeof option === "string" ? option : option.label}
              </div>
              {typeof option !== "string" && option.description && (
                <div className="mt-0.5 overflow-hidden text-ellipsis whitespace-normal text-xs text-primary/65">
                  {option.description}
                </div>
              )}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
