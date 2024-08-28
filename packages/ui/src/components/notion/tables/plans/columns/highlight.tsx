import type { ColumnDef } from "@tanstack/react-table";

import { Hint } from "@/components/custom/hint";
import { Plan } from "@/components/notion/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListCell, PlanHeader } from "../cells";

export interface HighlightPlanRow
  extends Omit<Record<Plan, string[]>, Plan.EDUCATION> {
  title: string;
}

export const getHighlightColumns = (
  canUpgrade: boolean,
): ColumnDef<HighlightPlanRow>[] => [
  {
    accessorKey: "title",
    header: () => <div className="w-[118px]" />,
    cell: ({ row }) => (
      <div className="p-3 font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: Plan.FREE,
    header: () => (
      <PlanHeader title={"Free"} description={"$0 per member / month"} />
    ),
    cell: ({ row }) => <ListCell items={row.getValue("free")} />,
  },
  {
    accessorKey: Plan.PLUS,
    header: () => (
      <PlanHeader
        title={"Plus"}
        description={"$10 per member / month billed annually"}
        subtext="$12 billed monthly"
      >
        <Hint
          description="Only workspace owners can perform this action."
          variant="notion"
          size="sm"
          className={canUpgrade ? "hidden" : "w-[174px]"}
          triggerProps={cn(!canUpgrade && "cursor-default")}
        >
          <Button
            variant="notion"
            size="sm"
            className="h-7"
            disabled={!canUpgrade}
          >
            Upgrade
          </Button>
        </Hint>
      </PlanHeader>
    ),
    cell: ({ row }) => <ListCell items={row.getValue("plus")} />,
  },
  {
    accessorKey: Plan.BUSINESS,
    header: () => (
      <PlanHeader
        title={"Business"}
        description={"$15 per member / month billed annually"}
        subtext="$18 billed monthly"
      >
        <Hint
          description="Only workspace owners can perform this action."
          variant="notion"
          size="sm"
          className={canUpgrade ? "hidden" : "w-[174px]"}
          triggerProps={cn(!canUpgrade && "cursor-default")}
        >
          <Button
            variant="blue"
            size="sm"
            className="h-7"
            disabled={!canUpgrade}
          >
            Upgrade
          </Button>
        </Hint>
      </PlanHeader>
    ),
    cell: ({ row }) => <ListCell items={row.getValue("business")} />,
  },
  {
    accessorKey: Plan.ENTERPRISE,
    header: () => (
      <PlanHeader
        title={"Enterprise"}
        description={"Contact Sales for pricing"}
      >
        <Hint
          description="Only workspace owners can perform this action."
          variant="notion"
          size="sm"
          className={canUpgrade ? "hidden" : "w-[174px]"}
          triggerProps={cn(!canUpgrade && "cursor-default")}
        >
          <Button
            variant="notion"
            size="sm"
            className="h-7"
            disabled={!canUpgrade}
          >
            Contact sales
          </Button>
        </Hint>
      </PlanHeader>
    ),
    cell: ({ row }) => <ListCell items={row.getValue("enterprise")} />,
  },
];
