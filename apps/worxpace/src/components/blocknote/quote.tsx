"use client";

import type { InlineContentSchema, StyleSchema } from "@blocknote/core";
import { defaultProps } from "@blocknote/core";
import {
  createReactBlockSpec,
  ReactCustomBlockImplementation,
} from "@blocknote/react";

import { cn } from "@acme/ui/lib";

export interface QuoteSpec {
  type: "quote";
  content: "inline";
  readonly propSchema: typeof defaultProps;
}

// The Quote block.
const QuoteBlock: ReactCustomBlockImplementation<
  QuoteSpec,
  InlineContentSchema,
  StyleSchema
>["render"] = (props) => {
  const backgroundColor = props.block.props.backgroundColor;

  return (
    <div
      className={cn(
        "flex w-full border-l-4 border-primary px-4",
        `bg-[${backgroundColor}]`,
      )}
    >
      <div className="w-full min-w-0" ref={props.contentRef} />
    </div>
  );
};

export const Quote = createReactBlockSpec<
  QuoteSpec,
  InlineContentSchema,
  StyleSchema
>(
  { type: "quote", propSchema: defaultProps, content: "inline" },
  { render: QuoteBlock },
);
