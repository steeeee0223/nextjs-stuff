import {
  // defaultBlockSchema,
  // defaultBlockSpecs,
  defaultProps,
} from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";

export const TodoBlock = createReactBlockSpec(
  {
    type: "todo",
    propSchema: {
      ...defaultProps,
      checked: {
        default: false,
      },
    },
    content: "none",
  },
  {
    render: ({ block, contentRef }) => {
      console.log(block);

      return (
        <div>
          <input type="checkbox" />
          <p ref={contentRef}>{block.content}</p>
        </div>
      );
    },
    parse: (_element) => {
      return {
        checked: false,
      };
    },
  },
);
