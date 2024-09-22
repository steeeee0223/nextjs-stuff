import type { Meta, StoryObj } from "@storybook/react";

import { Select, type SelectProps } from "@acme/ui/custom";

const meta = {
  title: "custom/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: {
      on: "On",
      off: "Off",
    },
    defaultValue: "on",
  },
};

const Custom: SelectProps["customDisplay"] = ({ option }) => (
  <div className="truncate text-secondary dark:text-secondary-dark">
    {typeof option === "string" ? option : option?.label}
  </div>
);

export const CustomDisplay: Story = {
  args: {
    options: {
      on: { label: "On", description: "Turn on notification" },
      off: { label: "Off", description: "Turn on notification" },
    },
    defaultValue: "on",
    customDisplay: Custom,
  },
};
