"use client";

import { useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { Trans, useTranslation } from "@acme/i18n";

import { Hint } from "@/components/custom/hint";
import * as Icon from "@/components/notion/icons";
import {
  contentColumns,
  ContentTable,
  getHighlightColumns,
  HighlightTable,
} from "@/components/notion/tables";
import { Plan, Scope } from "@/components/notion/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Section, SectionSeparator } from "../_components";
import { useSettings } from "../settings-context";
import { contentTables, highlightData } from "./plans.data";

const styles = {
  description: "text-sm font-normal text-[#787774]",
};

interface ActivePlanProps {
  activePlan: Plan;
  canUpgrade: boolean;
}
const ActivePlan = ({ activePlan, canUpgrade }: ActivePlanProps) => {
  const isMd = useMediaQuery("(min-width: 900px)");
  /** i18n */
  const { t } = useTranslation("settings");
  const { active } = t("plans", { returnObjects: true });
  return (
    <Section title={active.title} noSeparator>
      <Card
        variant="notion"
        style={{ width: "unset" }}
        className="relative flex flex-wrap justify-between gap-8 rounded-xl p-5 dark:bg-popover-dark"
        button={false}
      >
        <CardContent className="flex flex-col gap-1.5 p-0">
          <CardTitle className="relative flex items-center gap-1 self-stretch text-[22px]/[26px] tracking-[-0.1px]">
            {active.plan[activePlan].title}{" "}
            {activePlan === Plan.EDUCATION && <Icon.Help />}
          </CardTitle>
          <CardDescription className="text-sm text-primary">
            {active.plan[activePlan].description}
          </CardDescription>
          <div className="text-xs text-[#787774]">
            {active.plan[activePlan].comment}
          </div>
        </CardContent>
        <Card
          variant="notion"
          button={false}
          className="w-full max-w-[300px] flex-shrink-0 flex-grow basis-0 flex-wrap border-none bg-[#f9f9f8] px-4 py-3.5 dark:bg-modal-dark"
        >
          <CardContent
            className={cn(
              "relative flex flex-wrap justify-between gap-1.5 p-0",
              isMd && "flex-nowrap",
            )}
          >
            <div className="flex flex-col gap-1.5">
              <CardTitle className="relative flex items-center gap-1 self-stretch text-sm tracking-[-0.1px]">
                <Icon.Star /> {active.ai.title}
              </CardTitle>
              <div className="text-xs text-[#787774]">
                {active.ai.description}
              </div>
            </div>
            <div className="flex items-center">
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
                  className="h-7 px-2.5"
                  disabled={!canUpgrade}
                >
                  {active.ai.button}
                </Button>
              </Hint>
            </div>
          </CardContent>
        </Card>
      </Card>
    </Section>
  );
};

const AllPlans = ({ canUpgrade }: { canUpgrade: boolean }) => {
  /** i18n */
  const { t } = useTranslation("settings");
  const { "all-plans": allPlans } = t("plans", { returnObjects: true });
  /** Handlers */
  const [toggle, setToggle] = useState(true);
  const highlightColumns = useMemo(
    () => getHighlightColumns(canUpgrade),
    [canUpgrade],
  );
  return (
    <Section title={allPlans.title} noSeparator>
      <div className={cn(styles.description, "mb-4")}>
        <Trans
          i18nKey="plans.all-plans.description"
          components={{
            Link: (
              <a
                href="https://www.notion.so/help/category/plans-billing-and-payment"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer select-none underline transition hover:text-warning"
              >
                -
              </a>
            ),
          }}
        />
      </div>
      <div className="flex w-full flex-col items-center gap-5">
        <div className="sticky top-[-36px] z-10 w-full">
          <HighlightTable
            type="highlight"
            columns={highlightColumns}
            data={highlightData}
          />
        </div>
        {!toggle && (
          <div className="flex w-full flex-col gap-7 py-[22px] opacity-100">
            {contentTables.map(({ title, data }) => (
              <div key={title} className="flex w-full flex-col gap-3">
                <div className="px-3 text-xs font-semibold text-primary/65">
                  {title}
                </div>
                <ContentTable
                  type="content"
                  columns={contentColumns}
                  data={data}
                />
              </div>
            ))}
          </div>
        )}
        <Button
          variant="hint"
          size="sm"
          className="h-7 font-semibold text-primary"
          onClick={() => setToggle((prev) => !prev)}
        >
          {toggle ? "Compare all features" : "Collapse"}
        </Button>
        <Separator className="bg-primary/10" />
      </div>
    </Section>
  );
};

export const Plans = () => {
  const {
    scopes,
    settings: { workspace },
  } = useSettings();
  const canUpgrade = scopes.has(Scope.Upgrade);
  /** i18n */
  const { t } = useTranslation("settings");
  const { education, faq } = t("plans", { returnObjects: true });

  return (
    <>
      <ActivePlan activePlan={workspace.plan} canUpgrade={canUpgrade} />
      <SectionSeparator />
      <AllPlans canUpgrade={canUpgrade} />
      <SectionSeparator />
      {/* This part is optional! only `free` plan can see this */}
      {workspace.plan === Plan.FREE && (
        <>
          <Section title={education.title} noSeparator>
            <div className={cn(styles.description, "mb-2")}>
              <Trans
                i18nKey="plans.education.description"
                components={{
                  Link: (
                    <a
                      href="https://www.notion.so/product/notion-for-education"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer select-none underline transition hover:text-warning"
                    >
                      -
                    </a>
                  ),
                }}
              />
            </div>
            <Button variant="notion" size="sm" tabIndex={0}>
              {education.button}
            </Button>
          </Section>
          <SectionSeparator />
        </>
      )}
      <Section title={faq.title} noSeparator>
        <div className={cn(styles.description, "mb-2")}>
          <a
            href="https://www.notion.so/help/category/plans-billing-and-payment"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer select-none underline transition hover:text-warning"
          >
            {faq.description}
          </a>
        </div>
        <Button variant="notion" size="sm" tabIndex={0}>
          {faq.button}
        </Button>
      </Section>
    </>
  );
};
