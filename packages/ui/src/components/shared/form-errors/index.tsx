import { XCircle } from "lucide-react";

import { cn } from "@swy/ui/lib";

export interface FormErrorProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormErrors = ({ id, errors }: FormErrorProps) => {
  if (!errors) return null;
  return (
    <div
      className="mt-2 text-xs text-rose-500"
      aria-live="polite"
      id={`${id}-error`}
    >
      {errors[id]?.map((error) => (
        <div
          key={error}
          className={cn(
            "flex items-center",
            "rounded-sm border border-rose-500 bg-rose-500/10 p-2 font-medium",
          )}
        >
          <XCircle className="mr-2 h-4 w-4" />
          {error}
        </div>
      ))}
    </div>
  );
};
