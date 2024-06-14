import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@acme/ui/shadcn";

const meta = {
  title: "Shadcn/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Type your name" },
};
export const Notion: Story = {
  args: { variant: "notion", placeholder: "Paste a link" },
};
export const Search: Story = {
  args: { variant: "search", placeholder: "Search a website" },
};
