import { PlusCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import {
  CRUDItem,
  TreeList,
  useTree,
  useTreeAction,
} from "@acme/ui/components";

import { createItem } from "./utils";

export const AddItem = () => {
  const { dispatch } = useTreeAction();
  const handleCreate = () =>
    dispatch({ type: "add", payload: [createItem(uuidv4(), "Untitled")] });

  return <CRUDItem label="New page" icon={PlusCircle} onClick={handleCreate} />;
};

export const TreeItems = () => {
  const { isLoading } = useTree();
  const { dispatch } = useTreeAction();
  const onAddItem = (parentId?: string) =>
    dispatch({
      type: "add",
      payload: [createItem(uuidv4(), "Untitled", parentId)],
    });
  const onDeleteItem = (id: string) =>
    dispatch({ type: "delete", payload: [id] });
  return (
    <div className="mt-4">
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
          parentId={null}
          onAddItem={onAddItem}
          onDeleteItem={onDeleteItem}
        />
      )}
    </div>
  );
};
