/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { useEffect, useRef, useState } from "react";
import { Check, GripVertical } from "lucide-react";

import { DropdownMenuItem } from "@/components/ui";
import type { Page } from "./index.types";
import { useUser } from "./use-user";
import { useWorkspace } from "./use-workspace";

const styles = {
  display_container: "select-none",
  workspace_tab:
    "flex justify-between cursor-pointer hover:bg-primary/5 rounded-sm",
  workspace_info: "flex gap-2.5 p-0",
  workspace_icon: "self-center text-2xl",
  drag_handle:
    "pl-2 fill-primary self-center cursor-grab text-muted-foreground",
  workspace_title: "text-primary text-sm self-center",
  workspace_check: "select-none self-center h-4 w-4 mr-4",
};

interface WorkspaceListProps {
  onUpdateWorkspace?: (data: { id: string; pages: Page[] }) => Promise<void>;
}

const WorkspaceList = ({ onUpdateWorkspace }: WorkspaceListProps) => {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const user = useUser();
  const initialWorkspaces = user.info?.workspaces;
  const currentWorkspace = useWorkspace();
  const [workspaces, setWorkspaces] = useState(initialWorkspaces);

  const handleSort = () => {
    const _workspaces = [...workspaces!];
    const [dragItemContent] = _workspaces.splice(dragItem.current!, 1);

    _workspaces.splice(dragOverItem.current!, 0, dragItemContent!);

    dragItem.current = null;
    dragOverItem.current = null;

    setWorkspaces(_workspaces);
  };

  const handleClick = async (workspaceId: string) => {
    const _workspace = workspaces!.find(({ id }) => id === workspaceId)!;
    currentWorkspace.select({ ..._workspace, pages: [], members: [] });

    await onUpdateWorkspace?.({
      id: currentWorkspace.info?.id ?? "",
      pages: [],
    });
  };

  useEffect(() => {
    if (workspaces?.length !== initialWorkspaces?.length)
      setWorkspaces(initialWorkspaces);
  }, [workspaces, initialWorkspaces]);

  return (
    <div className={styles.display_container}>
      {workspaces?.map((workspace, i) => (
        <DropdownMenuItem
          key={i}
          className={styles.workspace_tab}
          draggable
          onDragStart={() => (dragItem.current = i)}
          onDragEnter={() => (dragOverItem.current = i)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => handleClick(workspace.id)}
        >
          <div className={styles.workspace_info}>
            <GripVertical className={styles.drag_handle} />
            <div draggable={false} className={styles.workspace_icon}>
              {workspace.icon}
            </div>
            <div
              className={styles.workspace_title}
              onClick={() => handleClick(workspace.id)}
            >
              {workspace.name}
            </div>
          </div>
          {currentWorkspace.info?.id === workspace.id && (
            <Check className={styles.workspace_check} />
          )}
        </DropdownMenuItem>
      ))}
    </div>
  );
};

export default WorkspaceList;
