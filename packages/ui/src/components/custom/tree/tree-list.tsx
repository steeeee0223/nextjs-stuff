"use client";

import type { CRUDItemProps as ItemProps } from "@/components/custom";
import { useState } from "react";
import { CRUDItem as Item } from "@/components/custom";
import { cn } from "@/lib";

import { useTree } from "./tree-context";

interface TreeListProps {
  parentId: string | null;
  level?: number;
  onAddItem?: (parentId?: string) => void;
  onDeleteItem?: ItemProps["onDelete"];
}

export function TreeList({
  parentId = null,
  level = 0,
  onAddItem,
  onDeleteItem,
}: TreeListProps) {
  const { getChildren, isItemActive, onClickItem } = useTree();
  const items = getChildren(false, parentId);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const onExpand = (itemId: string) =>
    setExpanded((prev) => ({ ...prev, [itemId]: !prev[itemId] }));

  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden",
        )}
      >
        No pages inside
      </p>
      {items.map(({ id, title, icon }) => (
        <div key={id}>
          <Item
            id={id}
            label={title}
            icon={icon}
            onClick={() => onClickItem?.(id)}
            active={isItemActive?.(id)}
            level={level}
            expanded={expanded[id]}
            onExpand={() => onExpand(id)}
            onCreate={() => onAddItem?.(id)}
            onDelete={onDeleteItem}
          />
          {expanded[id] && (
            <TreeList
              parentId={id}
              level={level + 1}
              onAddItem={onAddItem}
              onDeleteItem={onDeleteItem}
            />
          )}
        </div>
      ))}
    </>
  );
}
