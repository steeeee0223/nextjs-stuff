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
    className: "rounded-none w-full h-auto p-2 px-5 justify-start",
    variant: "hint",
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="hint">
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="py-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium">List actions</div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2"
            variant="nav"
          >
            <X className="size-4" />
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
