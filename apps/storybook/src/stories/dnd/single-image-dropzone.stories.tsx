import type { Meta, StoryObj } from "@storybook/react";

import { SingleImageDropzone } from "@acme/ui/components";

const meta = {
  title: "dnd/Single Image Dropzone",
  component: SingleImageDropzone,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SingleImageDropzone>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
