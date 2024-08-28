import { format } from "date-fns";

import type { Account, Icon, Membership, Workspace } from "@acme/prisma";
import type { IconInfo, TreeItem } from "@acme/ui/custom";
import { Plan, Role } from "@acme/ui/notion";
import type {
  WorkspaceMemberships as PeopleData,
  SettingsStore,
  Workspace as WorkspaceData,
} from "@acme/ui/notion";

import { AccountMemberships, WorkspaceMembership } from "./account";
import type { DetailedDocument } from "./types";

export function generateDefaultIcon(group?: string): IconInfo {
  switch (group) {
    case "document":
      return { type: "lucide", name: "file" };
    case "kanban":
      return { type: "lucide", name: "columns-3" };
    case "whiteboard":
      return { type: "lucide", name: "presentation" };
    case "workflow":
      return { type: "lucide", name: "git-pull-request-arrow" };
    default:
      return { type: "emoji", emoji: " " };
  }
}

export function toIconInfo(icon?: Icon | null, defaultIcon?: string): IconInfo {
  if (!icon) return generateDefaultIcon(defaultIcon);
  const { type, src, color } = icon;
  switch (type) {
    case "emoji":
      return { type, emoji: src };
    case "lucide":
      return { type, name: src, color: color ?? undefined } as IconInfo;
    case "file":
      return { type, url: src };
  }
}

export function toIcon(info: IconInfo): Icon {
  switch (info.type) {
    case "emoji":
      return { type: info.type, src: info.emoji, color: null };
    case "lucide":
      return { type: info.type, src: info.name, color: info.color ?? null };
    case "file":
      return { type: info.type, src: info.url, color: null };
  }
}

export function toDateString(date: Date | string | number): string {
  return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
}

export function toTreeItem(doc: DetailedDocument): TreeItem {
  return {
    id: doc.id,
    title: doc.title,
    parentId: doc.parentId,
    icon: toIconInfo(doc.icon),
    group: doc.isArchived ? `trash:${doc.type}` : doc.type,
    lastEditedBy: doc.updatedBy.preferredName,
    lastEditedAt: toDateString(doc.updatedAt),
  };
}

export function toWorkspaceList(
  workspaceMembership: WorkspaceMembership,
): WorkspaceData[] {
  const { accountId, workspaces } = workspaceMembership;
  return workspaces.map(({ workspace }) => ({
    id: workspace.id,
    name: workspace.name,
    icon: toIconInfo(workspace.icon),
    role: Role[
      workspace.memberships.find(
        (membership) => membership.accountId === accountId,
      )!.role
    ],
    plan: Plan[workspace.plan],
    members: workspace.memberships.length,
  }));
}

export function toSettingsStore(
  account: AccountMemberships,
  workspace: Workspace,
): SettingsStore {
  const membership = account.memberships.find(
    ({ workspaceId }) => workspaceId === workspace.id,
  );
  return {
    account,
    workspace: {
      id: workspace.id,
      name: workspace.name,
      role: Role[membership!.role],
      icon: toIconInfo(workspace.icon),
      domain: workspace.domain,
      plan: Plan[workspace.plan],
    },
  };
}

export function toPeopleData(
  members: (Membership & { account: Account })[],
): PeopleData {
  const data: PeopleData = { members: [], guests: [] };
  members.forEach(({ role, account }) =>
    role === "GUEST"
      ? data.guests.push({
          account: {
            id: account.id,
            name: account.preferredName,
            avatarUrl: account.avatarUrl,
            email: account.email,
          },
          // TODO page access
          access: [],
        })
      : data.members.push({
          account: {
            id: account.id,
            name: account.preferredName,
            avatarUrl: account.avatarUrl,
            email: account.email,
          },
          teamspaces: {
            current: null,
            options: [],
          },
          groups: {
            current: null,
            options: [],
          },
          role: Role[role],
        }),
  );
  return data;
}
