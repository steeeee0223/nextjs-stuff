import { type PropsWithChildren } from "react";

import { Separator } from "@/components/ui";
import { cn } from "@/lib";

interface SectionProps extends PropsWithChildren {
  title: string;
}
export const Section = ({ title, children }: SectionProps) => {
  return (
    <div className="p-0">
      <h3 className="pb-3 text-base font-medium">{title}</h3>
      <Separator className="text-primary/9 mb-4" />
      <div>{children}</div>
    </div>
  );
};

interface SectionSeparatorProps {
  size?: "sm" | "md" | "lg";
}
export const SectionSeparator = ({ size = "md" }: SectionSeparatorProps) => {
  const variant: Record<typeof size, string> = {
    sm: "18px",
    md: "48px",
    lg: "96px",
  };
  return <div className="w-full" style={{ height: variant[size] }} />;
};

interface SectionItemProps extends PropsWithChildren {
  title: string;
  description: string;
  titleProps?: string;
}
export const SectionItem = ({
  children,
  title,
  description,
  titleProps,
}: SectionItemProps) => {
  return (
    <div className="flex cursor-default items-center justify-between">
      <div className="mr-[10%] flex flex-col">
        <h3 className={cn("mb-0.5 flex p-0 text-sm font-normal", titleProps)}>
          {title}
        </h3>
        <p className="text-xs text-primary/65">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};
