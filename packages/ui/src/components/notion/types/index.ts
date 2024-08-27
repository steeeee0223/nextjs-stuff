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
