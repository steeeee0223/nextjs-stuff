"use client";

// import type { Document } from "@swy/prisma";
import { PageHeader } from "@swy/notion";

import { usePlatform } from "~/hooks";
import Workflows from "./_components/workflows";

const Page = () => {
  const { clerkId, accountId, workspaceId } = usePlatform();
  // const page = {
  //   workspaceId,
  //   id: `workflow:${workspaceId}`,
  //   title: "Workflows",
  //   parentId: null,
  //   type: "dashboard:workflow",
  //   coverImage: null,
  //   icon: { type: "lucide", src: "git-pull-request-arrow", color: null },
  //   isArchived: false,
  //   isPublished: false,
  // } as Document;

  return (
    <div className="pb-40">
      <PageHeader preview />
      <Workflows
        clerkId={clerkId}
        accountId={accountId}
        workspaceId={workspaceId}
      />
    </div>
  );
};

export default Page;
