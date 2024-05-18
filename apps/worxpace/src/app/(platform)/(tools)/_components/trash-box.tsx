/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { MouseEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Trash, Undo } from "lucide-react";
import { toast } from "sonner";
import { stableHash } from "swr/_internal";
import useSWRMutation from "swr/mutation";

import { IconBlock, Spinner, useTree } from "@acme/ui/custom";
import { cn } from "@acme/ui/lib";
import { Input } from "@acme/ui/shadcn";

import { deleteDocument, restoreDocument } from "~/actions";
import { ConfirmModal } from "~/components";
import { theme } from "~/constants/theme";
import { useClient } from "~/hooks";

const TrashBox = () => {
  const router = useRouter();
  const { path, workspaceId } = useClient();
  /** Tree */
  const { getGroup, dispatch, onClickItem } = useTree();
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
  /** Action */
  const onClick = (id: string, group: string | null) => {
    if (group) {
      const [, grp] = group.split(":");
      onClickItem?.(id, grp ?? null);
    }
  };
  const onError = (e: Error) => toast.error(e.message);
  /** Action: Restore */
  const { trigger: restore } = useSWRMutation(
    `doc:${workspaceId}`,
    restoreDocument,
    {
      onSuccess: ({ ids, item }) => {
        dispatch({ type: "update:group", payload: { ids, group: item.type } });
        toast.success(`Restored document "${item.title}"`);
      },
      onError,
    },
  );
  const onRestore = (e: MouseEvent<HTMLDivElement>, documentId: string) => {
    e.stopPropagation();
    void restore({ id: documentId });
  };
  /** Action: Remove */
  const { trigger: remove } = useSWRMutation(
    `doc:${workspaceId}`,
    deleteDocument,
    {
      onSuccess: (data) => {
        dispatch({ type: "delete", payload: data.ids });
        toast.success(`Deleted document "${data.item.title}"`);
        router.push(path);
      },
      onError,
    },
  );

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
              <ConfirmModal onConfirm={() => remove({ id })}>
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
