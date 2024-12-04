import { format } from "date-fns";

import type {
  DocItemData,
  Page,
  WorkspaceMemberships as PeopleData,
  SettingsStore,
  Workspace as WorkspaceData,
} from "@swy/notion";
import type { Account, Icon, Membership, Workspace } from "@swy/prisma";
import type { IconInfo } from "@swy/ui/shared";
import { Plan, Role } from "@swy/validators";

import type { AccountMemberships, WorkspaceMembership } from "./account";
import type { DetailedDocument } from "./types";

export function toIconInfo(icon?: Icon | null, fallback?: string): IconInfo {
  if (!icon) return { type: "text", text: fallback ?? " " };
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

export function toIcon(info: IconInfo): Icon | null {
  switch (info.type) {
    case "emoji":
      return { type: info.type, src: info.emoji, color: null };
    case "lucide":
      return { type: info.type, src: info.name, color: info.color ?? null };
    case "file":
      return { type: info.type, src: info.url, color: null };
    default:
      return null;
  }
}

export function toDateString(date: Date | string | number): string {
  return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
}

export function toDocItem(doc: DetailedDocument): DocItemData {
  return {
    id: doc.id,
    title: doc.title,
    parentId: doc.parentId,
    icon: toIconInfo(doc.icon),
    group: doc.isArchived ? `trash:${doc.type}` : doc.type,
    lastEditedBy: doc.updatedBy.preferredName,
    lastEditedAt: doc.updatedAt.getMilliseconds(),
  };
}

export function toPage(doc?: DetailedDocument): Page | null {
  return doc
    ? {
        id: doc.id,
        title: doc.title,
        type: doc.type,
        isArchived: doc.isArchived,
        isPublished: doc.isPublished,
        icon: toIconInfo(doc.icon),
        coverImage: doc.coverImage,
        createdBy: doc.createdBy.preferredName,
        lastEditedBy: doc.updatedBy.preferredName,
        createdAt: toDateString(doc.createdAt),
        lastEditedAt: toDateString(doc.updatedAt),
      }
    : null;
}

export function toWorkspaceList(
  workspaceMembership: WorkspaceMembership,
): WorkspaceData[] {
  const { accountId, workspaces } = workspaceMembership;
  return workspaces.map(({ workspace }) => ({
    id: workspace.id,
    name: workspace.name,
    icon: toIconInfo(workspace.icon, workspace.name),
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
  origin: string,
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
      icon: toIconInfo(workspace.icon, workspace.name),
      inviteLink: `${origin}/invite/${workspace.inviteToken}`,
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
          user: {
            id: account.id,
            name: account.preferredName,
            avatarUrl: account.avatarUrl,
            email: account.email,
          },
          // TODO page access
          access: [],
        })
      : data.members.push({
          user: {
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
