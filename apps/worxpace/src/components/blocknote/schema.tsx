import {
  BlockNoteSchema,
  defaultBlockSpecs,
  insertOrUpdateBlock,
} from "@blocknote/core";
import { Construction, QuoteIcon } from "lucide-react";

import { Callout } from "./callout";
import { Quote } from "./quote";

// Our schema with block specs, which contain the configs and implementations for blocks
// that we want our editor to use.
export const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the custom blocks.
    callout: Callout,
    quote: Quote,
  },
});
export type CustomEditor = typeof schema.BlockNoteEditor;

/** Slash menu items */
// Slash menu item to insert an Callout block
export const insertCallout = (editor: CustomEditor) => ({
  title: "Callout",
  onItemClick: () =>
    insertOrUpdateBlock(editor, {
      type: "callout",
      props: { backgroundColor: "yellow" },
    }),
  aliases: ["callout", "notification", "emphasize"],
  group: "Other",
  icon: <Construction size={18} />,
  subtext: "Make writing stand out.",
});
export const insertQuote = (editor: CustomEditor) => ({
  title: "Quote",
  onItemClick: () =>
    insertOrUpdateBlock(editor, {
      type: "quote",
      props: { backgroundColor: "default", textColor: "default" },
    }),
  aliases: ["quote"],
  group: "Other",
  icon: <QuoteIcon size={18} />,
  subtext: "Capture a quote.",
});
// export const insertPage = (editor: CustomEditor, parentId: string) => ({
//   title: "Page",
//   onItemClick: async () => {
//     const { id, title } = await createDocument("page", {
//       arg: { title: "Untitled", type: "document", parentId },
//     });
//     insertOrUpdateBlock(editor, {
//       type: "page",
//       props: { title, pageId: id },
//     });
//   },
//   aliases: ["page", "new"],
//   group: "Other",
//   icon: <FileText size={18} />,
//   subtext: "Embed a sub-page inside this page.",
// });
