"use client";

import React, { useRef } from "react";

import { Input, Popover, PopoverContent } from "@swy/ui/shadcn";
import { useModal } from "@swy/ui/shared";

import { CellDataType } from "../table-view";

import "./view.css";

type CellActionPopoverProps = CellDataType & {
  position: {
    top: number;
    left: number;
  };
};

export const CellActionPopover: React.FC<CellActionPopoverProps> = ({
  position,
  ...props
}) => {
  const { isOpen, setClose } = useModal();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Popover open={isOpen} onOpenChange={setClose} modal>
      {/* TODO this is a workaround solution */}
      {/* See https://github.com/radix-ui/primitives/issues/2908 */}
      <div
        id="popover-popper-container"
        ref={containerRef}
        className="fixed radix-popper-wrapper:!relative radix-popper-wrapper:!transform-none"
        style={{ ...position }}
      >
        {renderContent({ containerRef, ...props })}
      </div>
    </Popover>
  );
};

type RenderContentProps = CellDataType & {
  containerRef: React.RefObject<HTMLDivElement>;
};

function renderContent({ containerRef, ...data }: RenderContentProps) {
  switch (data.type) {
    case "title":
    case "text":
      return (
        <PopoverContent
          container={containerRef.current}
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-[773px] min-h-[34px] w-[240px] flex-col overflow-visible backdrop-filter-none"
        >
          <Input
            spellCheck
            value={data.value}
            className="word-break max-h-[771px] min-h-8 whitespace-pre-wrap border-none bg-transparent caret-primary"
          />
          {/* <div className="flex flex-col overflow-y-auto grow h-full px-2 py-1.5 min-h-[34px] justify-between text-sm font-medium">
              <div spellCheck contentEditable data-content-editable-leaf className="w-full max-w-full whitespace-pre-wrap word-break caret-primary">{value}</div>
            </div> */}
        </PopoverContent>
      );
    default:
      return null;
  }
}
