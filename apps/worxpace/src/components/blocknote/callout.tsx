"use client";

import { defaultProps } from "@blocknote/core";
import type {
  BlockFromConfig,
  InlineContentSchema,
  PropSpec,
  StyleSchema,
} from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";

import { cn } from "@swy/ui/lib";
import { IconBlock, IconMenu, type IconInfo } from "@swy/ui/shared";

export interface CalloutBlockSpec {
  type: "callout";
  readonly propSchema: typeof defaultProps & {
    type: PropSpec<"emoji" | "lucide" | "file">;
    name: PropSpec<string>;
    emoji: PropSpec<string>;
    url: PropSpec<string>;
    color: PropSpec<string>;
  };
  content: "inline";
}

const getBlockIcon = (
  block: BlockFromConfig<CalloutBlockSpec, InlineContentSchema, StyleSchema>,
): IconInfo => {
  const { type, color, name, emoji, url } = block.props;
  switch (type) {
    case "emoji":
      return { type, emoji };
    case "lucide":
      return { type, name, color } as IconInfo;
    case "file":
      return { type, url };
    default:
      return { type: "text", text: ">" };
  }
};

// The Callout block.
export const Callout = createReactBlockSpec<
  CalloutBlockSpec,
  InlineContentSchema,
  StyleSchema
>(
  {
    type: "callout",
    propSchema: {
      ...defaultProps,
      type: { default: "emoji" },
      emoji: { default: "🚧" },
      name: { default: "" },
      url: { default: "" },
      color: { default: "default" },
    },
    content: "inline",
  },
  {
    render: (props) => {
      const backgroundColor = props.block.props.backgroundColor;

      return (
        <div className={cn("flex w-full p-4 pl-3", `bg-[${backgroundColor}]`)}>
          <div className="mt-0.5 shrink-0">
            {props.editor.isEditable ? (
              <IconMenu
                onSelect={(icon) =>
                  props.editor.updateBlock(props.block, {
                    type: "callout",
                    props: icon,
                  })
                }
                onRemove={() =>
                  props.editor.updateBlock(props.block, {
                    type: "callout",
                    props: {
                      type: "emoji",
                      name: "",
                      url: "",
                      emoji: "🚧",
                      color: "default",
                    },
                  })
                }
              >
                <IconBlock icon={getBlockIcon(props.block)} />
              </IconMenu>
            ) : (
              <IconBlock icon={getBlockIcon(props.block)} />
            )}
          </div>
          {/* Rich text field for user to type in */}
          <div className="w-full min-w-0 pl-2" ref={props.contentRef} />
        </div>
      );
    },
  },
);
