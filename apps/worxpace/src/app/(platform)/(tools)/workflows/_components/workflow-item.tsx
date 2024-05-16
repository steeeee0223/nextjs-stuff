import { toast } from "sonner";

import { CRUDItem, type IconInfo } from "@acme/ui/custom";
import { Label, Switch } from "@acme/ui/shadcn";

interface WorkflowProps {
  name: string;
  description: string;
  id: string;
  publish: boolean | null;
}

const Workflow = ({ name, id, publish }: WorkflowProps) => {
  const icon: IconInfo = {
    type: "lucide",
    name: "git-pull-request-arrow",
  };
  const onPublishFlow = async () => {
    // const response = await onFlowPublish(
    //   id,
    //   event.target.ariaChecked === 'false'
    // )
    // if (response) toast.message(response)
    toast.message(`publishing flow`);
  };

  return (
    <div className="flex w-full items-center">
      <CRUDItem label={name} key={id} id={id} expandable={false} icon={icon} />
      <div className="flex h-8 cursor-pointer items-center gap-2 px-2 hover:bg-primary/5">
        <Label
          htmlFor={id}
          className="cursor-pointer text-xs text-muted-foreground"
        >
          {publish! ? "On" : "Off"}
        </Label>
        <Switch
          size="sm"
          id={id}
          onClick={onPublishFlow}
          defaultChecked={publish!}
        />
      </div>
    </div>
  );
};

export default Workflow;
