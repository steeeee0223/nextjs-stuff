/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  type ForwardedRef,
  type MouseEventHandler,
} from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
// import { useAuth, useOrganizationList } from "@clerk/nextjs";
import { ChevronsLeft } from "lucide-react";

import { Hint, CRUDItem as Item, useModal } from "@acme/ui/custom";
import { cn } from "@acme/ui/lib";
import {
  useSettingsStore,
  WorkspaceSwitcher,
  type WorkspaceSwitcherProps,
} from "@acme/ui/notion";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/shadcn";

import { SearchCommand, SettingsModal } from "~/components/modal";
import { theme } from "~/constants/theme";
import { useDocuments, usePlatform } from "~/hooks";
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
  /** Workspace */
  const { reset } = useSettingsStore();
  const { accountId, workspaceId, ...platform } = usePlatform();
  const { signOut } = useAuth();
  // const { setActive } = useOrganizationList();
  const switcherHandlers: WorkspaceSwitcherProps = {
    onSelect: async (id) => {
      // TODO fix this
      // await setActive?.({ organization: workspaceId });
      platform.update((prev) => ({ ...prev, workspaceId: id }));
      reset();
      router.push(`/workspace/${id}`);
    },
    onCreateWorkspace: () => router.push("/onboarding"),
    onLogout: () => {
      platform.reset();
      void signOut(() => router.push("/select-role"));
    },
  };
  /** Docs */
  const { isLoading, fetchData, create, archive } = useDocuments({
    workspaceId,
  });
  const handleCreate = (type: string, parentId?: string) =>
    create({ type, parentId, title: "Untitled", accountId, workspaceId });
  const handleArchive = (id: string) => archive({ id, accountId, workspaceId });
  /** Modals */
  const { setOpen } = useModal();
  const handleSettings = () => void setOpen(<SettingsModal />);
  const fetchSearchData = async () => {
    const data = await fetchData();
    const documents = data?.filter(({ isArchived }) => !isArchived) ?? [];
    return { documents };
  };
  const handleSearch = useCallback(
    () => void setOpen(<SearchCommand />, fetchSearchData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchSearchData],
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSearch();
      }
    };

    addEventListener("keydown", down);
    return () => removeEventListener("keydown", down);
  }, [handleSearch]);

  return (
    <aside
      ref={ref}
      className={cn(
        "group/sidebar relative z-[99999] flex h-screen w-60 flex-col overflow-y-auto bg-secondary",
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
        <WorkspaceSwitcher {...switcherHandlers} />
        <Hint
          side="right"
          description="Search and quickly jump to a page"
          className={theme.tooltip}
          triggerProps="min-w-full"
        >
          <Item
            label="Search"
            icon={{ type: "lucide", name: "search" }}
            onClick={handleSearch}
            shortcut="⌘K"
          />
        </Hint>
        <Hint
          side="right"
          description="Manage your account and settings"
          className={theme.tooltip}
          triggerProps="min-w-full"
        >
          <Item
            label="Settings"
            icon={{ type: "lucide", name: "settings" }}
            onClick={handleSettings}
            shortcut="⌘,"
          />
        </Hint>
        <Hint
          side="right"
          description="Manage your workflows"
          className={theme.tooltip}
          triggerProps="min-w-full"
        >
          <Item
            label="Workflows"
            icon={{ type: "lucide", name: "git-pull-request-arrow" }}
            onClick={() => router.push(`/workflows`)}
          />
        </Hint>
        <Hint
          side="right"
          description="Create a new document"
          className={theme.tooltip}
          triggerProps="min-w-full"
        >
          <Item
            label="New page"
            icon={{ type: "lucide", name: "circle-plus" }}
            onClick={() => handleCreate("document")}
          />
        </Hint>
      </div>
      <div className="mt-4 flex flex-col gap-y-4">
        <DocList
          isLoading={isLoading}
          group="document"
          title="Document"
          onCreate={(parentId) => handleCreate("document", parentId)}
          onArchive={handleArchive}
        />
        <DocList
          isLoading={isLoading}
          group="kanban"
          title="Kanban"
          defaultIcon={{ type: "lucide", name: "columns-3" }}
          showEmptyChild={false}
          onCreate={(parentId) => handleCreate("kanban", parentId)}
          onArchive={handleArchive}
        />
        <DocList
          isLoading={isLoading}
          group="whiteboard"
          title="Whiteboard"
          defaultIcon={{ type: "lucide", name: "presentation" }}
          showEmptyChild={false}
          onCreate={(parentId) => handleCreate("whiteboard", parentId)}
          onArchive={handleArchive}
        />
        <Popover>
          <PopoverTrigger className="mt-4 w-full">
            <Hint
              side="right"
              description="Restore deleted pages"
              className={theme.tooltip}
              triggerProps="min-w-full"
            >
              <Item label="Trash" icon={{ type: "lucide", name: "trash" }} />
            </Hint>
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
