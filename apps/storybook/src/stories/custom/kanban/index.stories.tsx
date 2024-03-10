import type { Meta, StoryObj } from "@storybook/react";

import { KanbanProvider } from "@acme/ui/components";

import { delay } from "../tree/utils";
import { CardModal } from "./_components";
import { defaultHandlers } from "./utils";

const meta = {
  title: "custom/Kanban",
  component: KanbanProvider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof KanbanProvider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-[400px]",
    fetchLists: async () => {
      await delay(2000);
      return [];
    },
    children: <CardModal />,
    ...defaultHandlers,
  },
};
