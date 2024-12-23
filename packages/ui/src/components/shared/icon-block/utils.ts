import { z } from "zod";

import type { IconInfo } from "./types";

export const isEmoji = (text: string) =>
  z.string().emoji().safeParse(text).success;

export const getLetter = (
  icon: Extract<IconInfo, { type: "emoji" | "text" }>,
  fallbackText: string,
) => {
  const letter =
    icon.type === "emoji" && icon.emoji.length > 0
      ? icon.emoji[0]!
      : icon.type === "text" && icon.text.length > 0
        ? icon.text[0]!
        : fallbackText;
  return letter.toUpperCase();
};
