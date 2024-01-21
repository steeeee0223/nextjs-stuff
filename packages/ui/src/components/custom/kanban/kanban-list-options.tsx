"use client";

import { useRef } from "react";
import { MoreHorizontal, X } from "lucide-react";

import type { ButtonProps } from "@/components/ui";
import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "@/components/ui";
import { cn } from "@/lib/utils";

interface KanbanListOptionsProps {
  listId: string;
  onAddItem?: () => void;
  onCopy?: (listId: string) => void;
  onDelete?: (listId: string) => void;
}

export const KanbanListOptions = ({
  listId,
  onAddItem,
  onCopy,
  onDelete,
}: KanbanListOptionsProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleAddItem = () => onAddItem?.();
  const handleCopy = () => {
    onCopy?.(listId);
    closeRef.current?.click();
  };
  const handleDelete = () => {
    onDelete?.(listId);
    closeRef.current?.click();
  };

  const buttonProps: ButtonProps = {
    className:
      "rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm",
    variant: "ghost",
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-auto w-auto p-2 text-muted-foreground"
          variant="ghost"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pb-3 pt-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium text-muted-foreground">
          List actions
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
        <Button onClick={handleAddItem} {...buttonProps}>
          Add card...
        </Button>
        <Button onClick={handleCopy} {...buttonProps}>
          Copy list
        </Button>
        <Separator />
        <Button onClick={handleDelete} {...buttonProps}>
          Delete this list
        </Button>
      </PopoverContent>
    </Popover>
  );
};
