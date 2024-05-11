"use client";

import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { v4 as uuidv4 } from "uuid";

import {
  CRUDItem,
  TreeList,
  TreeProvider,
  useTree,
  type TreeProviderProps,
} from "@acme/ui/custom";

import { delay } from "./utils";

export const AddItem = ({ group }: { group?: string }) => {
  const { dispatch } = useTree();
  const handleCreate = () =>
    dispatch({
      type: "add",
      payload: [
        {
          id: uuidv4(),
          parentId: null,
          title: "New Page",
          group: group ?? null,
        },
      ],
    });

  return (
    <CRUDItem
      label="New page"
      icon={{ type: "lucide", name: "circle-plus" }}
      onClick={handleCreate}
    />
  );
};

export const TreeItems = ({
  group,
  title,
}: {
  group?: string;
  title?: string;
}) => {
  const { isLoading, dispatch } = useTree();
  const onAddItem = (parentId?: string) =>
    dispatch({
      type: "add",
      payload: [
        {
          id: uuidv4(),
          parentId: parentId ?? null,
          title: "New Page",
          group: group ?? null,
        },
      ],
    });
  const onDeleteItem = (id: string) =>
    dispatch({ type: "delete", payload: [id] });
  return (
    <div className="mt-4">
      {title && (
        <span className="ml-4 text-xs font-semibold text-primary/50">
          {title}
        </span>
      )}
      {isLoading ? (
        <>
          <div className="mt-4">
            {Array.from([0, 1, 0, 1, 1]).map((level, i) => (
              <CRUDItem.Skeleton key={i} level={level} />
            ))}
          </div>
        </>
      ) : (
        <TreeList
          showEmptyChild
          group={group ?? null}
          parentId={null}
          onAddItem={onAddItem}
          onDeleteItem={onDeleteItem}
        />
      )}
    </div>
  );
};

const AddWithSWR = () => {
  const { dispatch } = useTree();
  const { trigger } = useSWRMutation(
    `ui:tree`,
    async () => {
      await delay(1000);
      return { id: uuidv4(), title: "Untitled", group: null, parentId: null };
    },
    {
      onSuccess: (data) => dispatch({ type: "add", payload: [data] }),
    },
  );
  return (
    <CRUDItem
      label="New page"
      icon={{ type: "lucide", name: "circle-plus" }}
      onClick={trigger}
    />
  );
};

export const Provider = ({ children, className }: TreeProviderProps) => {
  const { data, isLoading } = useSWR(`ui:tree`, () => []);
  return (
    <TreeProvider
      className={className}
      isLoading={isLoading}
      initialItems={data}
    >
      <AddWithSWR />
      {children}
    </TreeProvider>
  );
};
