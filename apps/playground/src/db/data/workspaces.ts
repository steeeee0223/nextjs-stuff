import { Plan } from "@swy/validators";

import type { WorkspaceModel } from "../types";
import { _USER } from "./accounts";

export enum _WORKSPACE {
  W1 = "f12d4c5b-2d3b-4d2b-aef3-8f7319c5d481",
  W2 = "b3c2a6e8-9231-4a9b-a89e-7d36d3f35ec2",
  W3 = "a2c4e8d7-4b7e-45d9-bb3d-1f9e6fbe7d4f",
  W4 = "c1d7e9b6-7a3d-4b2e-a8b3-9f7e6c5d3a2f",
  W5 = "d9b3f6a2-5c4e-7b2d-8a3f-1f9e6c7d4b2e",
}

export const workspaces: Record<string, WorkspaceModel> = {
  [_WORKSPACE.W1]: {
    id: _WORKSPACE.W1,
    name: "Alpha Workspace",
    icon: { type: "emoji", emoji: "🚀" },
    domain: "alpha-workspace.com",
    plan: Plan.FREE,
    inviteToken: _WORKSPACE.W1,
    createdBy: _USER.U1,
    lastEditedAt: Date.UTC(2024, 1, 31),
  },
  [_WORKSPACE.W2]: {
    id: _WORKSPACE.W2,
    name: "Beta Labs",
    icon: { type: "lucide", name: "goal", color: "#D44C47" },
    domain: "beta-labs.org",
    plan: Plan.EDUCATION,
    inviteToken: _WORKSPACE.W2,
    createdBy: _USER.U3,
    lastEditedAt: Date.UTC(2024, 2, 26),
  },
  [_WORKSPACE.W3]: {
    id: _WORKSPACE.W3,
    name: "Gamma Studio",
    icon: { type: "emoji", emoji: "🎨" },
    domain: "gamma-studio.net",
    plan: Plan.PLUS,
    inviteToken: _WORKSPACE.W3,
    createdBy: _USER.U1,
    lastEditedAt: Date.UTC(2024, 3, 14),
  },
  [_WORKSPACE.W4]: {
    id: _WORKSPACE.W4,
    name: "Delta Group",
    icon: { type: "text", text: "D" },
    domain: "delta-group.com",
    plan: Plan.BUSINESS,
    inviteToken: _WORKSPACE.W4,
    createdBy: _USER.U2,
    lastEditedAt: Date.UTC(2024, 4, 29),
  },
  [_WORKSPACE.W5]: {
    id: _WORKSPACE.W5,
    name: "Epsilon Enterprises",
    icon: null,
    domain: "epsilon-ent.com",
    plan: Plan.ENTERPRISE,
    inviteToken: _WORKSPACE.W5,
    createdBy: _USER.U2,
    lastEditedAt: Date.UTC(2024, 7, 17),
  },
};
