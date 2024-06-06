/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { LucideIcon } from "lucide-react";
import { Construction } from "lucide-react";

import { Hint } from "@/components/custom/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import { styles } from "../body/utils";

interface HintButtonProps {
  icon: LucideIcon;
  label: string;
}

export const HintButton = ({ icon: Icon, label }: HintButtonProps) => {
  return (
    <Button className="inline-flex h-6 select-none rounded-sm bg-inherit px-1.5 text-xs text-primary/50 shadow-none hover:bg-primary/10">
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
      className={cn(styles.tooltip, "w-[174px]")}
    >
      <div
        role="button"
        tabIndex={0}
        className="ml-2 flex cursor-pointer select-none items-center rounded-sm hover:bg-primary/10"
        onClick={onClick}
      >
        <div className="whitespace-nowrap rounded-sm bg-[#2383e2]/10 px-1.5 py-0.5 text-[9px] font-medium uppercase leading-none text-[#2383e2]">
          {plan} ↗
        </div>
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
