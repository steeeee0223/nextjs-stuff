"use client";

import type { PropsWithChildren } from "react";
import EmojiPickerPrimitive, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";

import { Popover, PopoverContent, PopoverTrigger } from "@swy/ui/shadcn";

const THEME_MAP = {
  dark: Theme.DARK,
  light: Theme.LIGHT,
};

interface EmojiPickerProps extends PropsWithChildren {
  asChild?: boolean;
  onChange?: (icon: string) => void;
}

export const EmojiPicker = ({
  onChange,
  children,
  asChild,
}: EmojiPickerProps) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme ?? "light") as keyof typeof THEME_MAP;
  const theme = THEME_MAP[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="w-full">
        <EmojiPickerPrimitive
          height={350}
          theme={theme}
          onEmojiClick={(data) => onChange?.(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};
