import type { Meta, StoryObj } from "@storybook/react";

import {
  WorkspaceSwitcher,
  type UserState,
  type WorkspaceState,
} from "@acme/ui/components";

const meta = {
  title: "notion/Workspace Switcher",
  component: WorkspaceSwitcher,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof WorkspaceSwitcher>;
export default meta;

type Story = StoryObj<typeof meta>;

const mockWorkspace: WorkspaceState = {
  icon: "🎑",
  pages: [],
  name: "workspace 1",
  id: "dummy-workspace-1",
  members: ["Steve", "John"],
};

const mockUser: UserState = {
  id: "dummy-user",
  name: "Steve",
  email: "steve@example.com",
  isDarkMode: false,
  profilePicture: {
    url: "",
  },
  workspaces: [
    {
      icon: "🎑",
      name: "workspace 1",
      id: "dummy-workspace-1",
      favorites: [],
    },
    {
      icon: "🎑",
      name: "workspace 2",
      id: "dummy-workspace-2",
      favorites: [],
    },
    {
      icon: "🎑",
      name: "workspace 3",
      id: "dummy-workspace-3",
      favorites: [],
    },
  ],
};

export const Default: Story = {
  args: {
    initialUser: mockUser,
    initialWorkspace: mockWorkspace,
  },
};
