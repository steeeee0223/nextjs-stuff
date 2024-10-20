import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Select, type SelectProps } from "@swy/ui/custom";

const meta = {
  title: "custom/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;
export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story["render"] = ({ value, ...props }) => {
  const [currentValue, setCurrentValue] = useState(value);
  return <Select {...props} value={currentValue} onChange={setCurrentValue} />;
};

export const Default: Story = {
  args: {
    options: {
      on: "On",
      off: "Off",
    },
    value: "on",
  },
  render: Template,
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
    value: "on",
    customDisplay: Custom,
  },
  render: Template,
};
