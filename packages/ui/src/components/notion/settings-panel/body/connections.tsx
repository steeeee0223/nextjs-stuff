"use client";

import { ArrowUpRight, CircleHelp } from "lucide-react";

import { useTranslation } from "@swy/i18n";

import {
  MyConnections,
  myConnectionsColumns,
} from "@/components/notion/tables";
import type { ConnectionStrategy } from "@/components/notion/types";
import { Button } from "@/components/ui/button";
import { ConnectionCard, HintButton, Section, Spacing } from "../_components";
import { useSettings } from "../settings-context";
import { useConnections } from "./use-connections";

export const Connections = () => {
  const { connections: actions } = useSettings();
  /** i18n */
  const { t } = useTranslation("settings");
  const { title, buttons, discover } = t("my-connections", {
    returnObjects: true,
  });
  /** Connections & Cards */
  const { connections, displayCards, isToggle, toggle } = useConnections({
    load: actions.load,
  });

  return (
    <>
      <Section title={title} noSeparator>
        <MyConnections columns={myConnectionsColumns} data={connections} />
      </Section>
      <Spacing />
      <Section title={discover.title} noSeparator>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayCards.map((card, i) => (
            <ConnectionCard
              key={i}
              {...card}
              onConnect={async () =>
                await actions.add?.(card.id as ConnectionStrategy)
              }
            />
          ))}
        </div>
      </Section>
      <Button variant="hint" size="xs" className="mt-2.5 h-7" onClick={toggle}>
        {discover.buttons[isToggle ? "more" : "less"]}
      </Button>
      <Spacing size="sm" />
      <div className="flex-0 flex flex-col items-start">
        <HintButton icon={ArrowUpRight} label={buttons.browse} />
        <HintButton icon={ArrowUpRight} label={buttons.integrations} />
        <HintButton icon={CircleHelp} label={buttons.more} />
      </div>
    </>
  );
};
