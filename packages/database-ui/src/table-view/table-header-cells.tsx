import "./view.css";

import React from "react";

import { cn } from "@swy/ui/lib";
import { Hint } from "@swy/ui/shared";

import * as Icon from "./icons";

interface TableHeaderCellProps {
  type: "title" | "text" | "checkbox";
  title: string;
  icon: React.ReactNode;
  width?: string;
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  title,
  icon,
  width,
}) => {
  return (
    <div className="flex cursor-grab flex-row">
      <div className="relative flex">
        <div
          // key="notion-table-view-header-cell"
          className="flex shrink-0 overflow-hidden p-0 text-sm"
          style={{ width }}
        >
          <Hint asChild description={title} side="right">
            <div
              role="button"
              tabIndex={0}
              className="transition-background-in flex h-full w-full cursor-pointer select-none items-center px-2 hover:bg-primary/5"
            >
              <div className="flex min-w-0 flex-auto items-center text-sm/[1.2]">
                <div className="mr-1 grid items-center justify-center">
                  <div className="col-start-1 row-start-1 opacity-100 transition-opacity duration-150">
                    {icon}
                  </div>
                  {/* Use this to sort columns */}
                  <DragHandle />
                </div>
                <div className="truncate">{title}</div>
              </div>
            </div>
          </Hint>
        </div>
        {/* Resize handle */}
        <div className="absolute right-0 z-10 w-0 grow-0">
          <div className="transition-background-out -ml-[3px] -mt-[1px] h-[34px] w-[5px] cursor-col-resize bg-blue/0 hover:bg-blue/80" />
        </div>
      </div>
    </div>
  );
};

const DragHandle = () => {
  return (
    <div className="col-start-1 row-start-1 opacity-0 transition-opacity duration-150">
      <div className="transition-background-in flex h-6 w-[18px] shrink-0 items-center justify-center">
        <Icon.DragHandle className="block size-3 shrink-0 fill-[#91918e]" />
      </div>
    </div>
  );
};

interface ActionCellProps {
  className?: string;
  icon: React.ReactNode;
}

export const ActionCell: React.FC<ActionCellProps> = ({ className, icon }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      // key="notion-table-view-add-column"
      className={cn(
        "flex w-8 cursor-pointer select-none justify-start opacity-100 transition-opacity duration-200 hover:bg-primary/5",
        className,
      )}
    >
      <div className="flex h-full w-8 items-center justify-center">{icon}</div>
    </div>
  );
};
