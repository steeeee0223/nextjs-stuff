import { PanelData } from "./utils";

const $identity = [
  "domains",
  "creation",
  "claim",
  "dashboard",
  "profile",
  "external",
  "pervention",
  "session",
  "logout",
  "password",
  "SAML",
  "login",
  "autoCreation",
  "linked",
  "SCIM",
  "workspaceId",
] as const;

export const identity: PanelData<typeof $identity> = {
  domains: {
    title: "Verified domains",
    description:
      "Verify ownership of an email domain to access advanced security features including single-sign on.",
    plan: "business",
  },
  creation: {
    title: "Workspace creation",
    description: "Customize who can create new workspaces.",
    plan: "enterprise",
  },
  claim: {
    title: "Claim workspaces",
    description:
      "Claim workspaces created by users with a verified domain or require owners to use an external domain.",
    plan: "enterprise",
  },
  dashboard: {
    title: "Managed users dashboard",
    description: "Manage and view users that are using your verified domains.",
    plan: "enterprise",
  },
  profile: {
    title: "Allow managed users to change profile information",
    description:
      "Control if managed users can change their preferred name, email address, and profile photo.",
    plan: "enterprise",
  },
  external: {
    title: "External workspace access",
    description:
      "Control if managed users are able to join workspaces that aren't owned by your organization.",
    plan: "enterprise",
  },
  pervention: {
    title: "Prevent managed users from granting support access",
    description:
      "Control if managed users can enable support access on their accounts.",
    plan: "enterprise",
  },
  session: {
    title: "Session duration",
    description:
      "Control how long your managed users can be logged in for before they must re-authenticate.",
    plan: "enterprise",
  },
  logout: {
    title: "Log out all users",
    description:
      "Force log out all managed users and require them to re-authenticate.",
    plan: "enterprise",
  },
  password: {
    title: "Reset passwords for all users",
    description:
      "Force reset the passwords for all managed users and require them to create a new one the next time they log in.",
    plan: "enterprise",
  },
  SAML: {
    title: "Enable SAML SSO",
    description:
      "Workspace members can log in with SAML SSO if their email address uses a verified domain.",
    plan: "business",
  },
  login: {
    title: "Login method",
    description:
      "Customize how users access workspaces that have SAML SSO enabled. Workspace owners can always log in with a password.",
    plan: "business",
  },
  autoCreation: {
    title: "Automatic account creation",
    description:
      "Automatically create Notion accounts for new users who log in via SAML SSO.",
  },
  linked: {
    title: "Linked workspaces",
    description:
      "This SAML SSO configuration applies to the following other workspaces. Contact support to add or remove a workspace.",
  },
  SCIM: {
    title: "SCIM tokens",
    description: "Generate a token to configure SCIM.",
    plan: "enterprise",
  },
  workspaceId: {
    title: "",
    description: "Workspace ID",
  },
};
