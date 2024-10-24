/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { LucideIcon } from "lucide-react";
import { Construction } from "lucide-react";

import { Trans, TransProps } from "@swy/i18n";
import { cn } from "@swy/ui/lib";
import { Badge, Button, buttonVariants } from "@swy/ui/shadcn";
import { Hint } from "@swy/ui/shared";

interface HintButtonProps {
  className?: string;
  icon: LucideIcon;
  label: string;
}

export const HintButton = ({
  icon: Icon,
  label,
  className,
}: HintButtonProps) => {
  return (
    <Button variant="hint" size="xs" className={className}>
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
      className="w-[174px]"
    >
      <div
        role="button"
        tabIndex={0}
        className={cn(
          buttonVariants({ variant: "hint" }),
          "ml-2 flex size-auto p-0",
        )}
        onClick={onClick}
      >
        <Badge variant="blue" size="sm" className="whitespace-nowrap uppercase">
          {plan} ↗
        </Badge>
      </div>
    </Hint>
  );
};

interface TextLinkProps
  extends Pick<TransProps, "i18nKey" | "values">,
    React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    > {}

export const TextLink = ({
  i18nKey,
  values,
  children = "-",
  ...props
}: TextLinkProps) => {
  return (
    <Trans
      i18nKey={i18nKey}
      values={values}
      components={{
        Link: (
          <a
            rel="noopener noreferrer"
            className="cursor-pointer select-none underline transition hover:text-red"
            {...props}
          >
            {children}
          </a>
        ),
      }}
    />
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
