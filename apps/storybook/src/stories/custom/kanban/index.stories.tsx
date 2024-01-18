import type { Meta, StoryObj } from "@storybook/react";

import type { KanbanList } from "@acme/ui/components";
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
      const lists = [] as KanbanList[];
      await delay(2000);
      return { data: lists };
    },
    children: <CardModal />,
    ...defaultHandlers,
  },
};
