import type { Meta, StoryObj } from "@storybook/react";

import { BlockEditor } from "../block-editor";

const meta = {
  title: "blocknote/Block Editor",
  component: BlockEditor,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof BlockEditor>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-full z-[100]",
  },
};
