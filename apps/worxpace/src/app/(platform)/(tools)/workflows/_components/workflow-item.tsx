"use client";

import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

import type { Document } from "@acme/prisma";
import { CRUDItem } from "@acme/ui/custom";
import { Label, Switch } from "@acme/ui/shadcn";

import { archiveDocument, updateDocument } from "~/actions";
import { usePlatform } from "~/hooks";
import { toIconInfo, type WorkflowContent } from "~/lib";

interface WorkflowItemProps {
  workspaceId: string;
  workflow: Document;
}

const WorkflowItem = ({ workspaceId, workflow }: WorkflowItemProps) => {
  const { id, title, icon, content: $content } = workflow;
  const content = JSON.parse($content!) as WorkflowContent;
  /** Actions */
  const { toToolsPage } = usePlatform();
  const onError = (e: Error) => toast.error(e.message);
  /** Action: Publish / Unpublish */
  const { trigger: update } = useSWRMutation(
    `doc:${workspaceId}`,
    updateDocument,
    { onError },
  );
  const onPublishFlow = async (id: string, publish: boolean) => {
    const newContent = JSON.stringify({ ...content, isPublished: publish });
    await update({ id, content: newContent, log: true });
    toast.success(`${title} is currently ${publish ? "published" : "down"}`);
  };
  /** Action: Archive */
  const { trigger: archive } = useSWRMutation(
    `doc:${workspaceId}`,
    archiveDocument,
    { onError },
  );
  const onArchive = async (id: string) => {
    if (content.isPublished) await onPublishFlow(id, false);
    await archive({ id });
    toast.success(`Workflow moved into trash: ${title}`);
  };

  return (
    <div className="flex w-full items-center">
      <CRUDItem
        label={title}
        id={id}
        expandable={false}
        icon={toIconInfo(icon)}
        onClick={() => toToolsPage(id, "workflow")}
        onDelete={onArchive}
      />
      <div className="flex h-8 cursor-pointer items-center gap-2 px-2 hover:bg-primary/5">
        <Label
          htmlFor={id}
          className="cursor-pointer text-xs text-muted-foreground"
        >
          {content.isPublished ? "On" : "Off"}
        </Label>
        <Switch
          size="sm"
          id={id}
          onClick={() => void onPublishFlow(id, !content.isPublished)}
          defaultChecked={content.isPublished}
        />
      </div>
    </div>
  );
};

WorkflowItem.Skeleton = function WorkflowItemSkeleton() {
  return (
    <div className="flex w-full items-center">
      <CRUDItem.Skeleton />
    </div>
  );
};

export default WorkflowItem;
