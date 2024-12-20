/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import { TableRowCell } from "./table-row-cells";
import { Property } from "./types";

interface TableRowProps {
  blockId: string;
  rowId: number;
  data: {
    colId: number;
    type: Property;
    value?: string;
    width?: string;
  }[];
}

export const TableRow: React.FC<TableRowProps> = ({ blockId, rowId, data }) => {
  return (
    <div
      data-block-id={blockId}
      // key="notion-selectable notion-page-block notion-collection-item"
      className="h-[calc(100% + 2px)] group/row flex"
    >
      <div
        // key="notion-table-view-row"
        dir="ltr"
        className="flex w-full border-b border-b-border-cell"
      >
        <div className="flex">
          {/* Hover checkbox */}
          <div className="sticky left-[calc(32px-1*var(--sticky-horizontal-offset))] z-[850] flex">
            <div className="absolute -left-8">
              <div className="ease h-full border-b-border-cell opacity-0 transition-opacity delay-0 duration-200 group-hover/row:opacity-60 group-hover/row:hover:opacity-100">
                <div className="h-full">
                  <label className="ease z-[10] flex h-full cursor-pointer items-start justify-center opacity-0 transition-opacity delay-0 duration-200 group-hover/row:opacity-60 group-hover/row:hover:opacity-100">
                    <div className="flex h-[31px] w-8 items-center justify-center">
                      <input
                        type="checkbox"
                        className="relative right-0.5 size-[14px] cursor-pointer accent-blue"
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {data.map((cellData) => (
            <TableRowCell key={cellData.colId} rowId={rowId} {...cellData} />
          ))}
        </div>
      </div>

      <div className="flex w-[64px] grow justify-start border-b border-b-border-cell" />
    </div>
  );
};
