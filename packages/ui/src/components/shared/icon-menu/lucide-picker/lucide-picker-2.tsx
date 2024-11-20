"use client";

import React, { memo, useCallback } from "react";
import { Emoji, EmojiCategoryList, GridRow, i18n } from "@udecode/plate-emoji";
import { EmojiFloatingLibrary } from "@udecode/plate-emoji/react";

import { cn } from "@swy/ui/lib";
import { Button, TooltipProvider } from "@swy/ui/shadcn";

import { MenuSearchBar, MenuSectionTitle, Tooltip } from "../_components";
import { COLOR } from "../../../../constants/colors";
import { createLucideIcon } from "../../icon-block/create-lucide-icon";
import ColorPicker from "./color-picker";
import { useLucideMenu } from "./use-lucide-menu";

interface LucidePickerProps {
  onSelect: (name: string, color: string) => void;
}

export const LucidePicker2: React.FC<LucidePickerProps> = ({
  onSelect,
}) => {
  const buttonSize = 32;
  const {
    state: { searchValue, isSearching, visibleCategories, searchResult },
    color,
    setColor,
    refs,
    iconLibrary,
    getRandomEmoji,
    selectEmoji,
    setSearch,
  } = useLucideMenu({ onSelect });

  const isCategoryVisible = useCallback(
    (categoryId: EmojiCategoryList) =>
      visibleCategories.has(categoryId)
        ? visibleCategories.get(categoryId)
        : false,
    [visibleCategories],
  );

  const EmojiList = useCallback(() => {
    return iconLibrary
      .getGrid()
      .sections()
      .map(({ id: categoryId }) => {
        const section = iconLibrary.getGrid().section(categoryId);
        return (
          <div
            key={categoryId}
            ref={section.root}
            className="w-full"
            data-id={categoryId}
          >
            <MenuSectionTitle
              title={i18n.categories[categoryId]}
              className="sticky -top-px z-[1] bg-popover"
            />
            <div
              className="relative flex flex-wrap"
              style={{ height: section.getRows().length * buttonSize }}
            >
              {isCategoryVisible(categoryId) &&
                section
                  .getRows()
                  .map((row) => (
                    <EmojiPickerRow
                      key={row.id}
                      row={row}
                      color={color}
                      lib={iconLibrary}
                      onSelect={selectEmoji}
                    />
                  ))}
            </div>
          </div>
        );
      });
  }, [color, iconLibrary, isCategoryVisible, selectEmoji]);

  const SearchList = useCallback(() => {
    return (
      <div className="mr-3 w-full" data-id="search">
        <div className="relative flex flex-wrap">
          {searchResult.map((emoji, index) => (
            <EmojiButton
              key={emoji.id}
              index={index}
              emoji={iconLibrary.getEmoji(emoji.id)}
              color={color}
              onSelect={selectEmoji}
            />
          ))}
        </div>
      </div>
    );
  }, [searchResult, iconLibrary, color, selectEmoji]);

  return (
    <div>
      <MenuSearchBar
        search={searchValue}
        onSearchChange={setSearch}
        onRandomSelect={getRandomEmoji}
        Palette={
          <ColorPicker palette={COLOR} value={color} onSelect={setColor} />
        }
      />
      <TooltipProvider delayDuration={500}>
        <div
          ref={refs.current.contentRoot}
          className={cn(
            "-mr-3 h-[214px] overflow-y-auto overflow-x-hidden",
            "[&::-webkit-scrollbar]:w-2.5",
            "[&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-button]:size-0",
            "[&::-webkit-scrollbar-thumb]:hover:bg-muted-foreground/25 [&::-webkit-scrollbar-thumb]:min-h-11 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted",
            "[&::-webkit-scrollbar-thumb]:border-2.5 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-popover [&::-webkit-scrollbar-thumb]:bg-clip-padding",
          )}
          data-id="scroll"
        >
          <div ref={refs.current.content} className="h-full">
            {isSearching ? SearchList() : EmojiList()}
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

interface EmojiPickerRow {
  row: GridRow;
  lib: EmojiFloatingLibrary;
  color: string;
  onSelect: (icon: Emoji) => void;
}

export const EmojiPickerRow: React.FC<EmojiPickerRow> = memo(
  ({ lib, row, color, onSelect }) => (
    <div key={row.id} className="flex" data-index={row.id}>
      {row.elements.map((emojiId, index) => (
        <EmojiButton
          key={emojiId}
          emoji={lib.getEmoji(emojiId)}
          color={color}
          index={index}
          onSelect={onSelect}
        />
      ))}
    </div>
  ),
);
EmojiPickerRow.displayName = "EmojiPickerRow";

interface EmojiButtonProps {
  emoji: Emoji;
  color: string;
  index: number;
  onSelect: (emoji: Emoji) => void;
}

export const EmojiButton: React.FC<EmojiButtonProps> = memo(
  ({ emoji, color, index, onSelect }) => {
    const LucideIcon = createLucideIcon(emoji.name);
    return (
      <Tooltip align="center" side="top" description={emoji.name}>
        <Button
          variant="hint"
          onClick={() => onSelect(emoji)}
          className="size-[30px] p-0"
          aria-label={emoji.name}
          data-index={index}
          tabIndex={-1}
        >
          <LucideIcon color={color} size={20} strokeWidth={2.2} />
        </Button>
      </Tooltip>
    );
  },
);
EmojiButton.displayName = "EmojiButton";
