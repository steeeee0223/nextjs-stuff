"use client";

import { useEffect, useMemo } from "react";
import { withYjs, YjsEditor } from "@slate-yjs/core";
import { createEditor, Editor, Transforms } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import * as Y from "yjs";

import styles from "./collab-editor.module.css";

const emptyNode = {
  children: [{ text: "" }],
};

export function SlateEditor({ sharedType }: { sharedType: Y.XmlText }) {
  const editor = useMemo(() => {
    const e = withReact(withYjs(createEditor(), sharedType));

    // Ensure editor always has at least 1 valid child
    const { normalizeNode } = e;
    e.normalizeNode = (entry) => {
      const [node] = entry;

      if (!Editor.isEditor(node) || node.children.length > 0) {
        return normalizeNode(entry);
      }

      Transforms.insertNodes(editor, emptyNode, { at: [0] });
    };

    return e;
  }, [sharedType]);

  useEffect(() => {
    YjsEditor.connect(editor);
    return () => YjsEditor.disconnect(editor);
  }, [editor]);

  return (
    <div className={styles.container}>
      <div className={styles.editorContainer}>
        <Slate editor={editor} initialValue={[emptyNode]}>
          <Editable
            className={styles.editor}
            placeholder="Start typing here…"
          />
        </Slate>
      </div>
    </div>
  );
}
