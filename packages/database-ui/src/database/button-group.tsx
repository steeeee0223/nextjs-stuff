import React from "react";
import {
  ArrowUpDown,
  ChevronDown,
  Ellipsis,
  ListFilter,
  Maximize2,
  Search,
  Zap,
} from "lucide-react";

import { cn } from "@swy/ui/lib";
import { Button } from "@swy/ui/shadcn";

const styles = {
  icon: "flex-shrink-0 size-4 text-primary/45 dark:text-primary/45",
};

export const ButtonGroup: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div className={cn("flex items-center justify-end gap-0.5", className)}>
      <Button variant="nav" size="icon-md" className="p-1.5">
        <ListFilter className={styles.icon} />
      </Button>
      <Button variant="nav" size="icon-md" className="p-1.5">
        <ArrowUpDown className={styles.icon} />
      </Button>
      <Button variant="nav" size="icon-md" className="p-1.5">
        <Zap className={styles.icon} />
      </Button>
      <Button variant="nav" size="icon-md" className="p-1.5">
        <Search className={styles.icon} />
      </Button>
      <Button variant="nav" size="icon-md" className="p-1.5">
        <Maximize2 className={cn(styles.icon, "rotate-90")} />
      </Button>
      <Button variant="nav" size="icon-md" className="p-1.5">
        <Ellipsis className={styles.icon} />
      </Button>
      <Button variant="blue" size="sm" className="h-7 px-2">
        New
        <ChevronDown className="ml-1 size-4" />
      </Button>
    </div>
  );
};
