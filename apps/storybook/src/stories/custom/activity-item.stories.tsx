import type { Meta, StoryObj } from "@storybook/react";

import { ActivityItem } from "@swy/ui/custom";

const meta = {
  title: "custom/Activity Item",
  component: ActivityItem,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ActivityItem>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      username: "John Doe",
      avatar: "https://github.com/shadcn.png",
      action: "CREATE",
      entity: { entityId: "1", title: "README.md", type: "note" },
      createdAt: new Date(),
    },
  },
};
