"use client";

import { ForwardedRef, forwardRef } from "react";
import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { useTree } from "@acme/ui/components";
import { cn } from "@acme/ui/lib";

import { theme } from "~/constants/theme";
import Banner from "./banner";
import Menu from "./menu";
import Participants from "./participants";
import Publish from "./publish";
import Title from "./title";

interface NavbarProps {
  isResetting: boolean;
  isMobile: boolean;
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const Navbar = forwardRef(function Navbar(
  { isCollapsed, isResetting, isMobile, onResetWidth }: NavbarProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const params = useParams();
  const { treeItems, isLoading } = useTree();
  const document = treeItems.find(({ id, group }) => {
    if (group?.endsWith("document")) return params.documentId === id;
    if (group?.endsWith("kanban")) return params.boardId === id;
    if (group?.endsWith("whiteboard")) return params.whiteboardId === id;
    return false;
  });

  return (
    <div
      ref={ref}
      className={cn(
        "absolute left-60 top-0 z-[99999] w-[calc(100%-240px)]",
        isResetting && "transition-all duration-300 ease-in-out",
        isMobile && "left-0 w-full",
      )}
    >
      <nav
        className={cn(
          theme.bg.navbar,
          theme.flex.center,
          "w-full gap-x-4 px-3 py-2",
        )}
      >
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        {!document || isLoading ? (
          <Title.Skeleton />
        ) : (
          <div className={cn(theme.flex.center, "w-full justify-between")}>
            <Title initialData={document} />
            <div className={theme.flex.gap2}>
              <Participants />
              <Publish documentId={document.id} />
              <Menu documentId={document.id} />
            </div>
          </div>
        )}
      </nav>
      {document?.group?.startsWith("trash") && (
        <Banner documentId={document.id} />
      )}
    </div>
  );
});

export default Navbar;
