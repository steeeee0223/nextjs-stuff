import TableHeader from "./table-header";
import WorkflowItem from "./workflow-item";

const Workflows = () => {
  return (
    <div className="mx-auto p-6 md:max-w-3xl lg:max-w-4xl">
      <section className="m-2 flex flex-col gap-0">
        <TableHeader />
        <WorkflowItem
          id="1"
          name="Automation Workflow"
          description="Creating a test workflow"
          publish={false}
        />
        <WorkflowItem
          id="2"
          name="Automation Workflow 2"
          description="Creating a test workflow"
          publish={false}
        />
        <WorkflowItem
          id="3"
          name="Automation Workflow 3"
          description="Creating a test workflow"
          publish
        />
      </section>
    </div>
  );
};

export default Workflows;
