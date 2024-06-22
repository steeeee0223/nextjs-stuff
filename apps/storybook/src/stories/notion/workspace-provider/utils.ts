import type { UserState, Workspace } from "@acme/ui/notion";

export const user: UserState = {
  id: "dummy-user",
  name: "Steve",
  email: "steve@example.com",
};
export const workspaces: Workspace[] = [
  {
    id: "dummy-workspace-personal",
    name: "John's Workspace",
    icon: { type: "lucide", name: "activity", color: "#CB912F" },
    members: 1,
    plan: "Education Plus Plan",
    role: "owner",
  },
  {
    id: "dummy-workspace-1",
    name: "Workspace 1",
    icon: { type: "lucide", name: "briefcase", color: "#337EA9" },
    members: 3,
    plan: "Free Plan",
    role: "owner",
  },
  {
    id: "dummy-workspace-2",
    name: "Workspace 2",
    icon: { type: "emoji", emoji: "🎨" },
    members: 2,
    plan: "Business Plan",
    role: "member",
  },
  {
    id: "dummy-workspace-3",
    name: "Workspace 3",
    icon: { type: "emoji", emoji: "🚧" },
    members: 8,
    plan: "Enterprise Plan",
    role: "guest",
  },
];
