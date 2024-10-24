import type { Meta, StoryObj } from "@storybook/react";

import { IconPicker } from "@swy/ui/shared";

import CrudIcon from "./crud-icon";

const meta = {
  title: "shared/Icon Picker",
  component: IconPicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof IconPicker>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CrudIcon />,
};
