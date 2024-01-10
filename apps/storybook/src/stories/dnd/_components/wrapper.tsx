import { CSSProperties, PropsWithChildren } from "react";

import { cn } from "@acme/ui/lib";

interface WrapperProps extends PropsWithChildren {
  center?: boolean;
  style?: CSSProperties;
}

export function Wrapper({ children, center, style }: WrapperProps) {
  return (
    <div
      className={cn(
        "box-border flex w-full justify-start p-[20px]",
        center && "justify-center",
      )}
      style={style}
    >
      {children}
    </div>
  );
}
