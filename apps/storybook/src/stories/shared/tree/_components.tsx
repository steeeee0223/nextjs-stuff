"use client";

import React, { useEffect } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { v4 as uuidv4 } from "uuid";

import {
  CRUDItem,
  TreeGroup,
  TreeList,
  useTree,
  type TreeItemData,
} from "@swy/ui/shared";

import { delay } from "@/lib/utils";

export const AddItem = ({ group }: { group: string }) => {
  const addNode = useTree((state) => state.add);
  const handleCreate = () =>
    addNode({ id: uuidv4(), parentId: null, title: "New Page", group });

  return (
    <CRUDItem
      label="New page"
      icon={{ type: "lucide", name: "circle-plus" }}
      onClick={handleCreate}
    />
  );
};

export const WithInitialItems = ({
  initialItems,
  isLoading,
  children,
}: React.PropsWithChildren<{
  initialItems?: TreeItemData[];
  isLoading?: boolean;
}>) => {
  const setNodes = useTree((state) => state.set);
  useEffect(() => {
    if (isLoading || !initialItems) return;
    setNodes(initialItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialItems, isLoading]);

  return <div className="w-60 rounded-sm bg-sidebar p-4">{children}</div>;
};

/**
 * An integrated Tree view, with create and delete operations
 */
export const TreeView: React.FC<{
  group: string;
  title: string;
  isLoading?: boolean;
}> = ({ group, title, isLoading }) => {
  const addNode = useTree((state) => state.add);
  const deleteNode = useTree((state) => state.delete);
  const getNodes = useTree((state) => state.getNodes);
  const selectedId = useTree((state) => state.selectedId);
  const selectNode = useTree((state) => state.select);

  const onCreate = (parentId: string | null) =>
    addNode({ id: uuidv4(), parentId, title: "New Page", group });
  const onDelete = (id: string) => deleteNode(id);
  return (
    <TreeGroup
      title={title}
      description="Add a file"
      isLoading={isLoading}
      onCreate={() => onCreate(null)}
    >
      <TreeList
        showEmptyChild
        nodes={getNodes(group)}
        selectedId={selectedId}
        onSelect={selectNode}
        Item={({ node, isSelected, onSelect, ...props }) => (
          <CRUDItem
            {...props}
            id={node.id}
            label={node.title}
            icon={node.icon}
            active={isSelected}
            onClick={onSelect}
            onCreate={() => onCreate(node.id)}
            onDelete={onDelete}
          />
        )}
      />
    </TreeGroup>
  );
};

const AddWithSWR = () => {
  const addNode = useTree((state) => state.add);
  const { trigger } = useSWRMutation(
    `ui:tree`,
    async () => {
      await delay(1000);
      return { id: uuidv4(), title: "Untitled", group: "swr", parentId: null };
    },
    { onSuccess: addNode },
  );
  return (
    <CRUDItem
      label="New page"
      icon={{ type: "lucide", name: "circle-plus" }}
      onClick={trigger}
    />
  );
};

export const Provider = ({ children }: React.PropsWithChildren) => {
  const { data, isLoading } = useSWR(`ui:tree`, () => []);
  return (
    <WithInitialItems initialItems={data} isLoading={isLoading}>
      <AddWithSWR />
      {children}
    </WithInitialItems>
  );
};
