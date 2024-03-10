/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { MouseEvent, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search, Trash, Undo } from "lucide-react";
import { toast } from "sonner";

import { Input, Spinner, useTree, useTreeAction } from "@acme/ui/components";
import { useAction } from "@acme/ui/hooks";
import { cn } from "@acme/ui/lib";

import { deleteDocument, restoreDocument } from "~/actions";
import { ConfirmModal } from "~/components";
import { theme } from "~/constants/theme";
import { useClient } from "~/hooks";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const { path } = useClient();
  /** Tree */
  const { getGroup } = useTree();
  const [search, setSearch] = useState("");
  const archivedDocs = useMemo(() => getGroup("trash"), [getGroup]);
  const filteredDocuments = archivedDocs.filter(({ title }) =>
    title.toLowerCase().includes(search.toLowerCase()),
  );
  /** Action */
  const { dispatch } = useTreeAction();
  const onClick = (documentId: string) =>
    router.push(`/documents/${documentId}`);
  const onError = (e: string) => toast.error(e);
  /** Action: Restore */
  const { execute: restore } = useAction(restoreDocument, {
    onSuccess: ({ ids, item }) => {
      // dispatch({ type: "restore", payload: data });
      dispatch({ type: "update:group", payload: { ids, group: "trash" } });
      toast.success(`Restored document "${item.title}"`);
    },
    onError,
  });
  const onRestore = (e: MouseEvent<HTMLDivElement>, documentId: string) => {
    e.stopPropagation();
    restore({ id: documentId })
      .then(() => console.log(`processing restore`))
      .catch((e) => console.log(e));
  };
  /** Action: Remove */
  const { execute: remove } = useAction(deleteDocument, {
    onSuccess: (data) => {
      dispatch({ type: "delete", payload: data.ids });
      toast.success(`Deleted document "${data.item.title}"`);
      if (params.documentId === data.item.id) router.push(path);
    },
    onError,
  });

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
        {filteredDocuments?.map(({ id, title }) => (
          <div
            key={id}
            role="button"
            onClick={() => onClick(id)}
            className={cn(
              theme.flex.center,
              "w-full justify-between rounded-sm text-sm text-primary hover:bg-primary/5",
            )}
          >
            <span className="truncate pl-2">{title}</span>
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
