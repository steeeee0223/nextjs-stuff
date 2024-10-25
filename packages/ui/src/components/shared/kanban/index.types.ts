export interface KanbanItem {
  id: string;
  listId: string;
  order: number;
  title: string;
}

export interface KanbanList {
  id: string;
  order: number;
  title: string;
  items: KanbanItem[];
}

export interface KanbanHandlers {
  /** List */
  onCopyList?: (srcId: string, destId: string) => void;
  onCreateList?: (list: KanbanList) => void;
  onUpdateList?: (list: KanbanList) => void;
  onUpdateListOrder?: (lists: KanbanList[]) => void;
  onDeleteList?: (listId: string) => void;
  /** Item */
  onCopyItem?: (src: KanbanItem, dest: KanbanItem) => void;
  onCreateItem?: (item: KanbanItem) => void;
  onOpenItem?: (item: KanbanItem) => void;
  onUpdateItem?: (item: KanbanItem) => void;
  onUpdateItemOrder?: (items: KanbanItem[]) => void;
  onDeleteItem?: (item: KanbanItem) => void;
}
