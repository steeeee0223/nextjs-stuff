/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Hint,
  CRUDItem as Item,
  TreeList,
  type TreeListProps,
} from "@acme/ui/custom";
import { cn } from "@acme/ui/lib";

import { theme } from "~/constants/theme";

interface DocListProps
  extends Pick<TreeListProps, "defaultIcon" | "showEmptyChild"> {
  group: string;
  title: string;
  isLoading?: boolean;
  onCreate?: TreeListProps["onAddItem"];
  onArchive?: TreeListProps["onDeleteItem"];
}

const DocList = ({
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
      <div className={cn(theme.flex.center, "px-3 py-1")}>
        <div className="grow">
          <Hint
            side="top"
            description="Click to hide section"
            className={theme.tooltip}
          >
            <div
              role="button"
              onClick={toggle}
              className={cn(
                theme.bg.hover,
                "rounded-sm px-1.5 py-0.5",
                "text-xs font-semibold text-primary/50",
              )}
            >
              {title}
            </div>
          </Hint>
        </div>
        <Hint
          side="top"
          description={`Add a ${group}`}
          className={cn(theme.tooltip, "hover:opacity-100")}
        >
          <div
            role="button"
            onClick={() => onCreate?.()}
            className={cn(
              theme.bg.hover,
              "ml-auto h-full grow-0 rounded-sm p-0.5 opacity-0 hover:opacity-100",
            )}
          >
            <Plus className={cn(theme.size.icon, "text-muted-foreground")} />
          </div>
        </Hint>
      </div>
      {isLoading ? (
        <>
          <div className="mt-2">
            {Array.from([0, 1, 0, 1, 1]).map((level, i) => (
              <Item.Skeleton key={i} level={level} />
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

export default DocList;
