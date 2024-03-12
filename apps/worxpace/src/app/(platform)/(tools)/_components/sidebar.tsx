/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
"use client";

import { forwardRef, type ForwardedRef, type MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { OrganizationSwitcher } from "@clerk/nextjs";
import {
  ChevronsLeft,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { toast } from "sonner";

import {
  CRUDItem as Item,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useTree,
} from "@acme/ui/components";
import { useAction } from "@acme/ui/hooks";
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
  const { path } = useClient();
  /** Search & Settings */
  const search = useSearch();
  const settings = useSettings();
  /** Docs */
  const { dispatch } = useTree();
  const onError = (e: string) => toast.error(e);
  /** Action: Create */
  const { execute: create } = useAction(createDocument, {
    onSuccess: (data) => {
      const { id, title, parentId, icon } = data;
      dispatch({
        type: "add",
        payload: [{ id, title, parentId, icon, group: "document" }],
      });
      toast.success(`Document Created: ${title}`);
      router.push(`/documents/${id}`);
    },
    onError,
  });
  /** Action: Archive */
  const { execute: archive } = useAction(archiveDocument, {
    onSuccess: ({ item, ids }) => {
      dispatch({ type: "update:group", payload: { ids, group: "trash" } });
      toast.success(`Document "${item.title}" Moved to Trash`);
      router.push(path);
    },
    onError,
  });

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
        <OrganizationSwitcher
          afterSelectPersonalUrl="/personal/:id"
          afterCreateOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-role"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 6,
                padding: "14px 8px",
              },
              avatarBox: {
                borderRadius: 9999,
                height: "20px",
                width: "20px",
              },
              organizationSwitcherPopoverCard: {
                zIndex: 99999,
              },
            },
          }}
        />
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
          onClick={() => create({ title: "Untitled" })}
        />
      </div>
      <div className="mt-4 flex flex-col gap-y-4">
        <DocList
          group="document"
          title="Document"
          onCreate={(parentId) => create({ title: "Untitled", parentId })}
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
