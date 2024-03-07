import { PlusCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import {
  CRUDItem,
  TreeList,
  useTree,
  useTreeAction,
} from "@acme/ui/components";

export const AddItem = ({ group }: { group?: string }) => {
  const { dispatch } = useTreeAction();
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

  return <CRUDItem label="New page" icon={PlusCircle} onClick={handleCreate} />;
};

export const TreeItems = ({
  group,
  title,
  showEmptyChild,
}: {
  group?: string;
  title?: string;
  showEmptyChild: boolean;
}) => {
  const { isLoading } = useTree();
  const { dispatch } = useTreeAction();
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
          showEmptyChild={showEmptyChild}
          group={group ?? null}
          parentId={null}
          onAddItem={onAddItem}
          onDeleteItem={onDeleteItem}
        />
      )}
    </div>
  );
};
