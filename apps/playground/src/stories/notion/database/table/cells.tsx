import React from "react";
import { SortDirection } from "@tanstack/react-table";

import { Icon } from "@swy/notion";
import { cn } from "@swy/ui/lib";
import { Button } from "@swy/ui/shadcn";

interface HeaderProps {
  title: string;
  icon: React.ReactNode;
  className?: string;
}

/**
 * Extended version
 * @see people
 */
export const Header: React.FC<HeaderProps> = ({
  title,
  icon,
  className,
}: HeaderProps) => {
  return (
    <div
      className={cn(
        "truncate text-xs font-normal text-secondary dark:text-secondary-dark",
        className,
      )}
    >
      <div className="mr-1.5 flex-shrink-0">{icon}</div>
      {title}
    </div>
  );
};

interface SortingToggleProps {
  title: string;
  icon: React.ReactNode;
  isSorted: false | SortDirection;
  toggle: () => void;
}

export const SortingToggle: React.FC<SortingToggleProps> = ({
  title,
  icon,
  isSorted,
  toggle,
}) => (
  <Button variant="hint" size="xs" onClick={toggle} className="px-1">
    <Header
      title={title}
      icon={icon}
      className="inline-flex items-center justify-center text-sm/[1.2]"
    />
    {isSorted &&
      (isSorted === "asc" ? (
        <Icon.ArrowUp className="ml-1 size-3 flex-shrink-0 fill-primary/65" />
      ) : (
        <Icon.ArrowDown className="ml-1 size-3 flex-shrink-0 fill-primary/65" />
      ))}
  </Button>
);
