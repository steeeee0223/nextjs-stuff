import { ArrowUpRight, CircleHelp } from "lucide-react";

import { useTranslation } from "@acme/i18n";

import { Separator } from "@/components/ui/separator";
import {
  HintButton,
  NotImplemented,
  Section,
  SectionSeparator,
} from "../_components";

export const Connections = () => {
  /** i18n */
  const { t } = useTranslation("settings");
  const { title, buttons } = t("my-connections", { returnObjects: true });

  return (
    <>
      <Section title={title}>
        <NotImplemented />
      </Section>
      <SectionSeparator />
      <Separator className="mb-4 bg-primary/15" />
      <div className="flex-0 flex flex-col items-start">
        <HintButton icon={ArrowUpRight} label={buttons.browse} />
        <HintButton icon={ArrowUpRight} label={buttons.integrations} />
        <HintButton icon={CircleHelp} label={buttons.more} />
      </div>
    </>
  );
};
