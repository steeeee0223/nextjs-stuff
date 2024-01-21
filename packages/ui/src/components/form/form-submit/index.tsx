"use client";

import type { ReactNode } from "react";

import type { ButtonProps } from "@/components/ui";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface FormSubmitProps {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: ButtonProps["variant"];
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant,
}: FormSubmitProps) => {
  return (
    <Button
      type="submit"
      disabled={disabled}
      variant={variant}
      size="sm"
      className={cn(className)}
    >
      {children}
    </Button>
  );
};
