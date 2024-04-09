import type { Meta, StoryObj } from "@storybook/react";

import { WorkspaceProvider, WorkspaceSwitcher } from "@acme/ui/notion";

import { user, workspaces } from "./utils";

const meta = {
  title: "notion/Workspace Provider",
  component: WorkspaceProvider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof WorkspaceProvider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Swticher: Story = {
  args: {
    user,
    workspaces,
    initial: `dummy-workspace-personal`,
    className: "h-full",
    children: <WorkspaceSwitcher />,
  },
};
