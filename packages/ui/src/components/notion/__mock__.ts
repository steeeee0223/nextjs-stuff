import { Plan, Role } from "./types";
import type { UserState, Workspace } from "./workspace-provider";

export const user: UserState = {
  id: "dummy-user",
  name: "Steve",
  email: "steve@example.com",
};
export const workspaces: Workspace[] = [
  {
    id: "dummy-workspace-personal",
    icon: { type: "lucide", name: "activity", color: "#CB912F" },
    name: "John's Workspace",
    members: 1,
    plan: Plan.EDUCATION,
    role: Role.OWNER,
  },
  {
    id: "dummy-workspace-1",
    name: "Workspace 1",
    icon: { type: "lucide", name: "briefcase", color: "#337EA9" },
    members: 3,
    plan: Plan.FREE,
    role: Role.OWNER,
  },
  {
    id: "dummy-workspace-2",
    name: "Workspace 2",
    icon: { type: "emoji", emoji: "🎨" },
    members: 2,
    plan: Plan.BUSINESS,
    role: Role.MEMBER,
  },
  {
    id: "dummy-workspace-3",
    name: "Workspace 3",
    icon: { type: "emoji", emoji: "🚧" },
    members: 8,
    plan: Plan.ENTERPRISE,
    role: Role.GUEST,
  },
];
