"use client";

import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { useTree } from "@acme/ui/components";
import { cn } from "@acme/ui/lib";

import { theme } from "~/constants/theme";
import Title from "./title";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();
  const { treeItems } = useTree();
  const document = treeItems.find(({ id }) => params.documentId === id);

  if (document === undefined) {
    return (
      <nav
        className={cn(theme.bg.navbar, theme.flex.center, "w-full px-3 py-2")}
      >
        <Title.Skeleton />
      </nav>
    );
  }
  if (document === null) return null;
  return (
    <>
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
        <div className={cn(theme.flex.center, "w-full justify-between")}>
          <Title initialData={document} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
