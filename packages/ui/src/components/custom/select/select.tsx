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
      <SelectTrigger className={className}>
        <SelectValue
          aria-disabled={disabled}
          placeholder={placeholder}
          {...(Display && {
            "aira-label": value,
            children: <Display option={options[value]} />,
          })}
        />
      </SelectTrigger>
      <SelectContent position="popper" side={side} align={align}>
        <SelectGroup>
          {Object.entries(options).map(([key, option]) => (
            <SelectItem
              className="min-h-7 min-w-0 flex-auto justify-between gap-x-6"
              value={key}
              key={key}
              hideCheck={hideCheck}
            >
              <div className="flex items-center truncate">
                {typeof option === "string" ? option : option.label}
              </div>
              {typeof option !== "string" && option.description && (
                <div className="mt-0.5 overflow-hidden text-ellipsis whitespace-normal text-xs text-secondary dark:text-secondary-dark">
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
