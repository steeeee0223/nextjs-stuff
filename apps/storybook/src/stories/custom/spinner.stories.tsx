import type { Meta, StoryObj } from "@storybook/react";

import { Spinner } from "@swy/ui/custom";

const meta = {
  title: "custom/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
