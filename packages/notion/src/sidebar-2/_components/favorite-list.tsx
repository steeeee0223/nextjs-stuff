"use client";

import React from "react";

import { useOrigin } from "@swy/ui/hooks";
import { TreeGroup, TreeItem, TreeList } from "@swy/ui/shared";

import { generateDefaultIcon } from "../../common";
import { selectFavorites, usePlatformStore } from "../../slices";
import type { Page, UpdatePageParams } from "../../types";
import { ActionGroup } from "./action-group";
import { MenuType } from "./types";

interface FavoriteListProps {
  isLoading?: boolean;
  redirect?: (url: string) => void;
  onCreate?: (group: string, parentId: string) => void;
  onDuplicate?: (id: string) => void;
  onUpdate?: (id: string, data: UpdatePageParams) => void;
}

export const FavoriteList: React.FC<FavoriteListProps> = ({
  isLoading,
  redirect,
  onCreate,
  onDuplicate,
  onUpdate,
}) => {
  const origin = useOrigin();

  const nodes = usePlatformStore((state) => selectFavorites(state));
  const activePage = usePlatformStore((state) => state.activePage);
  const setActivePage = usePlatformStore((state) => state.setActivePage);

  const select = (node: Page) => {
    setActivePage(node.id);
    redirect?.(node.url ?? "#");
  };

  return (
    <TreeGroup title="Favorites" isLoading={isLoading}>
      <TreeList
        nodes={nodes}
        defaultIcon={{ type: "lucide", name: "file" }}
        selectedId={activePage}
        Item={({ node, ...props }) => (
          <TreeItem
            {...props}
            node={node}
            className="group"
            onSelect={() => select(node)}
            expandable={node.type === "document"}
          >
            <ActionGroup
              type={node.isFavorite ? MenuType.Favorites : MenuType.Normal}
              title={node.title}
              icon={node.icon ?? generateDefaultIcon(node.type)}
              pageLink={node.url ? `${origin}/${node.url}` : "#"}
              isFavorite={node.isFavorite}
              lastEditedBy={node.lastEditedBy}
              lastEditedAt={node.lastEditedAt}
              onCreate={() => onCreate?.(node.type, node.id)}
              onDuplicate={() => onDuplicate?.(node.id)}
              onUpdate={(data) => onUpdate?.(node.id, data)}
            />
          </TreeItem>
        )}
      />
    </TreeGroup>
  );
};
