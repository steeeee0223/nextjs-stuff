"use client";

import { filterSuggestionItems } from "@blocknote/core";

import "@blocknote/core/fonts/inter.css";

import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from "@blocknote/react";

import { insertCallout, insertQuote, type CustomEditor } from "./schema";

interface CustomSlashMenuProps {
  editor: CustomEditor;
}

export const CustomSlashMenu = ({ editor }: CustomSlashMenuProps) => {
  return (
    <SuggestionMenuController
      triggerCharacter={"/"}
      getItems={(query) =>
        Promise.resolve(
          filterSuggestionItems(
            [
              ...getDefaultReactSlashMenuItems(editor),
              /** Customized items */
              insertCallout(editor),
              insertQuote(editor),
            ],
            query,
          ),
        )
      }
    />
  );
};
