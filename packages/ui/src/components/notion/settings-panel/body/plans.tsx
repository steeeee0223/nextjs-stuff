"use client";

import { useMediaQuery } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Help, Section, SectionSeparator, Star } from "../_components";
import { plans } from "./plans.data";

interface ActivePlanProps {
  plan: string;
}
const ActivePlan = ({ plan }: ActivePlanProps) => {
  const isLg = useMediaQuery("(min-width: 960px)");
  const isMd = useMediaQuery("(min-width: 900px)");
  const activePlan = plan as keyof typeof plans;
  return (
    <Section title="Active plan" noSeparator>
      <Card
        variant="notion"
        style={{ width: "unset" }}
        className={cn(
          "relative flex flex-col justify-between gap-8 rounded-xl p-5",
          isMd && "flex-row",
        )}
        button={false}
      >
        <CardContent className="p-0">
          <CardTitle className="relative flex items-center gap-1 self-stretch text-[22px]/[26px] tracking-[-0.1px]">
            {plans[activePlan].title} {activePlan === "education" && <Help />}
          </CardTitle>
          <CardDescription className="text-sm text-primary">
            {plans[activePlan].description}
          </CardDescription>
          <div className="text-xs text-[rgb(120,119,116)]">
            {plans[activePlan].comment}
          </div>
        </CardContent>
        <Card
          variant="notion"
          button={false}
          className={cn(
            "w-full flex-shrink-0 flex-grow basis-0 border-none bg-[rgb(249,249,248)] px-4 py-3.5",
            isLg && "max-w-[320px]",
          )}
        >
          <CardContent
            className={cn(
              "relative flex flex-col justify-between gap-1.5 p-0",
              isLg && "flex-row",
            )}
          >
            <div className="flex flex-col gap-1.5">
              <CardTitle className="relative flex items-center gap-1 self-stretch text-sm tracking-[-0.1px]">
                <Star /> Notion AI
              </CardTitle>
              <div className="text-xs text-[#787774]">
                Unlimited use of AI for Q&amp;A, Autofill, Writer, and more
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="blue" size="sm" className="h-7 px-2.5">
                Add to plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </Card>
    </Section>
  );
};

const FAQ = () => {
  return (
    <Section title="FAQ" noSeparator>
      <div className="mb-2 text-sm font-normal text-[#787774]">
        <a
          href="https://www.notion.so/help/category/plans-billing-and-payment"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer select-none underline transition hover:text-warning"
        >
          Plans, Billing & Payment
        </a>
      </div>
      <Button variant="notion" size="sm" tabIndex={0}>
        Message support
      </Button>
    </Section>
  );
};

export const Plans = () => {
  return (
    <>
      <ActivePlan plan="free" />
      <SectionSeparator />
      {/* <AllPlans /> */}
      <FAQ />
    </>
  );
};
