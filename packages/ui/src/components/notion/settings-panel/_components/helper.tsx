/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { LucideIcon } from "lucide-react";
import { Construction } from "lucide-react";

import { Hint } from "@/components/custom/hint";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HintButtonProps {
  icon: LucideIcon;
  label: string;
}

export const HintButton = ({ icon: Icon, label }: HintButtonProps) => {
  return (
    <Button variant="hint" size="xs">
      <Icon className="mr-1.5 h-3.5 w-3.5" />
      {label}
    </Button>
  );
};

interface PlanLinkProps {
  plan: string;
  onClick?: () => void;
}

export const PlanLink = ({ plan, onClick }: PlanLinkProps) => {
  return (
    <Hint
      description="Upgrade to use this feature. Click to learn more."
      variant="notion"
      size="sm"
      className="w-[174px]"
    >
      <div
        role="button"
        tabIndex={0}
        className="ml-2 flex cursor-pointer select-none items-center rounded-sm hover:bg-primary/10"
        onClick={onClick}
      >
        <Badge variant="blue" size="sm" className="whitespace-nowrap uppercase">
          {plan} ↗
        </Badge>
      </div>
    </Hint>
  );
};

export const NotImplemented = () => {
  return (
    <div className="inline-flex w-full items-center rounded-sm bg-primary/5 p-4 text-sm font-medium">
      <Construction color="#b9aa4b" className="mr-2 size-5" />
      Under construction
    </div>
  );
};
