"use client";

import type { PropsWithChildren } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const THEME_MAP = {
  dark: Theme.DARK,
  light: Theme.LIGHT,
};

interface IconPickerProps extends PropsWithChildren {
  asChild?: boolean;
  onChange?: (icon: string) => void;
}

export const IconPicker = ({
  onChange,
  children,
  asChild,
}: IconPickerProps) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme ?? "light") as keyof typeof THEME_MAP;
  const theme = THEME_MAP[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="w-full">
        <EmojiPicker
          height={350}
          theme={theme}
          onEmojiClick={(data) => onChange?.(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};
