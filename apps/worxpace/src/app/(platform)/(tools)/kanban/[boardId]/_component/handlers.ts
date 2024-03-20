import { toast } from "sonner";

import type { KanbanHandlers } from "@acme/ui/components";

export const defaultHandlers: KanbanHandlers = {
  /** List */
  onCopyList: (srcId, destId) =>
    toast.info(
      `Copied list from ${srcId.slice(0, 5)} to ${destId.slice(0, 5)}`,
    ),
  onCreateList: (list) => toast.info(`Created list: ${list.title}`),
  onUpdateList: (list) => toast.info(`Updated list: ${list.title}`),
  onUpdateListOrder: (_lists) => toast.info(`Updated lists order`),
  onDeleteList: (listId) => toast.info(`Deleted list: ${listId.slice(0, 5)}`),
  /** Item */
  onCopyItem: (src, _dest) => toast.info(`Copied item: ${src.title}`),
  onCreateItem: (item) => toast.info(`Created item: ${item.title}`),
  onOpenItem: (item) => toast.info(`Opened item: ${item.title}`),
  onUpdateItem: (item) => toast.info(`Updated item: ${item.title}`),
  onUpdateItemOrder: (_items) => toast.info(`Updated items order`),
  onDeleteItem: (item) => toast.info(`Deleted item: ${item.title}`),
};
