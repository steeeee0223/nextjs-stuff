"use client";

import { defaultProps } from "@blocknote/core";
import type {
  CustomBlockConfig,
  InlineContentSchema,
  PropSpec,
  StyleSchema,
} from "@blocknote/core";
import {
  createReactBlockSpec,
  ReactCustomBlockImplementation,
} from "@blocknote/react";

import { CRUDItem, type CRUDItemProps } from "@acme/ui/custom";
import { cn } from "@acme/ui/lib";

import { usePlatform } from "~/hooks";

export interface PageBlockSpec extends CustomBlockConfig {
  type: "page";
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
  const { toToolsPage } = usePlatform();
  const item: CRUDItemProps = {
    expandable: false,
    id: pageId,
    level: 0,
    label: "Untitled",
    onClick: () => toToolsPage(pageId, "document"),
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
