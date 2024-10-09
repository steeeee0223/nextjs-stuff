export interface WorkspaceKey {
  type: "workspace";
  clerkId: string;
}

export interface SettingsKey {
  type: "settings";
  clerkId: string;
  workspaceId?: string;
}

export interface SettingsPeopleKey {
  type: "settings:people";
  clerkId: string;
  workspaceId: string;
}

export interface DocumentKey {
  type: "document";
  documentId: string;
  preview: boolean;
}

export interface DocumentsKey {
  type: "document";
  workspaceId: string;
}

export interface KanbanKey {
  type: "kanban";
  boardId: string;
}

export interface HistoryKey {
  type: "history";
  pageId: string;
}

export interface InvitationKey {
  type: "invitation";
  clerkId?: string | null;
  token: string;
}
export interface StrictedInvitationKey extends InvitationKey {
  clerkId: string;
}
