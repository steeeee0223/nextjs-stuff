import { filterSuggestionItems } from "@blocknote/core";

import "@blocknote/core/fonts/inter.css";

import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from "@blocknote/react";

import { insertCallout, type CustomEditor } from "./schema";

interface CustomSlashMenuProps {
  editor: CustomEditor;
}

export const CustomSlashMenu = ({ editor }: CustomSlashMenuProps) => {
  return (
    <SuggestionMenuController
      triggerCharacter={"/"}
      getItems={async (query) =>
        // Gets all default slash menu items and `insertCallout` item.
        filterSuggestionItems(
          [...getDefaultReactSlashMenuItems(editor), insertCallout(editor)],
          query,
        )
      }
    />
  );
};
