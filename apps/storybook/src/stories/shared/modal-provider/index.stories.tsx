import type { Meta, StoryObj } from "@storybook/react";

import { ModalProvider } from "@swy/ui/shared";

import { Trigger } from "./_components";

const meta = {
  title: "shared/Modal Provider",
  component: ModalProvider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ModalProvider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Trigger />,
  },
};
