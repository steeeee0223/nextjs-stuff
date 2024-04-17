import type { Meta, StoryObj } from "@storybook/react";

import { Unsplash } from "@acme/ui/custom";

const meta = {
  title: "custom/Unsplash",
  component: Unsplash,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Unsplash>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-[540px]",
    apiKey: "UNSPLASH_ACCESS_KEY",
    onSelect: (url) => console.log(`select ${url}`),
  },
};
