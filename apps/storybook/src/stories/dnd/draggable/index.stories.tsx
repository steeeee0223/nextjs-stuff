import type { Meta, StoryObj } from "@storybook/react";

import { Draggable } from "../draggable";

const meta = {
  title: "dnd/Draggable",
  component: Draggable,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Draggable>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
