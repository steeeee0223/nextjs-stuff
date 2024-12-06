"use client";

import Image from "next/image";
import { PlusCircle } from "lucide-react";

import { Button } from "@swy/ui/shadcn";

import { useDocuments, usePlatform } from "~/hooks";

interface Params {
  params: { workspaceId: string };
}

const Workspace = ({ params: { workspaceId } }: Params) => {
  const { clerkId, accountId, workspace } = usePlatform();
  const { create } = useDocuments({ clerkId, workspaceId });
  /** Action */
  const onSubmit = () =>
    void create({
      title: "Untitled",
      parentId: undefined,
      type: "document",
      workspaceId,
      accountId,
    });

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {workspace.name || "WorXpace"}
      </h2>
      <form action={onSubmit}>
        <Button type="submit">
          <PlusCircle className="mr-2 size-4" />
          Create a note
        </Button>
      </form>
    </div>
  );
};

export default Workspace;
