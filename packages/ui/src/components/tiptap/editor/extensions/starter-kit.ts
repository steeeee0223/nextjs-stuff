import { StarterKit } from "@tiptap/starter-kit";

export const extensions = [
  StarterKit.configure({
    blockquote: {
      HTMLAttributes: {
        class: "tiptap-blockquote",
      },
    },
    code: {
      HTMLAttributes: {
        class: "tiptap-code",
      },
    },
    codeBlock: {
      languageClassPrefix: "language-",
      HTMLAttributes: {
        class: "tiptap-code-block",
        spellcheck: false,
      },
    },
    heading: {
      levels: [1, 2, 3],
      HTMLAttributes: {
        class: "tiptap-heading",
      },
    },
    // The Collaboration extension comes with its own history handling
    history: false,
    horizontalRule: {
      HTMLAttributes: {
        class: "tiptap-hr",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "tiptap-list-item",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "tiptap-ordered-list",
      },
    },
    paragraph: {
      HTMLAttributes: {
        class: "tiptap-paragraph",
      },
    },
  }),
  //   Highlight.configure({
  //     HTMLAttributes: {
  //       class: "tiptap-highlight",
  //     },
  //   }),
  //   Image.configure({
  //     HTMLAttributes: {
  //       class: "tiptap-image",
  //     },
  //   }),
  //   Link.configure({
  //     HTMLAttributes: {
  //       class: "tiptap-link",
  //     },
  //   }),
  //   Placeholder.configure({
  //     placeholder: "Start writing…",
  //     emptyEditorClass: "tiptap-empty",
  //   }),
  //   CustomTaskItem,
  //   TaskList.configure({
  //     HTMLAttributes: {
  //       class: "tiptap-task-list",
  //     },
  //   }),
  //   TextAlign.configure({
  //     types: ["heading", "paragraph"],
  //   }),
  //   Typography,
  //   Youtube.configure({
  //     modestBranding: true,
  //     HTMLAttributes: {
  //       class: "tiptap-youtube",
  //     },
  //   }),
  // Register the document with Tiptap
  //   Collaboration.configure({ document: doc }),
  // Attach provider and user info
  //   CollaborationCursor.configure({
  //     provider: provider,
  //     user: { name, color, picture },
  //   }),
];
