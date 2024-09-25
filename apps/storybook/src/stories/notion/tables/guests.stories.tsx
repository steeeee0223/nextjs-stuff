import type { Meta, StoryObj } from "@storybook/react";

import { getGuestColumns, GuestsTable, Scope } from "@swy/ui/notion";

import { mockMemberships } from "../__mock__";

const meta = {
  title: "notion/Data Tables/Guests",
  component: GuestsTable,
  parameters: { layout: "centered" },
  tags: ["!autodocs"],
  render: (args) => (
    <div className="w-[480px]">
      <GuestsTable {...args} />
    </div>
  ),
} satisfies Meta<typeof GuestsTable>;
export default meta;

type Story = StoryObj<typeof meta>;

const guestColumns = getGuestColumns(new Set(Object.values(Scope)));

export const Default: Story = {
  args: {
    columns: guestColumns,
    data: mockMemberships.guests,
  },
};

export const Empty: Story = {
  args: {
    columns: guestColumns,
    data: [],
  },
};
