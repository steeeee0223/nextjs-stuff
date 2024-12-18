import React from "react";

import * as Icon from "./icons";

import "./view.css";

import { Property } from "./types";

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
  return (
    <div
      key="notion-table-view-cell"
      data-row-index={rowId}
      data-col-index={colId}
      className="relative flex h-full border-r border-r-border-cell"
      style={{ width }}
    >
      <div className="flex h-full overflow-x-clip" style={{ width }}>
        <div
          role="button"
          tabIndex={0}
          data-testid="property-value"
          className="transition-background-in relative block min-h-8 w-full cursor-pointer select-none overflow-clip whitespace-normal px-2 py-[5px] text-sm"
        >
          <DataCell type={type} value={value} />
        </div>
      </div>

      <div className="box-shadow: rgba(35, 131, 226, 0.57) 0px 0px 0px 2px inset, rgba(35, 131, 226, 0.35) 0px 0px 0px 1px inset; pointer-events-none absolute left-0 top-0 z-[840] h-full w-full rounded-[3px] bg-blue/5"></div>
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
        <span className="word-break background-image: linear-gradient(to right, rgba(55, 53, 47, 0.16) 0%, rgba(55, 53, 47, 0.16) 100%); background-repeat: repeat-x; background-position: 0px 100%; background-size: 100% 1px; mr-[5px] inline whitespace-pre-wrap font-medium leading-[1.5]">
          {value}
        </span>
      );
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
            className="flex-shrink: 0; flex-grow: 0; align-items: center; justify-content: center; transition-background-out border-radius: 3px; --pseudoHover--background: rgba(55,53,47,.06); --pseudoActive--background: rgba(55,53,47,.16); relative flex h-[16px] w-[16px]"
          >
            <div aria-hidden="true">
              <Icon.RoundedSquareCheckbox />
            </div>
            <input
              type="checkbox"
              className="opacity: 0; cursor: pointer; absolute left-0 top-0 h-[16px] w-[16px]"
            />
          </div>
        </div>
      );
    default:
      return null;
  }
};
