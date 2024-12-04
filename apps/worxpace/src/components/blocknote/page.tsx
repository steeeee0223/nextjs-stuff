"use client";

import { defaultProps } from "@blocknote/core";
import type {
  InlineContentSchema,
  PropSpec,
  StyleSchema,
} from "@blocknote/core";
import {
  createReactBlockSpec,
  ReactCustomBlockImplementation,
} from "@blocknote/react";

import { cn } from "@swy/ui/lib";
import { CRUDItem, type CRUDItemProps } from "@swy/ui/shared";

export interface PageBlockSpec {
  type: "page";
  content: "none";
  readonly propSchema: Pick<typeof defaultProps, "backgroundColor"> & {
    pageId: PropSpec<string>;
    title: PropSpec<string>;
  };
}

// The Page block
const PageBlock: ReactCustomBlockImplementation<
  PageBlockSpec,
  InlineContentSchema,
  StyleSchema
>["render"] = (props) => {
  /** Meta */
  const { backgroundColor, pageId } = props.block.props;
  /** Item */
  const item: CRUDItemProps = {
    expandable: false,
    id: pageId,
    level: 0,
    label: "Untitled",
    onClick: () => console.log(`go to ${pageId}`),
  };

  return (
    <div className={cn("flex w-full", `bg-[${backgroundColor}]`)}>
      <CRUDItem {...item} />
    </div>
  );
};

// The Page block spec
export const Page = createReactBlockSpec<
  PageBlockSpec,
  InlineContentSchema,
  StyleSchema
>(
  {
    type: "page",
    propSchema: {
      backgroundColor: { default: "default" },
      pageId: { default: "" },
      title: { default: "Untitled" },
    },
    content: "none",
  },
  { render: PageBlock },
);
