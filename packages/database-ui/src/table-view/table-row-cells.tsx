"use client";

import React, { useState } from "react";

import * as Icon from "./icons";

import "./view.css";

import { Input, Popover, PopoverContent, PopoverTrigger } from "@swy/ui/shadcn";
import { Hint } from "@swy/ui/shared";

import { Property } from "./types";

enum CellMode {
  Normal = "normal",
  Edit = "edit",
  Select = "select",
}

interface TableRowCellProps {
  type: Property;
  rowId: number;
  colId: number;
  value?: string;
  width?: string;
}

export const TableRowCell: React.FC<TableRowCellProps> = ({
  type,
  rowId,
  colId,
  value,
  width,
}) => {
  const [mode, setMode] = useState<CellMode>(CellMode.Normal);
  const isTextType = type === "text" || type === "title";

  return (
    <div
      key="notion-table-view-cell"
      data-row-index={rowId}
      data-col-index={colId}
      className="relative flex h-full border-r border-r-border-cell"
      style={{ width }}
    >
      <div className="flex h-full overflow-x-clip" style={{ width }}>
        <TextInputPopover value={value ?? ""} open={mode === CellMode.Edit}>
          <div
            role="button"
            tabIndex={0}
            data-testid="property-value"
            className="transition-background-in relative block min-h-8 w-full cursor-pointer select-none overflow-clip whitespace-normal px-2 py-[5px] text-sm"
            // TODO
            onPointerDown={() =>
              setMode((prev) => {
                if (prev === CellMode.Normal) {
                  return isTextType ? CellMode.Edit : CellMode.Select;
                } else if (prev === CellMode.Edit) {
                  return CellMode.Select;
                } else {
                  return CellMode.Normal;
                }
              })
            }
          >
            <DataCell type={type} value={value} />
          </div>
        </TextInputPopover>
      </div>
      {mode === CellMode.Select && (
        <div className="shadow-cell pointer-events-none absolute left-0 top-0 z-[840] h-full w-full rounded-[3px] bg-blue/5" />
      )}
    </div>
  );
};

const DataCell: React.FC<Pick<TableRowCellProps, "type" | "value">> = ({
  type,
  value,
}) => {
  switch (type) {
    case "title":
      return (
        <>
          <div className="pointer-events-none absolute left-0 right-0 top-1 z-20 mx-1 my-0 hidden justify-end group-hover/row:flex">
            <div
              key="quickActionContainer"
              className="pointer-events-auto sticky right-1 flex"
            >
              <div>
                <Hint
                  asChild
                  description="Open in side peek"
                  side="top"
                  className="z-[9990]"
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Open in side peek"
                    className="transition-background-in cell-open inline-flex h-6 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-md bg-white fill-secondary px-1.5 text-xs/[1.2] font-medium uppercase tracking-[0.5px] text-secondary group-hover/row:hover:bg-[#EFEFEE] dark:fill-secondary-dark dark:text-secondary-dark"
                  >
                    <Icon.PeekModeSide className="mr-1.5 block size-[14px] shrink-0 fill-secondary text-secondary dark:fill-secondary-dark dark:text-secondary-dark" />
                    Open
                  </div>
                </Hint>
              </div>
            </div>
          </div>
          <span className="word-break title-cell-bg-img mr-[5px] inline whitespace-pre-wrap font-medium leading-[1.5]">
            {value}
          </span>
        </>
      );
    // return (
    //   // when not hovering
    //   <span className="word-break title-cell-bg-img mr-[5px] inline whitespace-pre-wrap font-medium leading-[1.5]">
    //     {value}
    //   </span>
    // );
    case "text":
      return (
        <div className="word-break whitespace-pre-wrap leading-[1.5]">
          <span>{value}</span>
        </div>
      );
    case "checkbox":
      return (
        <div className="max-w-full">
          <div
            key="pseudoHover pseudoActive"
            className="transition-background-out --pseudoHover--background: rgba(55,53,47,.06); --pseudoActive--background: rgba(55,53,47,.16); relative flex size-4 shrink-0 grow-0 items-center justify-center rounded-[3px]"
          >
            <div aria-hidden="true">
              <Icon.RoundedSquareCheckbox />
            </div>
            <input
              type="checkbox"
              className="absolute left-0 top-0 size-4 cursor-pointer opacity-0"
            />
          </div>
        </div>
      );
    default:
      return null;
  }
};

interface TextInputPopoverProps extends React.PropsWithChildren {
  open: boolean;
  value: string;
  onChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
}

const TextInputPopover: React.FC<TextInputPopoverProps> = ({
  children,
  value,
  open,
  onOpenChange,
}) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        side="top"
        sideOffset={-34}
        className="flex max-h-[773px] min-h-[34px] w-[240px] flex-col overflow-visible backdrop-filter-none"
      >
        <Input
          spellCheck
          value={value}
          className="word-break max-h-[771px] min-h-8 whitespace-pre-wrap border-none bg-transparent caret-primary"
        />
        {/* <div className="flex flex-col overflow-y-auto grow h-full px-2 py-1.5 min-h-[34px] justify-between text-sm font-medium">
        <div spellCheck contentEditable data-content-editable-leaf className="w-full max-w-full whitespace-pre-wrap word-break caret-primary">{value}</div>
      </div> */}
      </PopoverContent>
    </Popover>
  );
};
