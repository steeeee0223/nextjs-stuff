/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
"use client";

import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { ChevronsLeft, MenuIcon } from "lucide-react";

import { useNavControl } from "@acme/ui/hooks";
import { cn } from "@acme/ui/lib";

import { theme } from "~/constants/theme";
import DocList from "./doc-list";
import Navbar from "./navbar";

export const Sidebar = () => {
  const pathname = usePathname();
  const params = useParams();
  const {
    isMobile,
    sidebarRef,
    navbarRef,
    isResetting,
    isCollapsed,
    handleMouseDown,
    collapse,
    resetWidth,
  } = useNavControl();

  useEffect(() => {
    isMobile ? collapse() : resetWidth();
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) collapse();
  }, [pathname, isMobile]);

  return (
    <>
      <aside
        ref={sidebarRef}
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
      <div
        ref={navbarRef}
        className={cn(
          "absolute left-60 top-0 z-[99999] w-[calc(100%-240px)]",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "left-0 w-full",
        )}
      >
        {params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="w-full bg-transparent px-3 py-2">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};
