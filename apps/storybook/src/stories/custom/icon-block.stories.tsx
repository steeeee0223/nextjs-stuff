import type { Meta, StoryObj } from "@storybook/react";

import { IconBlock } from "@acme/ui/custom";

const meta = {
  title: "custom/Icon Block",
  component: IconBlock,
  tags: ["autodocs"],
} satisfies Meta<typeof IconBlock>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    defaultIcon: { type: "emoji", emoji: "🚀" },
  },
};
export const NonEditable: Story = {
  args: {
    size: "md",
    defaultIcon: { type: "emoji", emoji: "🚀" },
    editable: false,
  },
};
export const Lucide: Story = {
  args: {
    size: "md",
    defaultIcon: { type: "lucide", name: "badge-euro", color: "#3e9392" },
  },
};
export const ImageUrl: Story = {
  args: {
    size: "md",
    defaultIcon: { type: "file", url: "https://github.com/shadcn.png" },
  },
};
