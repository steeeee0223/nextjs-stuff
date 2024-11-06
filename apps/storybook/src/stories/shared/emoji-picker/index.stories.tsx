import type { Meta, StoryObj } from "@storybook/react";

import { EmojiPicker } from "@swy/ui/shared";

import CrudIcon from "./crud-icon";

const meta = {
  title: "shared/Emoji Picker",
  component: EmojiPicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof EmojiPicker>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CrudIcon />,
};
