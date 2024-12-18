import "./view.css";

import React from "react";

import { cn } from "@swy/ui/lib";

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
          <div
            role="button"
            tabIndex={0}
            className="transition-background flex h-full w-full cursor-pointer select-none items-center px-2"
          >
            <div className="flex min-w-0 flex-auto items-center text-sm/[1.2]">
              <div className="mr-1 grid items-center justify-center">
                <div className="col-start-1 row-start-1 opacity-100 transition-opacity duration-150">
                  {icon}
                </div>
                <DragHandle />
              </div>
              <div className="truncate">{title}</div>
            </div>
          </div>
        </div>

        <div className="absolute right-0 z-10 w-0 grow-0">
          <div className="transition-background -ml-1.5 -mt-0.5 h-[34px] w-[5px] cursor-col-resize bg-blue/80" />
        </div>
      </div>
    </div>
  );
};

const DragHandle = () => {
  return (
    <div className="col-start-1 row-start-1 opacity-0 transition-opacity duration-150">
      <div className="transition-background flex h-6 w-[18px] shrink-0 items-center justify-center">
        <Icon.DragHandle />
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
        "flex w-8 cursor-pointer select-none justify-start opacity-100 transition-opacity duration-200",
        className,
      )}
    >
      <div className="flex h-full w-8 items-center justify-center">{icon}</div>
    </div>
  );
};
