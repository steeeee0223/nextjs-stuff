"use client";

import { useScrollTop } from "@acme/ui/hooks";
import { cn } from "@acme/ui/lib";
import { ThemeToggle } from "@acme/ui/shadcn";

import Logo from "./logo";

export default function Navbar() {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "fixed top-0 z-50 flex w-full items-center bg-main p-6",
        scrolled && "border-b shadow-sm",
      )}
    >
      <Logo />
      <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
        <ThemeToggle />
      </div>
    </div>
  );
}
