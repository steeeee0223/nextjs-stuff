"use client";

import { useDocuments } from "~/hooks";
import TableHeader from "./table-header";
import WorkflowItem from "./workflow-item";

interface WorkflowsProps {
  accountId: string;
  workspaceId: string;
}

const Workflows = ({ accountId, workspaceId }: WorkflowsProps) => {
  const { documents, isLoading } = useDocuments({ workspaceId });
  const workflows = documents?.filter(
    ({ type, isArchived }) => type === "workflow" && !isArchived,
  );

  return (
    <div className="mx-auto p-6 md:max-w-3xl lg:max-w-4xl">
      <section className="m-2 flex flex-col gap-0">
        <TableHeader accountId={accountId} workspaceId={workspaceId} />
        {isLoading || !workflows
          ? Array.from("123").map((x) => <WorkflowItem.Skeleton key={x} />)
          : workflows.map((workflow) => (
              <WorkflowItem
                key={workflow.id}
                accountId={accountId}
                workspaceId={workspaceId}
                workflow={workflow}
              />
            ))}
      </section>
    </div>
  );
};

export default Workflows;
