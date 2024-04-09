import type { UserState, Workspace } from "@acme/ui/notion";

const createWorkspaceData = (
  name: string,
  id: number | string,
  user: UserState,
): Workspace => ({
  id: `dummy-workspace-${id}`,
  name,
  icon: "🎑",
  owner: user.name,
  ownerId: user.id,
  members: [],
});

export const user: UserState = {
  id: "dummy-user",
  name: "Steve",
  email: "steve@example.com",
  isDarkMode: false,
  profilePicture: {
    url: "",
  },
};
export const workspaces: Workspace[] = [
  createWorkspaceData("Steve's Workspace", `personal`, user),
  createWorkspaceData("Workspace 1", 1, user),
  createWorkspaceData("Workspace 2", 2, user),
  createWorkspaceData("Workspace 3", 3, user),
];
