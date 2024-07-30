/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import stableHash from "stable-hash";

import { IconBlock } from "@/components/custom/icon-block";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { Workspace } from "../index.types";
import { useWorkspace } from "../workspace-context";
import { DragHandle, Globe } from "./icons";

interface TitleProps {
  workspace: Workspace;
  onClick: (workspaceId: string) => void;
}
const Title = ({ workspace, onClick }: TitleProps) => {
  switch (workspace.role) {
    case "guest":
      return (
        <div className="mx-2 min-w-0">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primary">
            <div className="flex">
              <span className="flex-shrink overflow-hidden text-ellipsis">
                {workspace.name}
              </span>
              <Badge
                variant="orange"
                size="sm"
                className="ml-2 select-none self-center whitespace-nowrap uppercase"
              >
                <Globe className="mr-0.5 inline size-2 flex-shrink-0 fill-[#cf8807] align-middle" />
                Guest
              </Badge>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="mx-2 min-w-0">
          <div
            className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primary"
            onClick={() => onClick(workspace.id)}
          >
            {workspace.name}
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-primary/65">
            {workspace.plan} · {workspace.members} members
          </div>
        </div>
      );
  }
};

interface WorkspaceListProps {
  onSelect?: (id: string) => Promise<void>;
}

const WorkspaceList = ({ onSelect }: WorkspaceListProps) => {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const {
    workspaces: initialWorkspaces,
    activeWorkspace,
    select,
  } = useWorkspace();
  const [workspaces, setWorkspaces] = useState(initialWorkspaces);

  const handleSort = () => {
    const _workspaces = [...workspaces];
    const [dragItemContent] = _workspaces.splice(dragItem.current!, 1);

    _workspaces.splice(dragOverItem.current!, 0, dragItemContent!);

    dragItem.current = null;
    dragOverItem.current = null;

    setWorkspaces(_workspaces);
  };

  const handleClick = (workspaceId: string) => {
    select(workspaceId);
    void onSelect?.(workspaceId);
  };

  useEffect(() => {
    if (workspaces?.length !== initialWorkspaces?.length)
      setWorkspaces(initialWorkspaces);
  }, [workspaces, initialWorkspaces]);

  return (
    <div className="select-none">
      {workspaces?.map((workspace, i) => (
        <DropdownMenuItem
          key={i}
          className="flex h-11 items-center rounded-sm px-0 py-1 text-sm/[120%] focus:bg-primary/5"
          draggable
          onDragStart={() => (dragItem.current = i)}
          onDragEnter={() => (dragOverItem.current = i)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => handleClick(workspace.id)}
        >
          <div className="visible mx-1 flex h-6 w-[18px] flex-shrink-0 cursor-grab items-center justify-center">
            <DragHandle className="block size-3 flex-shrink-0 fill-primary/45" />
          </div>
          <div draggable={false} className="flex items-center">
            <IconBlock
              editable={false}
              size="md"
              defaultIcon={workspace.icon}
              key={stableHash(workspace.icon)}
            />
          </div>
          <Title workspace={workspace} onClick={handleClick} />
          {activeWorkspace?.id === workspace.id && (
            <div className="ml-auto mr-1 size-4 flex-shrink-0">
              <Check className="mr-2 h-4 w-4 select-none self-center" />
            </div>
          )}
        </DropdownMenuItem>
      ))}
    </div>
  );
};

export default WorkspaceList;
