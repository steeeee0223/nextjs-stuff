import type { Meta, StoryObj } from "@storybook/react";

import { FormSubmit } from "@acme/ui/components";

const meta = {
  title: "form/Form Submit",
  component: FormSubmit,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof FormSubmit>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Submit" },
};
