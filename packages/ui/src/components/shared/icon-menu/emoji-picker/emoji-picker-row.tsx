"use client";

import { memo } from "react";
import type { Emoji, GridRow } from "@udecode/plate-emoji";

import { Button } from "@swy/ui/shadcn";

import { Tooltip } from "../_components";
import type { Skin, UseEmojiPickerType } from "./types";
import { getNativeEmoji } from "./utils";

interface EmojiButtonProps {
  emoji: Emoji;
  skin: Skin;
  index: number;
  onSelect: (emoji: Emoji) => void;
}

export const EmojiButton: React.FC<EmojiButtonProps> = memo(
  ({ emoji, skin, index, onSelect }) => (
    <Tooltip align="center" side="top" description={emoji.name}>
      <Button
        variant="hint"
        className="size-8 p-0 text-2xl/none"
        onClick={() => onSelect(emoji)}
        aria-label={emoji.name}
        data-index={index}
        tabIndex={-1}
      >
        <span
          className="relative text-primary dark:text-primary/80"
          style={{
            fontFamily:
              '"Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", EmojiSymbols',
          }}
          data-emoji-set="native"
        >
          {getNativeEmoji(emoji, skin)}
        </span>
      </Button>
    </Tooltip>
  ),
);
EmojiButton.displayName = "EmojiButton";

type EmojiPickerRow = {
  row: GridRow;
} & Pick<UseEmojiPickerType, "emojiLibrary" | "skin" | "onSelectEmoji">;

export const EmojiPickerRow: React.FC<EmojiPickerRow> = memo(
  ({ emojiLibrary, row, skin, onSelectEmoji }) => (
    <div key={row.id} className="flex" data-index={row.id}>
      {row.elements.map((emojiId, index) => (
        <EmojiButton
          key={emojiId}
          emoji={emojiLibrary.getEmoji(emojiId)}
          skin={skin}
          index={index}
          onSelect={onSelectEmoji}
        />
      ))}
    </div>
  ),
);
EmojiPickerRow.displayName = "EmojiPickerRow";
