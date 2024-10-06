"use client";

import React from "react";
import { cn } from "@udecode/cn";
import {
  CommentResolveButton as CommentResolveButtonPrimitive,
  useComment,
} from "@udecode/plate-comments/react";

import { Icons } from "../icons";
import { buttonVariants } from "./button";

export function CommentResolveButton() {
  const comment = useComment()!;

  return (
    <CommentResolveButtonPrimitive
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "text-muted-foreground h-6 p-1",
      )}
    >
      {comment.isResolved ? (
        <Icons.refresh className="size-4" />
      ) : (
        <Icons.check className="size-4" />
      )}
    </CommentResolveButtonPrimitive>
  );
}
