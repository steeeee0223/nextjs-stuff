import type { Meta, StoryObj } from "@storybook/react";

import { TiptapEditor } from "@acme/ui/components";

const meta = {
  title: "tiptap/Editor",
  component: TiptapEditor,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof TiptapEditor>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    meta: {
      settings: { lock: false },
      content: {},
    },
  },
  render: (props) => (
    <div className="my-[50px]">
      <TiptapEditor {...props} />
    </div>
  ),
};
