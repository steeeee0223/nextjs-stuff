"use client";

import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

import { CRUDItem, Spinner, useTree } from "@acme/ui/custom";
import { Label, Switch } from "@acme/ui/shadcn";

import { archiveDocument } from "~/actions";
import { usePages } from "~/hooks";
import { toIconInfo } from "~/lib";
import TableHeader from "./table-header";

interface WorkflowsProps {
  workspaceId: string;
}

const Workflows = ({ workspaceId }: WorkflowsProps) => {
  const { onClickItem } = useTree();
  const { documents, isLoading } = usePages(workspaceId);
  const workflows = documents?.filter(
    ({ type, isArchived }) => type === "workflow" && !isArchived,
  );
  /** Action: Archive */
  const { trigger: archive } = useSWRMutation(
    `doc:${workspaceId}`,
    archiveDocument,
    {
      onSuccess: (data) =>
        toast.success(`Workflow moved into trash: ${data.item.title}`),
      onError: (e: Error) => toast.error(e.message),
    },
  );
  /** @todo implement the switch action */
  const publish = true;
  const onPublishFlow = async (id: string) => {
    // const response = await onFlowPublish(
    //   id,
    //   event.target.ariaChecked === 'false'
    // )
    // if (response) toast.message(response)
    toast.message(`publishing flow: ${id.slice(0, 5)}`);
  };

  return (
    <div className="mx-auto p-6 md:max-w-3xl lg:max-w-4xl">
      <section className="m-2 flex flex-col gap-0">
        <TableHeader />
        {isLoading || !workflows ? (
          <Spinner />
        ) : (
          workflows.map(({ title, id, icon }) => (
            <div key={id} className="flex w-full items-center">
              <CRUDItem
                label={title}
                id={id}
                expandable={false}
                icon={toIconInfo(icon)}
                onClick={() => onClickItem?.(id, "workflow")}
                onDelete={(id) => void archive({ id })}
              />
              <div className="flex h-8 cursor-pointer items-center gap-2 px-2 hover:bg-primary/5">
                <Label
                  htmlFor={id}
                  className="cursor-pointer text-xs text-muted-foreground"
                >
                  {publish ? "On" : "Off"}
                </Label>
                <Switch
                  size="sm"
                  id={id}
                  onClick={() => onPublishFlow(id)}
                  defaultChecked={publish}
                />
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Workflows;
