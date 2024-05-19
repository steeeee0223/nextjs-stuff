"use client";

import { usePages } from "~/hooks";
import TableHeader from "./table-header";
import WorkflowItem from "./workflow-item";

interface WorkflowsProps {
  workspaceId: string;
}

const Workflows = ({ workspaceId }: WorkflowsProps) => {
  const { documents, isLoading } = usePages(workspaceId);
  const workflows = documents?.filter(
    ({ type, isArchived }) => type === "workflow" && !isArchived,
  );

  return (
    <div className="mx-auto p-6 md:max-w-3xl lg:max-w-4xl">
      <section className="m-2 flex flex-col gap-0">
        <TableHeader />
        {isLoading || !workflows
          ? Array.from("123").map((x) => <WorkflowItem.Skeleton key={x} />)
          : workflows.map((workflow) => (
              <WorkflowItem
                key={workflow.id}
                workspaceId={workspaceId}
                workflow={workflow}
              />
            ))}
      </section>
    </div>
  );
};

export default Workflows;
