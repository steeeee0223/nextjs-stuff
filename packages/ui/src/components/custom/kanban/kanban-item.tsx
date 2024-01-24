"use client";

import { Draggable } from "@hello-pangea/dnd";

import { cn } from "@/lib";
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
            "truncate rounded-md border-2 border-transparent bg-white shadow-sm hover:border-black",
            "group flex items-center",
          )}
        >
          <div className="flex-1 px-3 text-sm text-neutral-700">
            {data.title}
          </div>
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
