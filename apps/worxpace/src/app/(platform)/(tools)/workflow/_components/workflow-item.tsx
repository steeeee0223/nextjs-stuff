"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { Document } from "@swy/prisma";
import { Label, Switch } from "@swy/ui/shadcn";
import { CRUDItem, CRUDItemSkeleton } from "@swy/ui/shared";

import { useDocuments } from "~/hooks";
import { toIconInfo, type WorkflowContent } from "~/lib";

interface WorkflowItemProps {
  clerkId: string;
  accountId: string;
  workspaceId: string;
  workflow: Document;
}

const WorkflowItem = ({
  clerkId,
  accountId,
  workspaceId,
  workflow,
}: WorkflowItemProps) => {
  const router = useRouter();
  const { id, title, icon, content: $content } = workflow;
  const content = JSON.parse($content!) as WorkflowContent;
  /** Actions */
  const { archive, update } = useDocuments({ clerkId, workspaceId });
  const onPublishFlow = async (id: string, publish: boolean) => {
    const newContent = JSON.stringify({ ...content, isPublished: publish });
    await update({
      id,
      content: newContent,
      log: true,
      accountId,
      workspaceId,
    });
    toast.success(`${title} is currently ${publish ? "published" : "down"}`);
  };
  const onArchive = async (id: string) => {
    if (content.isPublished) await onPublishFlow(id, false);
    await archive({ id, accountId, workspaceId });
  };

  return (
    <div className="flex w-full items-center">
      <CRUDItem
        label={title}
        id={id}
        expandable={false}
        icon={toIconInfo(icon)}
        onClick={() => router.push(`/workflow/${id}`)}
        onDelete={onArchive}
      />
      <div className="flex h-8 cursor-pointer items-center gap-2 px-2 hover:bg-primary/5">
        <Label
          htmlFor={id}
          className="cursor-pointer text-xs text-muted dark:text-muted-dark"
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
      <CRUDItemSkeleton />
    </div>
  );
};

export default WorkflowItem;
