"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type SelectContentProps,
} from "@swy/ui/shadcn";

export interface Option {
  label: string;
  description?: string;
}

export interface CustomSelectProps<T extends string = string>
  extends Pick<SelectContentProps, "side" | "align"> {
  className?: string;
  /**
   * @prop `options` maps `value` to `Option.value`
   */
  options: Record<T, string | Option>;
  onChange?: (value: T) => void;
  value?: T;
  placeholder?: string;
  disabled?: boolean;
  hideCheck?: boolean;
  customDisplay?: React.FC<{ option?: Option | string }>;
}

const CustomSelect = <T extends string = string>({
  className,
  options,
  value,
  placeholder,
  side = "bottom",
  align = "end",
  disabled,
  hideCheck,
  onChange,
  customDisplay: Display,
}: CustomSelectProps<T>) => {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue
          aria-disabled={disabled}
          placeholder={placeholder}
          {...(Display && {
            "aira-label": value,
            children: <Display option={value ? options[value] : undefined} />,
          })}
        />
      </SelectTrigger>
      <SelectContent position="popper" side={side} align={align}>
        <SelectGroup>
          {Object.entries<string | Option>(options).map(([key, option]) => (
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
