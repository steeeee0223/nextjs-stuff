"use client";

import { useRef } from "react";
import { MoreHorizontal, X } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface KanbanItemOptionsProps {
  itemId: string;
  onCopy?: (itemId: string) => void;
  onDelete?: (itemId: string) => void;
}

export const KanbanItemOptions = ({
  itemId,
  onCopy,
  onDelete,
}: KanbanItemOptionsProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleCopy = () => {
    onCopy?.(itemId);
    closeRef.current?.click();
  };
  const handleDelete = () => {
    onDelete?.(itemId);
    closeRef.current?.click();
  };

  const buttonProps: ButtonProps = {
    className:
      "rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm",
    variant: "ghost",
  };

  return (
    <Popover>
      <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button
          className="h-auto w-auto p-2 text-muted-foreground opacity-0 group-hover:opacity-100"
          size="sm"
          variant="ghost"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 pb-3 pt-3"
        side="bottom"
        align="start"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pb-4 text-center text-sm font-medium text-muted-foreground">
          Item actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className={cn(
              "h-auto w-auto",
              "absolute right-2 top-2 p-2 text-muted-foreground",
            )}
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button onClick={handleCopy} {...buttonProps}>
          Copy item
        </Button>
        <Separator />
        <Button onClick={handleDelete} {...buttonProps}>
          Delete this item
        </Button>
      </PopoverContent>
    </Popover>
  );
};
