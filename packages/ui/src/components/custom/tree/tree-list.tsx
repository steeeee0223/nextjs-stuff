"use client";

import { useState } from "react";

import type {
  CRUDItemIconProps,
  CRUDItemProps as ItemProps,
} from "@/components/custom";
import { CRUDItem as Item } from "@/components/custom";
import { cn } from "@/lib";
import { useTree } from "./tree-context";

export interface TreeListProps {
  group: string | null;
  parentId: string | null;
  level?: number;
  defaultIcon?: CRUDItemIconProps["icon"];
  showEmptyChild?: boolean;
  onAddItem?: (parentId?: string) => void;
  onDeleteItem?: ItemProps["onDelete"];
}

export function TreeList({
  group = null,
  parentId = null,
  level = 0,
  showEmptyChild = true,
  defaultIcon,
  onAddItem,
  onDeleteItem,
}: TreeListProps) {
  const { getChildren, isItemActive, onClickItem } = useTree();
  const items = getChildren(parentId, group);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const onExpand = (itemId: string) =>
    setExpanded((prev) => ({ ...prev, [itemId]: !prev[itemId] }));

  return (
    <>
      {showEmptyChild && (
        <p
          style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
          className={cn(
            "hidden text-sm font-medium text-muted-foreground/80",
            expanded && "last:block",
            level === 0 && "hidden",
          )}
        >
          No pages inside
        </p>
      )}
      {items.map(({ id, title, icon, group }) => (
        <div key={id}>
          <Item
            id={id}
            label={title}
            icon={icon ?? defaultIcon}
            onClick={() => onClickItem?.(id, group)}
            active={isItemActive?.(id, group)}
            level={level}
            expanded={expanded[id]}
            onExpand={() => onExpand(id)}
            onCreate={() => onAddItem?.(id)}
            onDelete={onDeleteItem}
          />
          {expanded[id] && (
            <TreeList
              group={group}
              parentId={id}
              level={level + 1}
              showEmptyChild={showEmptyChild}
              onAddItem={onAddItem}
              onDeleteItem={onDeleteItem}
            />
          )}
        </div>
      ))}
    </>
  );
}
