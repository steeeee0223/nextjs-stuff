import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type SelectContentProps,
  type SelectProps,
} from "@/components/ui/select";

export interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps
  extends Pick<SelectContentProps, "side" | "align">,
    Pick<SelectProps, "defaultValue" | "disabled"> {
  options: Option[];
  onChange?: (value: string) => void;
}

const CustomSelect = ({
  options,
  defaultValue,
  side = "bottom",
  align = "end",
  disabled,
  onChange,
}: CustomSelectProps) => {
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger className="focus:none mb-1 mt-3 inline-flex h-7 min-w-0 flex-shrink-0 cursor-pointer select-none items-center whitespace-nowrap rounded-sm border-none px-2 text-sm text-primary hover:bg-primary/5">
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        className="z-[99999]"
        position="popper"
        side={side}
        align={align}
      >
        <SelectGroup>
          {options.map(({ label, value }, i) => (
            <SelectItem
              className="min-h-7 justify-between gap-x-6 py-0 text-sm focus:bg-primary/5"
              value={value}
              key={i}
            >
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
