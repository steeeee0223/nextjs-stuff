/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { MouseEvent, useMemo, useState } from "react";
import { Search, Trash, Undo } from "lucide-react";
import { stableHash } from "swr/_internal";

import { IconBlock, Spinner, useTree } from "@acme/ui/custom";
import { cn } from "@acme/ui/lib";
import { Input } from "@acme/ui/shadcn";

import { ConfirmModal } from "~/components";
import { theme } from "~/constants/theme";
import { useDocuments, usePlatform } from "~/hooks";

const TrashBox = () => {
  const { accountId, workspaceId } = usePlatform();
  /** Tree */
  const { getGroup, onClickItem } = useTree();
  const [search, setSearch] = useState("");
  const archivedDocs = useMemo(
    () =>
      [
        "trash:document",
        "trash:kanban",
        "trash:whiteboard",
        "trash:workflow",
      ].flatMap(getGroup),
    [getGroup],
  );
  const filteredDocuments = archivedDocs.filter(({ title }) =>
    title.toLowerCase().includes(search.toLowerCase()),
  );
  /** Docs */
  const { restore, remove } = useDocuments({ workspaceId });
  const onClick = (id: string, group: string | null) => {
    if (group) {
      const [, grp] = group.split(":");
      onClickItem?.(id, grp ?? null);
    }
  };
  const onRestore = (e: MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    void restore({ id, accountId, workspaceId });
  };
  const onRemove = (id: string) => remove({ id, accountId, workspaceId });

  if (archivedDocs === undefined)
    return (
      <div className={cn(theme.flex.center, "h-full justify-center p-4")}>
        <Spinner size="lg" />
      </div>
    );
  return (
    <div className="text-sm">
      <div className={cn(theme.flex.gap1, "p-2")}>
        <Search className={cn(theme.size.icon, "mr-2")} />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 bg-secondary px-2 focus-visible:ring-transparent"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden pb-2 text-center text-xs text-muted-foreground last:block">
          No documents found.
        </p>
        {filteredDocuments?.map(({ id, title, group, icon }) => (
          <div
            key={id}
            role="button"
            onClick={() => onClick(id, group)}
            className={cn(
              theme.flex.center,
              "w-full justify-between rounded-sm text-sm text-primary hover:bg-primary/5",
            )}
          >
            <div className={cn(theme.flex.gap1, "pl-2")}>
              <IconBlock
                key={stableHash(icon)}
                defaultIcon={icon ?? { type: "emoji", emoji: " " }}
                editable={false}
              />
              <span className="truncate">{title}</span>
            </div>
            <div className={cn(theme.flex.gap1, "p-1")}>
              <div
                onClick={(e) => onRestore(e, id)}
                role="button"
                className={cn(theme.bg.hover, "rounded-sm p-1")}
              >
                <Undo
                  className={cn(theme.size.icon, "text-muted-foreground")}
                />
              </div>
              <ConfirmModal onConfirm={() => onRemove(id)}>
                <div
                  role="button"
                  className={cn(theme.bg.hover, "rounded-sm p-1")}
                >
                  <Trash
                    className={cn(theme.size.icon, "text-muted-foreground")}
                  />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
