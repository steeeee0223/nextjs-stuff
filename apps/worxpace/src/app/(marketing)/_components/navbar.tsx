"use client";

import { ThemeToggle } from "@acme/ui/components";
import { useScrollTop } from "@acme/ui/hooks";
import { cn } from "@acme/ui/lib";

import { theme } from "~/constants/theme";
import Logo from "./logo";

export default function Navbar() {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        theme.background.navbar,
        theme.flex.center,
        "fixed top-0 z-50 w-full p-6",
        scrolled && "border-b shadow-sm",
      )}
    >
      <Logo />
      <div
        className={cn(
          theme.flex.gap2,
          "w-full justify-between md:ml-auto md:justify-end",
        )}
      >
        <ThemeToggle />
      </div>
    </div>
  );
}
