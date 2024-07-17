"use client";

import Image from "next/image";
import { PlusCircle } from "lucide-react";

import { cn } from "@acme/ui/lib";
import { useWorkspace } from "@acme/ui/notion";
import { Button } from "@acme/ui/shadcn";

import { theme } from "~/constants/theme";
import { useDocuments, usePlatform } from "~/hooks";

interface Params {
  params: { workspaceId: string };
}

const Workspace = ({ params: { workspaceId } }: Params) => {
  const { activeWorkspace } = useWorkspace();
  const { accountId } = usePlatform();
  const { create } = useDocuments({ workspaceId });
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
    <div
      className={cn(
        theme.flex.center,
        "h-full flex-col justify-center space-y-4",
      )}
    >
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
        Welcome to {activeWorkspace?.name ?? "WorXpace"}
      </h2>
      <form action={onSubmit}>
        <Button type="submit">
          <PlusCircle className={cn(theme.size.icon, "mr-2")} />
          Create a note
        </Button>
      </form>
    </div>
  );
};

export default Workspace;
