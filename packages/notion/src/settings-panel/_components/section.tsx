import React from "react";
import { CircleHelp } from "lucide-react";

import { cn } from "@swy/ui/lib";
import { Separator } from "@swy/ui/shadcn";

import { HintButton, PlanLink } from "./helper";

interface SectionProps extends React.PropsWithChildren {
  title: string;
  noSeparator?: boolean;
}
export const Section = ({
  title,
  noSeparator = false,
  children,
}: SectionProps) => {
  return (
    <div className="p-0">
      <h3 className="pb-3 text-base font-medium">{title}</h3>
      {!noSeparator && <Separator className="mb-4" />}
      <div>{children}</div>
    </div>
  );
};

interface SpacingProps {
  size?: "sm" | "md" | "lg";
}
export const Spacing = ({ size = "md" }: SpacingProps) => {
  const variant: Record<typeof size, string> = {
    sm: "18px",
    md: "48px",
    lg: "96px",
  };
  return <div className="w-full" style={{ height: variant[size] }} />;
};

interface SectionItemProps extends React.PropsWithChildren {
  title: string;
  description: React.ReactNode;
  titleProps?: string;
  plan?: string;
}
export const SectionItem = ({
  children,
  title,
  description,
  titleProps,
  plan,
}: SectionItemProps) => {
  return (
    <div className="flex cursor-default items-center justify-between">
      <div className="mr-[10%] flex w-full flex-col">
        <div className="flex items-center">
          <h3 className={cn("mb-0.5 flex p-0 text-sm font-normal", titleProps)}>
            {title}
          </h3>
          {!!plan && <PlanLink plan={plan} />}
        </div>
        <p className="w-4/5 text-xs text-secondary dark:text-secondary-dark">
          {description}
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
};

interface ContentProps extends React.PropsWithChildren {
  title: string;
  description?: React.ReactNode;
  plan?: string;
  hint?: string;
}

export const Content = ({
  children,
  title,
  description,
  plan,
  hint,
}: ContentProps) => {
  return (
    <div>
      <div className="mb-2 flex w-auto items-center text-sm font-normal">
        {title}
        {!!plan && <PlanLink plan={plan} />}
      </div>
      <div className="flex items-center">{children}</div>
      {description && (
        <p className="mt-2 text-xs text-secondary dark:text-secondary-dark">
          {description}
        </p>
      )}
      {hint && (
        <div className="mt-3">
          <HintButton icon={CircleHelp} label={hint} />
        </div>
      )}
    </div>
  );
};
