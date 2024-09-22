/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import { Plus } from "lucide-react";

import { CRUDItemSkeleton as ItemSkeleton } from "@/components/custom/crud-item";
import { Hint } from "@/components/custom/hint";
import { TreeList, type TreeListProps } from "@/components/custom/tree";
import { buttonVariants } from "@/components/ui/variants";
import { cn } from "@/lib/utils";

interface DocListProps
  extends Pick<TreeListProps, "defaultIcon" | "showEmptyChild"> {
  group: string;
  title: string;
  isLoading?: boolean;
  onCreate?: TreeListProps["onAddItem"];
  onArchive?: TreeListProps["onDeleteItem"];
}

export const DocList = ({
  group,
  title,
  defaultIcon,
  showEmptyChild,
  isLoading,
  onCreate,
  onArchive,
}: DocListProps) => {
  const [openGroup, setOpenGroup] = useState(true);
  const toggle = () => setOpenGroup((prev) => !prev);

  return (
    <div>
      <div className="group flex items-center px-3 py-1">
        <div className="grow">
          <Hint asChild side="top" description="Click to hide section">
            <div
              role="button"
              onClick={toggle}
              className={cn(
                buttonVariants({ variant: "hint", size: "xs" }),
                "py-0.5 font-semibold",
              )}
            >
              {title}
            </div>
          </Hint>
        </div>
        <Hint side="right" description={`Add a ${group}`} asChild>
          <div
            role="button"
            onClick={() => onCreate?.()}
            className={cn(
              buttonVariants({
                variant: "hint",
                className:
                  "ml-auto size-auto p-0.5 opacity-0 group-hover:opacity-100",
              }),
            )}
          >
            <Plus className="size-4" />
          </div>
        </Hint>
      </div>
      {isLoading ? (
        <>
          <div className="mt-2">
            {Array.from([0, 1, 0, 1, 1]).map((level, i) => (
              <ItemSkeleton key={i} level={level} />
            ))}
          </div>
        </>
      ) : (
        openGroup && (
          <TreeList
            group={group}
            parentId={null}
            defaultIcon={defaultIcon}
            showEmptyChild={showEmptyChild}
            onAddItem={onCreate}
            onDeleteItem={onArchive}
          />
        )
      )}
    </div>
  );
};
