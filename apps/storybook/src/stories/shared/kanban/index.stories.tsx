import type { Meta, StoryObj } from "@storybook/react";

import { KanbanProvider } from "@swy/ui/shared";

import { CardModal } from "./_components";
import { defaultHandlers } from "./utils";

const meta = {
  title: "shared/Kanban",
  component: KanbanProvider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof KanbanProvider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-[400px]",
    initialLists: [],
    children: <CardModal />,
    ...defaultHandlers,
  },
};
