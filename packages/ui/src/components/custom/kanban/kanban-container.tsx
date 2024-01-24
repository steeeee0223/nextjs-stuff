"use client";

import type { OnDragEndResponder } from "@hello-pangea/dnd";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { useKanbanAction } from "./kanban-action-context";
import { useKanban } from "./kanban-context";
import { KanbanList } from "./kanban-list";
import { KanbanListForm } from "./kanban-list-form";
import { reorder } from "./utils";

export const KanbanContainer = () => {
  const { kanbanLists, onUpdateItemOrder, onUpdateListOrder, onCreateList } =
    useKanban();
  const { dispatch } = useKanbanAction();

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination: dest, source: src, type } = result;
    if (!dest) return;
    /** If dropped in same position */
    if (dest.droppableId === src.droppableId && dest.index === src.index)
      return;
    /** User moves a list */
    if (type === "list") {
      console.log(`user moved a list`);
      const lists = reorder(kanbanLists, src.index, dest.index).map(
        (item, i) => ({ ...item, order: i }),
      );
      dispatch({ type: "update:list", payload: lists });
      /** Trigger server action */
      onUpdateListOrder?.(lists);
    }
    /** User moves an item */
    if (type === "item") {
      console.log(`user moved an item`);
      const newOrderedData = [...kanbanLists];
      /** Source & destination lists */
      const srcList = newOrderedData.find(({ id }) => src.droppableId === id);
      const destList = newOrderedData.find(({ id }) => dest.droppableId === id);
      if (!srcList || !destList) return;
      /** Check if items exists on the `srcList` */
      if (!srcList.items) srcList.items = [];
      /** Check if items exists on the `destList` */
      if (!destList.items) destList.items = [];
      /** Move the item in the same list */
      if (src.droppableId === dest.droppableId) {
        console.log(`user moved item in the same list`);
        const reorderedItems = reorder(srcList.items, src.index, dest.index);
        reorderedItems.forEach((item, i) => (item.order = i));
        srcList.items = reorderedItems;
        dispatch({ type: "update:list", payload: newOrderedData });
        /** Trigger server action */
        onUpdateItemOrder?.(reorderedItems);
      } else {
        /** Move the item to another list */
        /** Remove item from `srcList` */
        console.log(`user moved item to another list`);
        const [movedItem] = srcList.items.splice(src.index, 1);
        /** Assign the new `listId` to the moved item */
        movedItem!.listId = dest.droppableId;
        /** Add item to `destList` */
        destList.items.splice(dest.index, 0, movedItem!);
        srcList.items.forEach((item, i) => (item.order = i));
        /** Update the order for each item in `destList` */
        destList.items.forEach((item, i) => (item.order = i));
        dispatch({ type: "update:list", payload: newOrderedData });
        /** Trigger server action */
        onUpdateItemOrder?.(destList.items);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {({ droppableProps, innerRef, placeholder }) => (
          <ol
            ref={innerRef}
            {...droppableProps}
            className="flex h-full gap-x-3"
          >
            {kanbanLists.map((list, index) => (
              <KanbanList key={list.id} index={index} data={list} />
            ))}
            {placeholder}
            <KanbanListForm onCreateList={onCreateList} />
            {/* Empty space at the end of x-axis */}
            <div className="w-1 flex-shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
