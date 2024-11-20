"use client";

import {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Emoji } from "@emoji-mart/data";
import { EmojiFloatingIndexSearch } from "@udecode/plate-emoji";
import {
  EmojiFloatingLibrary,
  EmojiPickerState,
  FrequentEmojiStorage,
  observeCategories,
  SetFocusedAndVisibleSectionsType,
} from "@udecode/plate-emoji/react";

import { COLOR } from "../../../../constants/colors";
import { randomItem } from "../../../../lib";
import { lib } from "./lib";

interface UseEmojiMenuOptions {
  // settings: EmojiSettingsType;
  onSelect: (name: string, color: string) => void;
}

const frequentSettings = { limit: 16, key: "recent", prefix: "icon" };

export function useLucideMenu({ onSelect }: UseEmojiMenuOptions) {
  const [iconLibrary, indexSearch] = useMemo(() => {
    const recentStorage = new FrequentEmojiStorage(frequentSettings, {});
    const iconLibrary = EmojiFloatingLibrary.getInstance(
      {
        buttonSize: { value: 32 },
        categories: { value: ["custom"] },
        perLine: { value: 12 },
        showFrequent: { value: true, ...frequentSettings },
      },
      recentStorage,
      lib, // my own library
    );
    console.log("lib", iconLibrary);

    const indexSearch = EmojiFloatingIndexSearch.getInstance(iconLibrary);
    return [iconLibrary, indexSearch] as const;
  }, []);

  const [color, setColor] = useState<string>(COLOR.default);
  const [state, dispatch] = EmojiPickerState();
  const refs = useRef({
    content: createRef<HTMLDivElement>(),
    contentRoot: createRef<HTMLDivElement>(),
  });

  const setFocusedAndVisibleSections =
    useCallback<SetFocusedAndVisibleSectionsType>(
      (visibleCategories, categoryId) =>
        dispatch({
          payload: {
            focusedCategory: categoryId,
            visibleCategories,
          },
          type: "SET_FOCUSED_AND_VISIBLE_CATEGORIES",
        }),
      [dispatch],
    );

  const setSearch = useCallback(
    (input: string) => {
      const value = input.trim().replaceAll(/\s/g, ""); // Normalize input
      if (!value) {
        dispatch({ type: "CLEAR_SEARCH" }); // Clear search if input is empty
        return;
      }

      const hasFound = indexSearch.search(value).hasFound();
      dispatch({
        payload: {
          hasFound,
          searchResult: indexSearch.get(),
          searchValue: value,
        },
        type: "UPDATE_SEARCH_RESULT",
      });
    },
    [dispatch, indexSearch],
  );

  const clearSearch = useCallback(
    () => dispatch({ type: "CLEAR_SEARCH" }),
    [dispatch],
  );

  const selectEmoji = useCallback(
    (emoji: Emoji) => {
      console.log("select icon", emoji);
      onSelect(emoji.id, color);
      iconLibrary.updateFrequentCategory(emoji.id);
      dispatch({
        payload: { frequentEmoji: emoji.id, isOpen: true },
        type: "UPDATE_FREQUENT_EMOJIS",
      });
    },
    [color, dispatch, iconLibrary, onSelect],
  );

  const getRandomEmoji = useCallback(() => {
    const id = iconLibrary.getEmojiId(randomItem(iconLibrary.keys));
    console.log(id);
    onSelect(id, color);
  }, [color, iconLibrary, onSelect]);

  useEffect(() => {
    if (!state.isSearching) {
      // Timeout to allow the category element refs to populate
      setTimeout(() => {
        observeCategories({
          ancestorRef: refs.current.contentRoot,
          emojiLibrary: iconLibrary,
          setFocusedAndVisibleSections,
        });
      }, 0);
    }
  }, [iconLibrary, state.isSearching, setFocusedAndVisibleSections]);

  return {
    iconLibrary,
    refs,
    color,
    setColor,
    setSearch,
    clearSearch,
    selectEmoji,
    getRandomEmoji,
    state,
  };
}
