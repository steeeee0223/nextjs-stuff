import type { Meta, StoryObj } from "@storybook/react";

import { Database } from "./database";

const meta = {
  title: "Database",
  component: Database,
  parameters: { layout: "centered" },
  render: () => (
    <div className="w-[480px]">
      <Database />
    </div>
  ),
} satisfies Meta<typeof Database>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
