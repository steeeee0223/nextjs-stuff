"use client";

import { Draggable } from "@hello-pangea/dnd";

import { cn } from "@swy/ui/lib";
import { buttonVariants } from "@swy/ui/shadcn";

import type { KanbanItem as Item } from "./index.types";
import { KanbanItemOptions } from "./kanban-item-options";

interface KanbanItemProps {
  data: Item;
  index: number;
  onClick?: (item: Item) => void;
  onCopy?: (itemId: string) => void;
  onDelete?: (itemId: string) => void;
}

export const KanbanItem = ({
  data,
  index,
  onClick,
  onCopy,
  onDelete,
}: KanbanItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
        <div
          role="button"
          ref={innerRef}
          onClick={() => onClick?.(data)}
          {...dragHandleProps}
          {...draggableProps}
          className={cn(
            buttonVariants({ variant: "item", size: "sm" }),
            "group truncate border border-border-button shadow-sm",
          )}
        >
          <div className="flex-1">{data.title}</div>
          <KanbanItemOptions
            itemId={data.id}
            onCopy={onCopy}
            onDelete={onDelete}
          />
        </div>
      )}
    </Draggable>
  );
};
