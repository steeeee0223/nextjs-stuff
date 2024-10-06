"use client";

import React, { useRef } from "react";
import { cn } from "@udecode/cn";
import { Plate } from "@udecode/plate-common/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { CommentsPopover } from "./components/plate-ui/comments-popover";
import { CursorOverlay } from "./components/plate-ui/cursor-overlay";
import { Editor } from "./components/plate-ui/editor";
import { FixedToolbar } from "./components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "./components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "./components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "./components/plate-ui/floating-toolbar-buttons";
import { TooltipProvider } from "./components/plate-ui/tooltip";
import { useMyEditor } from "./use-my-editor";

import "./styles/globals.css";

export function PlateEditor() {
  const containerRef = useRef(null);

  const editor = useMyEditor();

  return (
    <TooltipProvider
      disableHoverableContent
      delayDuration={500}
      skipDelayDuration={0}
    >
      <DndProvider backend={HTML5Backend}>
        <Plate editor={editor}>
          <div
            ref={containerRef}
            className={cn(
              "relative",
              // Block selection
              "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4",
            )}
          >
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor
              className="px-[96px] py-16"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              focusRing={false}
              variant="ghost"
              size="md"
            />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>

            <CommentsPopover />

            <CursorOverlay containerRef={containerRef} />
          </div>
        </Plate>
      </DndProvider>
    </TooltipProvider>
  );
}
