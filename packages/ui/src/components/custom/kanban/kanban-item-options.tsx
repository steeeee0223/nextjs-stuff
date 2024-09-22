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
    className: "rounded-none w-full h-auto p-2 px-5 justify-start",
    variant: "hint",
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="size-auto p-2"
          size="sm"
          variant="hint"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="py-3"
        side="bottom"
        align="start"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pb-4 text-center text-sm font-medium">Item actions</div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute right-2 top-2 size-auto p-2"
            variant="nav"
          >
            <X className="size-4" />
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
