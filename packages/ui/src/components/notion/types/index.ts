import { IconInfo } from "@/components/custom/icon-block";

export type UploadFile = (
  file: File,
  options?: {
    /** @params replaceTargetUrl: provide the URL to replaced with */
    replaceTargetUrl?: string;
  },
) => Promise<{ url: string }>;

export type ConnectionStrategy =
  | "slack"
  | "google-drive"
  | "figma"
  | "github"
  | "gitlab"
  | "grid"
  | "jira";

export enum Role {
  OWNER = "owner",
  MEMBER = "member",
  GUEST = "guest",
}

export enum Plan {
  FREE = "free",
  EDUCATION = "education",
  PLUS = "plus",
  BUSINESS = "business",
  ENTERPRISE = "enterprise",
}

export enum Scope {
  /** People */
  MemberInvite = "people:invite", // ❌ plan: education, role: member
  MemberRead = "people:read", // ❌ guest
  MemberAdd = "people:add", // ❌ plan: education
  MemberAddRequest = "people:add:request", // role: member
  MemberUpdate = "people:update", // only workspace owner can upgrade/downgrade/delete member/guest(s)
  GroupEnable = "people:group:enable", // ❌ plan: education, free
  /** Plans */
  Upgrade = "plan:upgrade", // ✅ owner
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
}

export interface CoverImageInfo {
  type: "file" | "url";
  url: string;
}

export interface Page {
  id: string;
  title: string;
  type: string;
  isArchived: boolean;
  coverImage: CoverImageInfo | null;
  icon: IconInfo | null;
  // parentId: string | null;
  // content: string | null;
  isPublished: boolean;
  createdAt: string;
  lastEditedAt: string;
  createdBy: string;
  lastEditedBy: string;
}
