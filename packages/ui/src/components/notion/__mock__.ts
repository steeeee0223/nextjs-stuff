import { Plan, Role, User } from "./types";
import type { Workspace } from "./workspace-provider";

export const user: User = {
  id: "123",
  name: "John Wick",
  avatarUrl: "https://avatarfiles.alphacoders.com/370/370979.jpg",
  email: "john-wick@example.com",
};
export const workspaces: Workspace[] = [
  {
    id: "workspace-0",
    name: "John's Private",
    icon: { type: "lucide", name: "activity", color: "#CB912F" },
    members: 1,
    plan: Plan.EDUCATION,
    role: Role.OWNER,
  },
  {
    id: "workspace-1",
    name: "Workspace 1",
    icon: { type: "lucide", name: "briefcase", color: "#337EA9" },
    members: 3,
    plan: Plan.FREE,
    role: Role.OWNER,
  },
  {
    id: "workspace-2",
    name: "Workspace 2",
    icon: { type: "emoji", emoji: "🎨" },
    members: 2,
    plan: Plan.BUSINESS,
    role: Role.MEMBER,
  },
  {
    id: "workspace-3",
    name: "Workspace 3",
    icon: { type: "emoji", emoji: "🚧" },
    members: 8,
    plan: Plan.ENTERPRISE,
    role: Role.GUEST,
  },
];
