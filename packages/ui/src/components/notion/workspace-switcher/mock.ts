import { UserState, WorkspaceState } from "./index.types";

export const mockWorkspace: WorkspaceState = {
  icon: "🎑",
  pages: [],
  name: "workspace 1",
  id: "dummy-workspace-1",
  members: ["Steve", "John"],
};

export const mockUser: UserState = {
  id: "dummy-user",
  name: "Steve",
  email: "steve@example.com",
  isDarkMode: false,
  profilePicture: {
    url: "https://github.com/shadcn.png",
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
