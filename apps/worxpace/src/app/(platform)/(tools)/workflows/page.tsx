"use client";

import type { Document } from "@acme/prisma";

import DocHeader from "~/components/doc-header";
import { useClient } from "~/hooks";
import Workflows from "./_components/workflows";

const Page = () => {
  const { workspaceId, userId, orgId } = useClient();
  const page = {
    id: `workflow:${workspaceId}`,
    title: "Workflows",
    parentId: null,
    type: "dashboard:workflow",
    coverImage: null,
    icon: { type: "lucide", src: "git-pull-request-arrow", color: null },
    userId,
    orgId,
    isArchived: false,
    isPublished: false,
  } as Document;

  return (
    <div className="pb-40">
      <DocHeader document={page} preview />
      <Workflows />
    </div>
  );
};

export default Page;
