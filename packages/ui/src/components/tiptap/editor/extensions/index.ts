import { Blockquote } from "@tiptap/extension-blockquote";
import { Bold } from "@tiptap/extension-bold";
import { BulletList } from "@tiptap/extension-bullet-list";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { Gapcursor } from "@tiptap/extension-gapcursor";
import { HardBreak } from "@tiptap/extension-hard-break";
import { Heading } from "@tiptap/extension-heading";
import { History } from "@tiptap/extension-history";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Italic } from "@tiptap/extension-italic";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Strike } from "@tiptap/extension-strike";
import { Text } from "@tiptap/extension-text";
import { Underline } from "@tiptap/extension-underline";
import type { Extensions } from "@tiptap/react";

export const getExtensions = () =>
  [
    /** Necessary */
    //   Document,
    //   DBlock,
    Text,
    Paragraph, // to be updated
    Dropcursor.configure({
      width: 2,
      class: "notion-dropcursor",
      color: "skyblue",
    }),
    Gapcursor,
    History,
    HardBreak,
    /** Mark */
    Bold,
    Italic,
    Strike,
    Underline,
    //   Code,
    // Link.configure({
    //   autolink: true,
    //   linkOnPaste: true,
    //   protocols: ["mailto"],
    //   openOnClick: true,
    //   onModKPressed: openLinkModal,
    // }),
    /** Node */
    Heading.configure({ levels: [1, 2, 3] }),
    ListItem,
    BulletList,
    OrderedList,
    //   TaskList,
    //   TaskItem.configure({
    //     nested: true,
    //   }),
    //   TrailingNode,
    Blockquote,
    HorizontalRule,
  ] as Extensions;
