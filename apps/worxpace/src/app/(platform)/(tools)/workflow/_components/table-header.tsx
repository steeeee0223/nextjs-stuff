"use client";

import { PlusSquare } from "lucide-react";

import { useModal } from "@acme/ui/custom";
import { Button, Separator } from "@acme/ui/shadcn";

import WorkflowModal from "./workflow-create-modal";
import WorkflowForm from "./workflow-form";

interface TableHeaderProps {
  accountId: string;
  workspaceId: string;
}

const TableHeader = (props: TableHeaderProps) => {
  const { setOpen } = useModal();
  const handleClick = () => {
    void setOpen(
      <WorkflowModal
        title="Create a Workflow Automation"
        subheading="Workflows are a powerfull that help you automate tasks"
      >
        <WorkflowForm {...props} />
      </WorkflowModal>,
    );
  };

  return (
    <div>
      <div className="flex items-center gap-x-2">
        <div className="flex-1 pl-4 text-sm font-semibold">Workflows</div>
        <Button
          variant="blue"
          className="px-2 py-1"
          size="sm"
          onClick={handleClick}
        >
          <PlusSquare className="mr-2 size-4" />
          Add workflow
        </Button>
      </div>
      <Separator className="my-1" />
    </div>
  );
};

export default TableHeader;
