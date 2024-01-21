/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";

import { cn } from "@/lib/utils";
import type { KanbanItem as Item, KanbanList as List } from "./index.types";
import { useKanbanAction } from "./kanban-action-context";
import { useKanban } from "./kanban-context";
import { KanbanItem } from "./kanban-item";
import { KanbanItemForm } from "./kanban-item-form";
import { KanbanListHeader } from "./kanban-list-header";
import { KanbanListOptions } from "./kanban-list-options";

interface KanbanListProps {
  data: List;
  index: number;
}

export const KanbanList = ({ data, index }: KanbanListProps) => {
  const kanban = useKanban();
  const { dispatch } = useKanbanAction();
  /** Input */
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const disableEditing = () => setIsEditing(false);
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => textareaRef.current?.focus());
  };
  /** Kanban List Actions */
  const _onCopyList = (srcId: string) => {
    const destId = uuidv4();
    const list = kanban.getKanbanList(srcId)!;
    const payload = {
      id: destId,
      order: 1 + kanban.getMaxItemOrder(srcId),
      title: `${list.title} Copy`,
      items: list.items.map((item) => ({
        ...item,
        id: uuidv4(),
        listId: destId,
      })),
    };
    dispatch({ type: "add:list", payload });
    kanban.onCopyList?.(srcId, destId);
  };
  const _onUpdateListTitle = (list: Pick<List, "id" | "title">) => {
    const newList = { ...data, title: list.title };
    dispatch({ type: "update:list", payload: [newList] });
    kanban.onUpdateList?.(newList);
  };
  const _onDeleteList = (listId: string) => {
    dispatch({ type: "delete:list", payload: [listId] });
    kanban.onDeleteList?.(listId);
  };
  /** Kanban Item Actions */
  const _onCreateItem = (title: string) => {
    const payload: Item = {
      id: uuidv4(),
      listId: data.id,
      title,
      order: kanban.getMaxItemOrder(data.id) + 1,
    };
    dispatch({ type: "add:item", payload });
    kanban.onCreateItem?.(payload);
  };
  const _onCopyItem = (itemId: string) => {
    const src = kanban.getKanbanItem(data.id, itemId);
    if (!src) return;
    const dest: Item = {
      title: `${src.title} Copy`,
      listId: data.id,
      id: uuidv4(),
      order: kanban.getMaxItemOrder(data.id),
    };
    dispatch({ type: "add:item", payload: dest });
    kanban.onCopyItem?.(src, dest);
  };
  const _onDeleteItem = (itemId: string) => {
    const item = kanban.getKanbanItem(data.id, itemId);
    if (!item) return;
    dispatch({ type: "delete:item", payload: item });
    kanban.onDeleteItem?.(item);
  };
  const _onOpenItem = (item: Item) => {
    kanban.setActiveItem(item);
    kanban.onOpenItem?.(item);
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {({ draggableProps, innerRef, dragHandleProps }) => (
        <li
          ref={innerRef}
          {...draggableProps}
          className="h-full w-[272px] shrink-0 select-none"
        >
          <div
            {...dragHandleProps}
            className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md"
          >
            <div className="flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
              <KanbanListHeader
                title={data.title}
                listId={data.id}
                onUpdateTitle={_onUpdateListTitle}
              />
              <KanbanListOptions
                listId={data.id}
                onAddItem={enableEditing}
                onCopy={_onCopyList}
                onDelete={_onDeleteList}
              />
            </div>
            <Droppable droppableId={data.id} type="item">
              {({ innerRef, droppableProps, placeholder }) => (
                <ol
                  ref={innerRef}
                  {...droppableProps}
                  className={cn(
                    "mx-1 flex flex-col gap-y-2 px-1 py-0.5",
                    data.items.length > 0 ? "mt-2" : "mt-0",
                  )}
                >
                  {data.items.map((item, index) => (
                    <KanbanItem
                      index={index}
                      key={item.id}
                      data={item}
                      onClick={_onOpenItem}
                      onCopy={_onCopyItem}
                      onDelete={_onDeleteItem}
                    />
                  ))}
                  {placeholder}
                </ol>
              )}
            </Droppable>
            <KanbanItemForm
              ref={textareaRef}
              listId={data.id}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
              onCreateItem={_onCreateItem}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};
