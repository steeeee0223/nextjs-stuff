import type { Meta, StoryObj } from "@storybook/react";

import { MyConnections, myConnectionsColumns } from "@swy/ui/notion";

const meta = {
  title: "notion/Data Tables/My Connections",
  component: MyConnections,
  parameters: { layout: "centered" },
  tags: ["!autodocs"],
  render: (args) => (
    <div className="w-[480px]">
      <MyConnections {...args} />
    </div>
  ),
} satisfies Meta<typeof MyConnections>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: myConnectionsColumns,
    data: [
      {
        id: "connection-id",
        connection: { type: "github", account: "shadcn-ui" },
        scopes: ["Can preview links", "Can content"],
        onDisconnect: false,
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    columns: myConnectionsColumns,
    data: [],
  },
};
