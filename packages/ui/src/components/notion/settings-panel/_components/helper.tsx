import type { LucideIcon } from "lucide-react";
import { Construction } from "lucide-react";

import { Button } from "@/components/ui/button";

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

export const NotImplemented = () => {
  return (
    <div className="inline-flex w-full items-center rounded-sm bg-primary/5 p-4 text-sm font-medium">
      <Construction color="#b9aa4b" className="mr-2 size-5" />
      Under construction
    </div>
  );
};
