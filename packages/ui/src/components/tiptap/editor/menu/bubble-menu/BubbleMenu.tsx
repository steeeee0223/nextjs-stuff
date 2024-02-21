/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import React, { useMemo } from "react";
import { BubbleMenu, Editor } from "@tiptap/react";
import { ArrowUpRight, AtSign, MessageSquareText } from "lucide-react";

import { generalButtons } from "./buttons";

// import { ColorTypeDropDown } from "./ColorTypeDropDown";
// import { NodeTypeDropDown } from "./NodeTypeDropDown";

/** Styles */
const styles = {
  bubble_menu_button: "py-1.5 px-2 cursor-pointer text-sm",
  bubble_menu:
    "bg-secondary shadow-lg w-[460px] py-0 px-3 flex items-center justify-center rounded box-border z-[9999] text-sm",
  drop_down: "cursor-pointer",
  divider: "h-6 border-l border-solid border-primary/5",
  icon: "pr-1",
  filler_button: "cursor-not-allowed flex h-max py-1.5 px-2",
};

interface CustomBubbleMenuProps {
  editor: Editor;
}

export const CustomBubbleMenu: React.FC<CustomBubbleMenuProps> = React.memo(
  function CustomBubbleMenu({ editor }) {
    const memoizedButtons = useMemo(() => {
      return generalButtons.map((btn) => (
        <div
          className={styles.bubble_menu_button}
          onClick={() => btn.action(editor)}
          key={btn.tooltip}
        >
          {btn.iconDetail[0]}
          {/* <div className={`${styles[btn.iconDetail[1]]}`}>
            {btn.iconDetail[0]}
          </div> */}
        </div>
      ));
    }, [editor]);

    return (
      <BubbleMenu
        editor={editor}
        className={styles.bubble_menu}
        tippyOptions={{
          duration: 200,
          animation: "shift-toward-subtle",
          moveTransition: "transform 0.2s ease-in-out",
        }}
      >
        <div className={styles.drop_down}>
          Node Type Dropdown
          {/* <NodeTypeDropDown editor={editor} /> */}
        </div>
        <div className={styles.divider}> </div>
        <div className={styles.filler_button}>
          <ArrowUpRight className={styles.icon} />
          Link
        </div>
        <div className={styles.divider}> </div>
        <div className={styles.filler_button}>
          <MessageSquareText className={styles.icon} />
          Comment
        </div>
        <div className={styles.divider}> </div>
        {memoizedButtons}
        <div className={styles.divider}> </div>
        <div className={styles.drop_down}>
          Color Type Dropdown
          {/* <ColorTypeDropDown editor={editor} /> */}
        </div>
        <div className={styles.divider}> </div>
        <div className={styles.filler_button}>
          <AtSign className={styles.icon} />
        </div>
      </BubbleMenu>
    );
  },
);
