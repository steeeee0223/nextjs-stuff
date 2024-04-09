import type { UserState, Workspace } from "./workspace-provider";

export const createWorkspaceData = (
  name: string,
  id: number | string,
  user: UserState,
): Workspace => ({
  id: `mock-workspace-${id}`,
  name,
  icon: "🎑",
  owner: user.name,
  ownerId: user.id,
  members: [],
});

export const user: UserState = {
  id: "mock-user",
  name: "John",
  email: "john@example.com",
  isDarkMode: false,
  profilePicture: {
    url: "",
  },
};
export const workspaces: Workspace[] = [
  createWorkspaceData("John's Workspace", `personal`, user),
  createWorkspaceData("Workspace 1", 1, user),
  createWorkspaceData("Workspace 2", 2, user),
  createWorkspaceData("Workspace 3", 3, user),
];
