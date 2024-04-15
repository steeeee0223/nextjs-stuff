"use client";

import { ForwardedRef, forwardRef } from "react";
import { MenuIcon } from "lucide-react";

import { cn } from "@acme/ui/lib";

import { theme } from "~/constants/theme";
import { usePage } from "~/hooks";
import Banner from "./banner";
import History from "./history";
import Menu from "./menu";
import Participants from "./participants";
import Publish from "./publish";
import Title from "./title";

interface NavbarProps {
  pageId: string | null;
  isResetting: boolean;
  isMobile: boolean;
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const Navbar = forwardRef(function Navbar(
  { pageId, isCollapsed, isResetting, isMobile, onResetWidth }: NavbarProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { page, isLoading } = usePage(pageId, false);

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
        {pageId && isLoading && <Title.Skeleton />}
        {page && (
          <div className={cn(theme.flex.center, "w-full justify-between")}>
            <Title page={page} />
            <div className={theme.flex.gap1}>
              <Participants />
              <Publish page={page} />
              <History pageId={page.id} />
              <Menu documentId={page.id} />
            </div>
          </div>
        )}
      </nav>
      {page?.isArchived && <Banner documentId={page.id} />}
    </div>
  );
});

export const NavbarSkeleton = () => {
  return (
    <nav
      className={cn(
        theme.bg.navbar,
        theme.flex.center,
        "w-full gap-x-4 px-3 py-2",
      )}
    >
      <Title.Skeleton />
    </nav>
  );
};

export default Navbar;
