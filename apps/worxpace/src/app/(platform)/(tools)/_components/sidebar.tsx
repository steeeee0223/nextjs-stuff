/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
"use client";

import { forwardRef, type ForwardedRef, type MouseEventHandler } from "react";
import { ChevronsLeft } from "lucide-react";

import { cn } from "@acme/ui/lib";

import { theme } from "~/constants/theme";
import DocList from "./doc-list";

interface SidebarProps {
  isResetting: boolean;
  isMobile: boolean;
  handleMouseDown: MouseEventHandler<HTMLDivElement>;
  resetWidth: () => void;
  collapse: () => void;
}

export const Sidebar = forwardRef(function Sidebar(
  {
    isResetting,
    isMobile,
    handleMouseDown,
    resetWidth,
    collapse,
  }: SidebarProps,
  ref: ForwardedRef<HTMLElement>,
) {
  return (
    <>
      <aside
        ref={ref}
        className={cn(
          "group/sidebar relative z-[99999] flex h-full w-60 flex-col overflow-y-auto bg-secondary",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "w-0",
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            theme.bg.hover,
            "absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition group-hover/sidebar:opacity-100",
            isMobile && "opacity-100",
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <DocList isMobile={isMobile} />
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
        />
      </aside>
    </>
  );
});
