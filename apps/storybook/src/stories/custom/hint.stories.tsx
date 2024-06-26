import type { Meta, StoryObj } from "@storybook/react";
import { HelpCircle } from "lucide-react";

import { Hint } from "@acme/ui/custom";

const meta = {
  title: "custom/Hint",
  component: Hint,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Hint>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: "Shows some messages",
    children: <HelpCircle className="h-4 w-4" />,
  },
};

export const Notion: Story = {
  args: {
    variant: "notion",
    description: "Shows some messages",
    children: <HelpCircle className="h-4 w-4" />,
  },
};
