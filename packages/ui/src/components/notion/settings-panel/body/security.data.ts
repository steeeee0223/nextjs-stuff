import type { PanelData } from "./utils";

export const card = {
  business: {
    title: "Upgrade for SAML SSO & more admin tools",
    description:
      "The Business Plan includes single sign-on to manage employee access at scale, private teamspaces to collaborate on sensitive docs, and more.",
    action: "Upgrade to Business",
  },
  enterprise: {
    title: "Upgrade for SCIM, advanced security & more",
    description:
      "The Enterprise Plan allows you to automatically provision users and groups, and gain more visibility and controls across the workspace.",
    action: "Upgrade to Enterprise",
  },
} as const;

const $security = [
  "share",
  "edit",
  "duplicate",
  "export",
  "invite",
  "guest",
  "member",
] as const;

export const security: PanelData<typeof $security> = {
  share: {
    plan: "enterprise",
    title: "Disable public page sharing",
    description:
      "Disable the Share to web option in the Share menu on every page in this workspace.",
  },
  edit: {
    plan: "enterprise",
    title: "Prevent members from editing the Workspace section",
    description:
      "Disable the ability for members to create, move, reorder, and delete top-level Workspace pages.",
  },
  duplicate: {
    plan: "enterprise",
    title: "Disable duplicating pages to other workspaces",
    description:
      "Prevent anyone from duplicating pages to other workspaces via the Move To or Duplicate To actions.",
  },
  export: {
    plan: "enterprise",
    title: "Disable export",
    description: "Prevent anyone from exporting as Markdown, CSV, or PDF.",
  },
  invite: {
    plan: "enterprise",
    title: "Disable members inviting guests to pages",
    description: "Your workspace currently has 0 guest.",
  },
  guest: {
    plan: "enterprise",
    title: "Allow members to request adding guests",
    description: "Requests must be approved by a workspace owner.",
  },
  member: {
    plan: "plus",
    title: "Allow members to request adding other members",
    description: "Members can submit requests to admins to add more members.",
  },
};
