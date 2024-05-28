import { ArrowUpRight, CircleHelp } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import {
  HintButton,
  NotImplemented,
  Section,
  SectionSeparator,
} from "../_components";

export const Connections = () => {
  return (
    <>
      <Section title="My connections">
        <NotImplemented />
      </Section>
      <SectionSeparator />
      <Separator className="mb-4 bg-primary/15" />
      <div className="flex-0 flex flex-col items-start">
        <HintButton icon={ArrowUpRight} label="Browse connections in Gallery" />
        <HintButton
          icon={ArrowUpRight}
          label="Develop or manage integrations"
        />
        <HintButton icon={CircleHelp} label="Learn more about notifications" />
      </div>
    </>
  );
};
