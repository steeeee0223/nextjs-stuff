"use client";

import React, { forwardRef, useState } from "react";
import {
  ChevronsLeft,
  CirclePlus,
  GitPullRequestArrow,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import { cn } from "@swy/ui/lib";
import { Button, useTheme } from "@swy/ui/shadcn";
import { Hint, useModal } from "@swy/ui/shared";

import type { SettingsPanelProps } from "../settings-panel";
import type { UpdatePageParams } from "../types";
import { DocList, FavoriteList, HintItem, TrashBox } from "./_components";
import { SearchCommand, SettingsModal } from "./modals";

const GROUPS = {
  document: "Document",
  kanban: "Kanban",
  whiteboard: "Whiteboard",
} as const;

interface SidebarProps {
  className?: string;
  isMobile?: boolean;
  collapse?: () => void;
  redirect?: (path: string) => void;
  settingsProps: SettingsPanelProps;
  pageHandlers: {
    isLoading?: boolean;
    onCreate?: (type: string, parentId?: string) => void;
    onDuplicate?: (id: string) => void;
    onDelete?: (id: string) => void;
    onUpdate?: (id: string, data: UpdatePageParams) => void;
  };
  WorkspaceSwitcher: React.ReactNode;
}

export const Sidebar2 = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  {
    className,
    isMobile,
    collapse,
    redirect,
    settingsProps,
    pageHandlers: pages,
    WorkspaceSwitcher,
  },
  ref,
) {
  const { theme: activeTheme, setTheme } = useTheme();
  /** Modals */
  const { setOpen } = useModal();
  const [trashOpen, setTrashOpen] = useState(false);
  const onOpenSettings = () => {
    const workspaceId = settingsProps.settings.workspace.id;
    setOpen(<SettingsModal key={workspaceId} {...settingsProps} />);
  };
  const onOpenSearch = () =>
    setOpen(
      <SearchCommand
        workspaceName={settingsProps.settings.workspace.name}
        onSelect={(id, group) => redirect?.(`/${group}/${id}`)}
        onOpenTrash={setTrashOpen}
      />,
    );
  /** Keyboard shortcut */
  const shortcutOptions = { preventDefault: true };
  useHotkeys(["meta+k", "shift+meta+k"], onOpenSearch, shortcutOptions);
  useHotkeys(
    ["meta+comma", "shift+meta+comma"],
    onOpenSettings,
    shortcutOptions,
  );
  useHotkeys(
    "shift+meta+l",
    () => setTheme(activeTheme === "dark" ? "light" : "dark"),
    shortcutOptions,
  );

  return (
    <aside
      ref={ref}
      className={cn(
        "group/sidebar relative z-20 flex h-screen w-60 flex-col overflow-y-auto bg-sidebar",
        className,
      )}
    >
      <div className="flex h-12 w-full flex-shrink-0 flex-grow-0 items-center justify-between">
        {WorkspaceSwitcher}
        <Hint asChild description="Close sidebar">
          <Button
            variant="hint"
            onClick={collapse}
            className={cn(
              "absolute right-2 size-6 p-0 opacity-0 transition group-hover/sidebar:opacity-100",
              isMobile && "opacity-100",
            )}
          >
            <ChevronsLeft className="size-4" />
          </Button>
        </Hint>
      </div>
      <div>
        <HintItem
          icon={SearchIcon}
          label="Search"
          hint="Search and quickly jump to a page"
          shortcut="⌘+K"
          onClick={onOpenSearch}
        />
        <HintItem
          icon={SettingsIcon}
          label="Settings"
          hint="Manage your account and settings"
          shortcut="⌘+,"
          onClick={onOpenSettings}
        />
        <HintItem
          icon={GitPullRequestArrow}
          label="Workflows"
          hint="Manage your workflows"
          onClick={() => redirect?.(`/workflow`)}
        />
        <HintItem
          icon={CirclePlus}
          label="New page"
          hint="Create a new document"
          onClick={() => pages.onCreate?.("document")}
        />
      </div>
      <div className="mt-4 flex w-full flex-col gap-y-4">
        <FavoriteList
          isLoading={pages.isLoading}
          redirect={redirect}
          onCreate={pages.onCreate}
          onDuplicate={pages.onDuplicate}
          onUpdate={pages.onUpdate}
        />
        {Object.entries(GROUPS).map(([group, title]) => (
          <DocList
            key={group}
            isLoading={pages.isLoading}
            group={group}
            title={title}
            redirect={redirect}
            onCreate={pages.onCreate}
            onDuplicate={pages.onDuplicate}
            onUpdate={pages.onUpdate}
          />
        ))}
        <TrashBox
          isOpen={trashOpen}
          onOpenChange={setTrashOpen}
          onSelect={(id, group) => redirect?.(`/${group}/${id}`)}
          onRestore={(id) => pages.onUpdate?.(id, { isArchived: false })}
          onDelete={pages.onDelete}
        />
      </div>
      <div className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100" />
    </aside>
  );
});
