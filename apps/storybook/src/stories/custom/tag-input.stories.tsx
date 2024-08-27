import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TagInput } from "@acme/ui/custom";

const meta = {
  title: "custom/Tag Input",
  component: TagInput,
  tags: ["autodocs"],
} satisfies Meta<typeof TagInput>;
export default meta;

type Story = StoryObj<typeof TagInput>;

const Template: Story["render"] = (args) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [input, setInput] = useState("");
  return (
    <TagInput
      {...args}
      value={{ tags: emails, input }}
      onTagsChange={setEmails}
      onInputChange={setInput}
    />
  );
};

export const Default: Story = {
  args: {
    placeholder: "Search name or emails",
  },
  render: Template,
};
