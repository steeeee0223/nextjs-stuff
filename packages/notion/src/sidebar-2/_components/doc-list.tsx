import React from "react";

import {
  buildTree,
  TreeGroup,
  TreeItem,
  TreeList,
  type IconInfo,
} from "@swy/ui/shared";

import { usePlatformStore } from "../../slices";
import { ActionGroup } from "./action-group";

interface DocListProps {
  group: string;
  title: string;
  defaultIcon?: IconInfo;
  isLoading?: boolean;
  onSelect: (group: string, id: string) => void;
  onCreate: (parentId?: string) => void;
  onArchive: (id: string) => void;
}

export const DocList: React.FC<DocListProps> = ({
  group,
  title,
  defaultIcon,
  isLoading,
  onSelect,
  onCreate,
  onArchive,
}) => {
  const pages = usePlatformStore((state) =>
    Object.values(state.pages).filter(
      (page) => page.type === group && !page.isArchived,
    ),
  );
  const activePage = usePlatformStore((state) => state.activePage);
  const setActivePage = usePlatformStore((state) => state.setActivePage);

  const nodes = buildTree(pages);

  const select = (id: string) => {
    setActivePage(id);
    onSelect(group, id);
  };

  return (
    <TreeGroup
      title={title}
      description={`Add a ${group}`}
      isLoading={isLoading}
      onCreate={() => onCreate()}
    >
      <TreeList
        nodes={nodes}
        defaultIcon={defaultIcon}
        showEmptyChild={group === "document"}
        selectedId={activePage}
        onSelect={select}
        Item={({ node, ...props }) => (
          <TreeItem
            {...props}
            node={node}
            className="group"
            expandable={group === "document"}
          >
            <ActionGroup
              lastEditedBy={node.lastEditedBy}
              lastEditedAt={node.lastEditedAt}
              onCreate={() => onCreate(node.id)}
              onDelete={() => onArchive(node.id)}
            />
          </TreeItem>
        )}
      />
    </TreeGroup>
  );
};
