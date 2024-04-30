import {
  BlockNoteSchema,
  defaultBlockSpecs,
  insertOrUpdateBlock,
} from "@blocknote/core";
import { Construction } from "lucide-react";

import { Callout } from "./callout";

// Our schema with block specs, which contain the configs and implementations for blocks
// that we want our editor to use.
export const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the Callout block.
    callout: Callout,
  },
});
export type CustomEditor = typeof schema.BlockNoteEditor;

// Slash menu item to insert an Callout block
export const insertCallout = (editor: CustomEditor) => ({
  title: "Callout",
  onItemClick: () => insertOrUpdateBlock(editor, { type: "callout" }),
  aliases: ["callout", "notification", "emphasize"],
  group: "Other",
  icon: <Construction size={18} />,
  subtext: "Make writing stand out.",
});
