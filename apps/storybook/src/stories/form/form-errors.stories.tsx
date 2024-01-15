import type { Meta, StoryObj } from "@storybook/react";

import { FormErrors } from "@acme/ui/components";

const meta = {
  title: "form/Form Errors",
  component: FormErrors,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof FormErrors>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "email",
    errors: {
      email: ["Email should contain an `@` sign"],
    },
  },
};
