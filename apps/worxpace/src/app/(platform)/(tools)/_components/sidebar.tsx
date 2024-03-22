/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
"use client";

import { forwardRef, type ForwardedRef, type MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useOrganizationList } from "@clerk/nextjs";
import {
  ChevronsLeft,
  Columns3,
  PlusCircle,
  Presentation,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

import {
  CRUDItem as Item,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useTree,
  WorkspaceSwitcher,
} from "@acme/ui/components";
import { cn } from "@acme/ui/lib";

import { archiveDocument, createDocument } from "~/actions";
import { theme } from "~/constants/theme";
import { useClient, useSearch, useSettings } from "~/hooks";
import DocList from "./doc-list";
import TrashBox from "./trash-box";

interface SidebarProps {
  isResetting: boolean;
  isMobile: boolean;
  handleMouseDown: MouseEventHandler<HTMLDivElement>;
  resetWidth: () => void;
  collapse: () => void;
}

export const Sidebar = forwardRef(function Sidebar(
  {
    isResetting,
    isMobile,
    handleMouseDown,
    resetWidth,
    collapse,
  }: SidebarProps,
  ref: ForwardedRef<HTMLElement>,
) {
  /** Route */
  const router = useRouter();
  const { path, userId, workspaceId } = useClient();
  /** Workspace */
  const { signOut } = useAuth();
  const { setActive } = useOrganizationList();
  const handleSelect = async (id: string) => {
    const workspaceId = id === userId ? null : id;
    await setActive?.({ organization: workspaceId });
    const newPath =
      id === userId ? `/personal/${userId}` : `/organization/${id}`;
    router.push(newPath);
  };
  const handleLogout = () =>
    signOut(() => router.push("/select-role")).catch((e) => console.log(e));
  /** Search & Settings */
  const search = useSearch();
  const settings = useSettings();
  /** Docs */
  const { dispatch, onClickItem } = useTree();
  const onError = (e: Error) => toast.error(e.message);
  /** Action: Create */
  const { trigger: create } = useSWRMutation(
    `doc:${workspaceId}`,
    createDocument,
    {
      onSuccess: (data) => {
        const { id, title, parentId, icon, type: group } = data;
        dispatch({
          type: "add",
          payload: [{ id, title, parentId, icon, group }],
        });
        toast.success(`Page Created: ${title}`);
        onClickItem?.(id, group);
      },
      onError,
    },
  );
  /** Action: Archive */
  const { trigger: archive } = useSWRMutation(
    `doc:${workspaceId}`,
    archiveDocument,
    {
      onSuccess: ({ item, ids }) => {
        dispatch({
          type: "update:group",
          payload: { ids, group: `trash:${item.type}` },
        });
        toast.success(`Page "${item.title}" Moved to Trash`);
        router.push(path);
      },
      onError,
    },
  );

  return (
    <aside
      ref={ref}
      className={cn(
        "group/sidebar relative z-[99999] flex h-full w-60 flex-col overflow-y-auto bg-secondary",
        isResetting && "transition-all duration-300 ease-in-out",
        isMobile && "w-0",
      )}
    >
      <div
        onClick={collapse}
        role="button"
        className={cn(
          theme.bg.hover,
          "absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition group-hover/sidebar:opacity-100",
          isMobile && "opacity-100",
        )}
      >
        <ChevronsLeft className="h-6 w-6" />
      </div>
      <div>
        <WorkspaceSwitcher onLogout={handleLogout} onSelect={handleSelect} />
        <Item
          label="Search"
          icon={Search}
          onClick={search.onOpen}
          shortcut="⌘K"
        />
        <Item
          label="Settings"
          icon={Settings}
          onClick={settings.onOpen}
          shortcut="⌘,"
        />
        <Item
          label="New page"
          icon={PlusCircle}
          onClick={() => create({ type: "document", title: "Untitled" })}
        />
      </div>
      <div className="mt-4 flex flex-col gap-y-4">
        <DocList
          group="document"
          title="Document"
          onCreate={(parentId) =>
            create({ type: "document", title: "Untitled", parentId })
          }
          onArchive={(id) => archive({ id })}
        />
        <DocList
          group="kanban"
          title="Kanban"
          defaultIcon={Columns3}
          showEmptyChild={false}
          onCreate={(parentId) =>
            create({ type: "kanban", title: "Untitled", parentId })
          }
          onArchive={(id) => archive({ id })}
        />
        <DocList
          group="whiteboard"
          title="Whiteboard"
          defaultIcon={Presentation}
          showEmptyChild={false}
          onCreate={(parentId) =>
            create({ type: "whiteboard", title: "Untitled", parentId })
          }
          onArchive={(id) => archive({ id })}
        />
        <Popover>
          <PopoverTrigger className="mt-4 w-full">
            <Item label="Trash" icon={Trash} />
          </PopoverTrigger>
          <PopoverContent
            className="z-[99999] w-72 p-0"
            side={isMobile ? "bottom" : "right"}
          >
            <TrashBox />
          </PopoverContent>
        </Popover>
      </div>
      <div
        onMouseDown={handleMouseDown}
        onClick={resetWidth}
        className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
      />
    </aside>
  );
});
