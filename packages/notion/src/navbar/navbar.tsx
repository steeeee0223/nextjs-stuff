"use client";

import { forwardRef } from "react";
import { MenuIcon } from "lucide-react";

import { cn } from "@swy/ui/lib";
import { Button } from "@swy/ui/shadcn";
import { Hint } from "@swy/ui/shared";

import { usePage } from "../page-provider";
import {
  Banner,
  History,
  Menu,
  Participants,
  Publish,
  Title,
} from "./_components";

const styles = {
  nav: "flex items-center bg-main h-12 w-full gap-x-4 px-3 py-2",
};

export interface NavbarProps {
  className?: string;
  isCollapsed?: boolean;
  onResetWidth?: () => void;
}

export const Navbar = forwardRef<HTMLDivElement, NavbarProps>(function Navbar(
  { className, isCollapsed, onResetWidth },
  ref,
) {
  const { page, isLoading, fetchLogs, onUpdate, onChangeState } = usePage();

  return (
    <div ref={ref} className={className}>
      <nav className={styles.nav}>
        {isCollapsed && (
          <Hint asChild description="Open sidebar" side="right">
            <Button
              variant="hint"
              onClick={onResetWidth}
              className="size-6 p-0 transition"
            >
              <MenuIcon className="size-4" />
            </Button>
          </Hint>
        )}
        {isLoading ? (
          <Title.Skeleton />
        ) : page ? (
          <div className="flex w-full items-center justify-between gap-6">
            <Title
              page={page}
              onUpdate={(id, title) => onUpdate?.(id, { title })}
            />
            <div className="z-30 flex items-center gap-x-1">
              <Participants />
              <Publish page={page} />
              <History pageId={page.id} fetchLogs={fetchLogs} />
              <Menu page={page} onChangeState={onChangeState} />
            </div>
          </div>
        ) : null}
      </nav>
      {page?.isArchived && (
        <Banner pageId={page.id} onChangeState={onChangeState} />
      )}
    </div>
  );
});

export const NavbarSkeleton = () => {
  return (
    <nav className={cn(styles.nav, "z-20")}>
      <Title.Skeleton />
    </nav>
  );
};
