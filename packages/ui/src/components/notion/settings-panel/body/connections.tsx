"use client";

import { useState } from "react";
import { ArrowUpRight, CircleHelp } from "lucide-react";

import { useTranslation } from "@acme/i18n";

import { Button } from "@/components/ui/button";
import {
  ConnectionCard,
  HintButton,
  Section,
  SectionSeparator,
} from "../_components";
import { MyConnections, myConnectionsColumns } from "../../tables";
import { cards } from "./connections.data";

export const Connections = () => {
  /** i18n */
  const { t } = useTranslation("settings");
  const { title, buttons } = t("my-connections", { returnObjects: true });
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => setToggle((prev) => !prev);

  return (
    <>
      <Section title={title} noSeparator>
        <MyConnections
          variant="notion"
          columns={myConnectionsColumns}
          data={[]}
        />
      </Section>
      <SectionSeparator />
      <Section title="Discover new connections" noSeparator>
        <div className="grid grid-cols-3 gap-4">
          {cards.slice(0, toggle ? 3 : undefined).map((card, i) => (
            <ConnectionCard key={i} {...card} />
          ))}
        </div>
      </Section>
      <Button
        variant="hint"
        size="xs"
        className="mt-2.5 h-7"
        onClick={handleToggle}
      >
        {toggle ? "See all" : "Show less"}
      </Button>
      <SectionSeparator size="sm" />
      <div className="flex-0 flex flex-col items-start">
        <HintButton icon={ArrowUpRight} label={buttons.browse} />
        <HintButton icon={ArrowUpRight} label={buttons.integrations} />
        <HintButton icon={CircleHelp} label={buttons.more} />
      </div>
    </>
  );
};
