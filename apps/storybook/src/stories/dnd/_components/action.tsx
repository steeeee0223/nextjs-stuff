import React, { CSSProperties, forwardRef } from "react";

import { cn } from "@acme/ui/lib";

import styles from "./action.module.css";

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties["cursor"];
}

export const Action = forwardRef<HTMLButtonElement, ActionProps>(
  function Action({ active, className, cursor, style, ...props }, ref) {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(styles.Action, className)}
        tabIndex={0}
        style={
          {
            ...style,
            cursor,
            "--fill": active?.fill,
            "--background": active?.background,
          } as CSSProperties
        }
      />
    );
  },
);
